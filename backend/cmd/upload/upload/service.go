package upload

import (
	"github.com/joshcarp/it-project/backend/pkg/config"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

type Server struct {
	itproject.UnimplementedUploadServer
	log *logrus.Logger
}

func NewServer(config config.Config, log *logrus.Logger) (*Server, error) {
	return &Server{log: log}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
	ser, err := NewServer(conf, log)
	if err != nil {
		return err
	}
	itproject.RegisterUploadServer(s, ser)
	return nil
}
