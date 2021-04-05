package signup

import (
    "cloud.google.com/go/storage"
    vision "cloud.google.com/go/vision/apiv1"
    "context"
    "crypto/md5"
    "encoding/hex"
    "fmt"
    "github.com/cheggaaa/pb/v3"
    "github.com/googleapis/gax-go/v2"
    "github.com/joshcarp/altethical/backend/pkg/config"
    "github.com/joshcarp/altethical/backend/pkg/products"
    "github.com/joshcarp/altethical/backend/pkg/shopifyclient"
    "log"
    "net/http"
    "sync"
    "time"
)

func SignUpStore(ctx context.Context, url string, httpClient *http.Client, cfg config.Config, productClient *vision.ProductSearchClient, storageClient *storage.Client) {
    b, err := shopifyclient.GetShopifyProducts(httpClient, url)
    if err != nil {
        panic(err)
    }
    total := 0
    for _, e := range b.Products {
        total += len(e.Images)
    }
    bar := pb.StartNew(total)
    log.Printf("%s has %d items to process", url, len(b.Products))
    log.Printf("%s has %d images to process", url, total)
    var w sync.WaitGroup
    for _, e := range b.Products {
        productid := fmt.Sprintf("%d", e.ID)
        productURL := fmt.Sprintf("%s/collections/all-products/products/%s", url, e.Handle)
        _, _ = products.Create(productClient, context.Background(), cfg.GCP.ProjectID, cfg.GCP.Location, productid, e.Title, "apparel-v2", productURL)
        for _, image := range e.Images {
            w.Add(1)
            go func(ctx context.Context, image shopifyclient.Images, productid string) {
                defer w.Done()
                defer bar.Add(1)
                bo := gax.Backoff{
                    Initial:    1 * time.Second,
                    Multiplier: 2,
                    Max:        15 * time.Second,
                }
                var resp *http.Response
                for {
                    resp, err = httpClient.Get(image.Src)
                    if err == nil && resp != nil && resp.StatusCode == 200 {
                        log.Printf("Got image: %s", image.Src)
                        break
                    }
                    log.Print("Failed to get image")
                    if err := gax.Sleep(ctx, bo.Pause()); err != nil {
                        log.Printf("Failed to get image")
                    }
                }
                hash := md5.Sum([]byte(image.Src))
                id := hex.EncodeToString(hash[:])
                url, err := products.UploadImage(ctx, storageClient, cfg.GCP.Storagebucket, id, resp.Body)
                if err != nil {
                    log.Printf("UploadImage: %w", err)
                }
                _, _, err = products.CreateReferenceImage(productClient, ctx, cfg.GCP.ProjectID, cfg.GCP.Location, productid, id, url)
                if err != nil {
                    log.Printf("CreateReferenceImage: %w", err)
                }
                err = products.AddProductToSet(productClient, ctx, cfg.GCP.ProjectID, cfg.GCP.Location, productid, cfg.GCP.ProductSetId)
                if err != nil {
                    log.Printf("AddProductToSet: %w", err)
                }
            }(ctx, image, productid)
        }
    }
    w.Wait() // if cloud run wasn't used we wouldn't need to do this
}
