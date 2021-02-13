package impl

import (
    "github.com/joshcarp/altethical/backend/pkg/config"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/sirupsen/logrus"
    "google.golang.org/grpc"
)

/* Server is the struct that implements the authenticate service interface */
type Server struct {
    config config.Config
    log    *logrus.Logger
    altethical.UnimplementedAltethicalServer
}

func NewServer(config config.Config, log *logrus.Logger) (*Server, error) {
    return &Server{config: config, log: log}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
    accountServer, err := NewServer(conf, log)
    if err != nil {
        return err
    }
    altethical.RegisterAltethicalServer(s, accountServer)
    return nil
}
