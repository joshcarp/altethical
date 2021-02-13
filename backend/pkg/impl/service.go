package impl

import (
    "github.com/joshcarp/altethical/backend/pkg/config"
    "github.com/joshcarp/altethical/backend/pkg/database"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/sirupsen/logrus"
    "google.golang.org/grpc"
)

/* Server is the struct that implements the authenticate service interface */
type Server struct {
    config config.Config
    log    *logrus.Logger
    db     database.Server
    altethical.UnimplementedAltethicalServer
}

func NewServer(config config.Config, log *logrus.Logger) (*Server, error) {
    db, err := database.New(config.GCP.ProjectID)
    if err != nil {
        return nil, err
    }
    return &Server{config: config, db: db, log: log}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
    accountServer, err := NewServer(conf, log)
    if err != nil {
        return err
    }
    altethical.RegisterAltethicalServer(s, accountServer)
    return nil
}
