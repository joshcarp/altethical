package server

import (
    "context"
    "flag"
    "golang.org/x/net/http2"
    "golang.org/x/net/http2/h2c"
    "net"
	"net/http"
	"os"

	"cloud.google.com/go/firestore"

	"github.com/sirupsen/logrus"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/joshcarp/altethical/backend/pkg/config"
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
	httpHandler := grpcweb.WrapServer(s, grpcweb.WithOriginFunc(func(origin string) bool {
        return true
    }))
	return s, grpcDispatcher(context.Background(), s, httpHandler), conf, nil
}

func grpcDispatcher(ctx context.Context, grpcHandler http.Handler, httpHandler http.Handler) http.Handler {
    hf := func(w http.ResponseWriter, r *http.Request) {
        req := r.WithContext(ctx)

        if r.ProtoMajor == 2 {
            grpcHandler.ServeHTTP(w, req)
        } else {
            httpHandler.ServeHTTP(w, req)
        }
    }
    return h2c.NewHandler(http.HandlerFunc(hf), &http2.Server{})
}

func Serve(conf config.Config, l *logrus.Logger, handler http.Handler) {
	lis, err := net.Listen("tcp", "0.0.0.0:"+conf.Server.Port)
	if err != nil {
		l.Fatalf("failed to listen: %v", err)
	}
	l.Info("Starting server on " + conf.Server.Port)
	l.Fatal(http.Serve(lis, handler))
}
