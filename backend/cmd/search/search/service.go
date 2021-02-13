package search

import (
	"github.com/joshcarp/it-project/backend/pkg/config"
	"github.com/joshcarp/it-project/backend/pkg/database"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

// server is used to implement helloworld.GreeterServer.
type Server struct {
	config config.Config
	db     database.Server
	log    *logrus.Logger
	itproject.UnimplementedSearchServer
}

func NewServer(config config.Config, log *logrus.Logger) (*Server, error) {
	db, err := database.New(config.GCP.ProjectID)
	if err != nil {
		return nil, err
	}
	return &Server{config: config, db: db, log: log}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
	ser, err := NewServer(conf, log)
	if err != nil {
		return err
	}
	itproject.RegisterSearchServer(s, ser)
	return nil
}
