package impl

import (
    "context"
    "crypto/md5"
    "encoding/hex"
    "fmt"
    "github.com/google/martian/v3/log"
    "github.com/joshcarp/altethical/backend/pkg/products"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/joshcarp/altethical/backend/pkg/shopifyclient"
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
    for _, e := range b.Products {
        productid := fmt.Sprintf("%d", e.ID)
        _, _ = products.Create(s.productClient, context.Background(), s.config.GCP.ProjectID, s.config.GCP.Location, productid, e.Title, "apparel-v2")
        for _, image := range e.Images {
            resp, err := s.httpClient.Get(image.Src)
            if err != nil {
                return nil, err
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

        }

    }
    return &altethical.SignupResponse{
        Message: req.GetUrl(),
    }, nil
}

func (s Server) Search(ctx context.Context, req *altethical.SearchRequest) (*altethical.SearchResponse, error) {
    return &altethical.SearchResponse{
        Message: req.Message,
    }, nil
}
