package impl

import (
    "bytes"
    "context"
    "crypto/md5"
    "encoding/hex"
    "fmt"
    "github.com/google/martian/v3/log"
    "github.com/googleapis/gax-go/v2"
    "github.com/joshcarp/altethical/backend/pkg/products"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/joshcarp/altethical/backend/pkg/shopifyclient"
    "github.com/vincent-petithory/dataurl"
    "net/http"
    "regexp"
    "sync"
    "time"
)

func (s Server) Example(ctx context.Context, req *altethical.ExampleRequest) (*altethical.ExampleResponse, error) {
    return &altethical.ExampleResponse{
        Message: req.Message,
    }, nil
}

func (s Server) Signup(ctx context.Context, req *altethical.SignupRequest) (*altethical.SignupResponse, error) {
    b, err := shopifyclient.GetShopifyProducts(s.httpClient, req.Url)
    if err != nil {
        panic(err)
    }
    var w sync.WaitGroup
    for _, e := range b.Products {
        productid := fmt.Sprintf("%d", e.ID)
        productURL := fmt.Sprintf("%s/collections/all-products/products/%s", req.GetUrl(), e.Handle)
        _, _ = products.Create(s.productClient, context.Background(), s.config.GCP.ProjectID, s.config.GCP.Location, productid, e.Title, "apparel-v2", productURL)
        for _, image := range e.Images {
            w.Add(1)
            go func(ctx context.Context, image shopifyclient.Images, productid string) {
                defer w.Done()
                bo := gax.Backoff{
                    Initial:    1 * time.Second,
                    Multiplier: 2,
                    Max:        15 * time.Second,
                }
                var resp *http.Response
                for {
                    resp, err = s.httpClient.Get(image.Src)
                    if err == nil && resp != nil && resp.StatusCode == 200 {
                        break
                    }
                    log.Errorf("Failed to get image")
                    if err := gax.Sleep(ctx, bo.Pause()); err != nil {
                        log.Errorf("Failed to get image")
                    }
                }
                hash := md5.Sum([]byte(image.Src))
                id := hex.EncodeToString(hash[:])
                url, err := products.UploadImage(ctx, s.storageClient, s.config.GCP.Storagebucket, id, resp.Body)
                if err != nil {
                    log.Infof("UploadImage: %w", err)
                }
                _, _, err = products.CreateReferenceImage(s.productClient, ctx, s.config.GCP.ProjectID, s.config.GCP.Location, productid, id, url)
                if err != nil {
                    log.Infof("CreateReferenceImage: %w", err)
                }
                err = products.AddProductToSet(s.productClient, ctx, s.config.GCP.ProjectID, s.config.GCP.Location, productid, s.config.GCP.ProductSetId)
                if err != nil {
                    log.Infof("AddProductToSet: %w", err)
                }
            }(ctx, image, productid)
        }

    }
    w.Wait() // if cloud run wasn't used we wouldn't need to do this
    return &altethical.SignupResponse{
        Message: req.GetUrl(),
    }, nil
}

//data:image/jpeg;name=DSC.jpg;base64,/9j/4AAQ
func (s Server) SearchImage(ctx context.Context, req *altethical.SearchRequest) (*altethical.SearchResponse, error) {
    url := regexp.MustCompile("name=.*;").ReplaceAllString(req.GetUrl(), "")
    dataURL, err := dataurl.DecodeString(url)
    if err != nil {
        return nil, err
    }
    set, err := products.SearchSet(s.imageClient, ctx, bytes.NewReader(dataURL.Data), s.config.GCP.ProjectID, s.config.GCP.Location, s.config.GCP.ProductSetId, "apparel-v2", "")
    if err != nil {
        log.Infof("%v", err)
    }
    return &altethical.SearchResponse{
        Product: set,
    }, err
}
