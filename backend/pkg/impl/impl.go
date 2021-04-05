package impl

import (
    "bytes"
    "context"
    "github.com/google/martian/v3/log"
    "github.com/joshcarp/altethical/backend/pkg/products"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/vincent-petithory/dataurl"
    "regexp"
)

func (s Server) Example(ctx context.Context, req *altethical.ExampleRequest) (*altethical.ExampleResponse, error) {
    return &altethical.ExampleResponse{
        Message: req.Message,
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

func (s Server) Byimages(context.Context, *altethical.ByimagesRequest) (*altethical.SearchResponse, error) {
    panic("not implemented")
}
func (s Server) Byclicks(context.Context, *altethical.ByclicksRequest) (*altethical.SearchResponse, error) {
    panic("not implemented")
}
