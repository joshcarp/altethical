package main

import (
    "context"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "google.golang.org/grpc"
    "log"
    "os"
    "time"
)


func main() {
    address := os.Getenv("ADDR")
    //cp, err := x509.SystemCertPool()
    //if err != nil {
    //    panic(err)
    //}
    //opts := grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(cp, ""))

    // Set up a connection to the server.
    conn, err := grpc.DialContext(context.Background(),address, grpc.WithInsecure())
    if err != nil {
        log.Fatalf("did not connect: %v", err)
    }
    defer conn.Close()
    c := altethical.NewAltethicalClient(conn)

    // Contact the server and print out its response.
    ctx, cancel := context.WithTimeout(context.Background(), time.Second)
    defer cancel()
    r, err := c.Signup(ctx, &altethical.SignupRequest{
        Url: "http://etiko.com.au/",
    })
    if err != nil {
        log.Fatalf("could not greet: %v", err)
    }
    log.Printf("Greeting: %s", r.String())
}

