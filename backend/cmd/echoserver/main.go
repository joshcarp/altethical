/* EchoService is a basic service to test connections */
package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"

	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	lis, _ := net.Listen("tcp", ":8080")

	s := grpc.NewServer()
	reflection.Register(s)
	itproject.RegisterEchoServer(s, &server{})
	fmt.Println("Starting grpc server")
	grpcweb_server := grpcweb.WrapServer(s)
	fmt.Println("Starting grpc server")
	log.Fatal(http.Serve(lis, grpcweb_server))
}

type server struct {
	itproject.UnimplementedEchoServer
}

func (s *server) Echo(ctx context.Context, req *itproject.EchoRequest) (*itproject.EchoResponse, error) {
	return &itproject.EchoResponse{Message: "Hello" + req.Message}, nil
}
