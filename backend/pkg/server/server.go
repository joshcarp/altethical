package server

import (
	"flag"
	"net"
	"net/http"
	"os"

	"cloud.google.com/go/firestore"

	"github.com/sirupsen/logrus"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/joshcarp/it-project/backend/pkg/config"
	"github.com/spf13/afero"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Server struct {
	config.Config
	*firestore.Client
}

func SetupServer() (*grpc.Server, http.Handler, config.Config, error) {
	configFlag := flag.String("config", "config/local.yaml", "file (without ext) of the config file to load from config")
	flag.Parse()
	conf, err := config.ReadConfig(afero.NewOsFs(), *configFlag)
	if err != nil {
		return nil, nil, config.Config{}, err
	}
	if p := os.Getenv("PORT"); p != "" {
		conf.Server.Port = p
	}
	s := grpc.NewServer()
	reflection.Register(s)
	return s, grpcweb.WrapServer(s, grpcweb.WithOriginFunc(func(origin string) bool {
		return true
	})), conf, nil
}

func Serve(conf config.Config, l *logrus.Logger, handler http.Handler) {
	lis, err := net.Listen("tcp", "0.0.0.0:"+conf.Server.Port)
	if err != nil {
		l.Fatalf("failed to listen: %v", err)
	}
	l.Info("Starting server on " + conf.Server.Port)
	l.Fatal(http.Serve(lis, handler))
}
