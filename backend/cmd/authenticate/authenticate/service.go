package authenticate

import (
	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/config"
	"github.com/joshcarp/it-project/backend/pkg/database"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

/* Server is the struct that implements the authenticate service interface */
type Server struct {
	config   config.Config
	secret   auth.Secret
	log      *logrus.Logger
	db       database.Server
	Firebase auth.Firebase
	itproject.UnimplementedAuthenticateServer
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
	return &Server{config: config, db: db, log: log, Firebase: Firebase, secret: secret}, nil
}

func RegisterService(conf config.Config, log *logrus.Logger, s *grpc.Server) error {
	accountServer, err := NewServer(conf, log)
	if err != nil {
		return err
	}
	itproject.RegisterAuthenticateServer(s, accountServer)
	return nil
}
