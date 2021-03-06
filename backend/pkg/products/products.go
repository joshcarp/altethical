package products

import (
    "cloud.google.com/go/storage"
    vision "cloud.google.com/go/vision/apiv1"
    "context"
    "fmt"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    visionpb "google.golang.org/genproto/googleapis/cloud/vision/v1"
    "io"
)

func Create(client *vision.ProductSearchClient, ctx context.Context, projectID string, location string, productID string, productDisplayName string, productCategory string, shopurl string) (string, error) {
    req := &visionpb.CreateProductRequest{
        Parent:    fmt.Sprintf("projects/%s/locations/%s", projectID, location),
        ProductId: productID,
        Product: &visionpb.Product{
            Description:     shopurl,
            DisplayName:     productDisplayName,
            ProductCategory: productCategory,
        },
    }

    resp, err := client.CreateProduct(ctx, req)
    if err != nil {
        return "", fmt.Errorf("Create: %v", err)
    }

    return resp.Name, nil
}

func CreateSet(client *vision.ProductSearchClient, ctx context.Context, projectID string, location string, productSetID string, productSetDisplayName string) (string, error) {
    req := &visionpb.CreateProductSetRequest{
        Parent:       fmt.Sprintf("projects/%s/locations/%s", projectID, location),
        ProductSetId: productSetID,
        ProductSet: &visionpb.ProductSet{
            DisplayName: productSetDisplayName,
        },
    }

    resp, err := client.CreateProductSet(ctx, req)
    if err != nil {
        return "", fmt.Errorf("CreateSet: %v", err)
    }
    return resp.Name, nil
}

func SearchSet(client *vision.ImageAnnotatorClient, ctx context.Context, imager io.Reader, projectID string, location string, productSetID string, productCategory string, filter string) ([]*altethical.Product, error) {
    image, err := vision.NewImageFromReader(imager)
    if err != nil {
        return nil, err
    }

    ictx := &visionpb.ImageContext{
        ProductSearchParams: &visionpb.ProductSearchParams{
            ProductSet:        fmt.Sprintf("projects/%s/locations/%s/productSets/%s", projectID, location, productSetID),
            ProductCategories: []string{productCategory},
            Filter:            filter,
        },
    }

    response, err := client.ProductSearch(ctx, image, ictx)
    if err != nil {
        return nil, fmt.Errorf("ProductSearch: %v", err)
    }
    var ret []*altethical.Product
    for _, e := range response.Results {
        ret = append(ret, &altethical.Product{Image: e.Image, Url: e.Product.Description, Score: e.GetScore(), Title: e.Product.DisplayName})
    }
    return ret, nil
}

func ListSets(client *vision.ProductSearchClient, ctx context.Context, projectID string, location string, productSetID string, productSetDisplayName string) (string, error) {
    resp := client.ListProductSets(ctx, &visionpb.ListProductSetsRequest{
        Parent:    "projects/" + projectID + "/locations/" + location,
        PageSize:  0,
        PageToken: "",
    })
    for {
        set, err := resp.Next()
        if set == nil || err != nil {
            break
        }
        fmt.Println(set.Name)
    }
    return "", nil
}

func AddProductToSet(client *vision.ProductSearchClient, ctx context.Context, projectID string, location string, productID string, productSetID string) error {
    req := &visionpb.AddProductToProductSetRequest{
        Name:    fmt.Sprintf("projects/%s/locations/%s/productSets/%s", projectID, location, productSetID),
        Product: fmt.Sprintf("projects/%s/locations/%s/products/%s", projectID, location, productID),
    }

    if err := client.AddProductToProductSet(ctx, req); err != nil {
        return fmt.Errorf("NewProductSearchClient: %v", err)
    }

    return nil
}

func CreateReferenceImage(client *vision.ProductSearchClient, ctx context.Context, projectID string, location string, productID string, referenceImageID string, gcsURI string) (string, string, error) {
    req := &visionpb.CreateReferenceImageRequest{
        Parent: fmt.Sprintf("projects/%s/locations/%s/products/%s", projectID, location, productID),
        ReferenceImage: &visionpb.ReferenceImage{
            Uri: gcsURI,
        },
        ReferenceImageId: referenceImageID,
    }
    resp, err := client.CreateReferenceImage(ctx, req)
    if err != nil {
        return "", "", fmt.Errorf("CreateReferenceImage: %v", err)
    }
    return resp.Uri, resp.Name, nil
}

func UploadImage(ctx context.Context, client *storage.Client, bucket string, object string, r io.Reader) (string, error) {
    wc := client.Bucket(bucket).Object(object).NewWriter(ctx)
    defer wc.Close()
    if _, err := io.Copy(wc, r); err != nil {
        return "", fmt.Errorf("io.Copy: %v", err)
    }
    return fmt.Sprintf("gs://%s/%s", bucket, object), nil
}

func Delete(client *vision.ProductSearchClient, ctx context.Context, productID string) error {
    req := &visionpb.DeleteProductRequest{
        Name: productID,
    }

    if err := client.DeleteProduct(ctx, req); err != nil {
        return fmt.Errorf("NewProductSearchClient: %v", err)
    }
    return nil
}

func ListProducts(client *vision.ProductSearchClient, ctx context.Context, projectID string, location string) ([]string, error) {
    resp := client.ListProducts(ctx, &visionpb.ListProductsRequest{
        Parent:    "projects/" + projectID + "/locations/" + location,
        PageSize:  0,
        PageToken: "",
    })
    var ret []string
    for {
        set, err := resp.Next()
        if set == nil || err != nil {
            break
        }
        ret = append(ret, set.Name)
    }
    return ret, nil
}
