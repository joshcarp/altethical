package profiles

import (
	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/config"
	"github.com/joshcarp/it-project/backend/pkg/database"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

type Server struct {
	config   config.Config
	secret   auth.Secret
	db       database.Server
	log      *logrus.Logger
	auth     bool
	Firebase auth.Firebase
	itproject.UnimplementedProfilesServer
}

func NewServer(config config.Config, log *logrus.Logger) (*Server, error) {
	db, err := database.New(config.GCP.ProjectID)
	if err != nil {
		return nil, err
	}
	Firebase, err := auth.New(config)
	if err != nil {
		return nil, err
	}
	secret, err := auth.GetSecret(config.GCP.ProjectNum, config.GCP.SecretName)
	if err != nil {
		return nil, err
	}
	return &Server{config: config, db: db, log: log, auth: true, Firebase: Firebase, secret: secret}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
	ser, err := NewServer(conf, log)
	if err != nil {
		return err
	}
	itproject.RegisterProfilesServer(s, ser)
	return nil
}
