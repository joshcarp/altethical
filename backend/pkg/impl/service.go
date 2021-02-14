package impl

import (
    "cloud.google.com/go/storage"
    vision "cloud.google.com/go/vision/apiv1"
    "context"
    "github.com/joshcarp/altethical/backend/pkg/config"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/sirupsen/logrus"
    "google.golang.org/grpc"
    "net/http"
)

/* Server is the struct that implements the authenticate service interface */
type Server struct {
    config        config.Config
    productClient *vision.ProductSearchClient
    imageClient   *vision.ImageAnnotatorClient
    httpClient    *http.Client
    storageClient *storage.Client
    log           *logrus.Logger
    altethical.UnimplementedAltethicalServer
}

func NewServer(config config.Config, log *logrus.Logger) (Server, error) {
    productClient, err := vision.NewProductSearchClient(context.Background())
    if err != nil {
        return Server{}, err
    }
    imageClient, err := vision.NewImageAnnotatorClient(context.Background())
    if err != nil {
        return Server{}, err
    }
    storageClient, err := storage.NewClient(context.Background())
    if err != nil {
        return Server{}, err
    }
    return Server{config: config, log: log, productClient: productClient, httpClient: http.DefaultClient, storageClient: storageClient, imageClient: imageClient}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
    accountServer, err := NewServer(conf, log)
    if err != nil {
        return err
    }
    altethical.RegisterAltethicalServer(s, accountServer)
    return nil
}
