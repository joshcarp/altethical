package main

import (
    "bytes"
    "cloud.google.com/go/storage"
    vision "cloud.google.com/go/vision/apiv1"
    "context"
    "flag"
    "fmt"
    "github.com/joshcarp/altethical/backend/pkg/config"
    "github.com/joshcarp/altethical/backend/pkg/signup"
    "github.com/spf13/afero"
    "log"
    "net/http"
    "sync"
)

func main() {
    verbose := flag.String("verbose", "false", "verbose logging")
    flag.Parse()
    if *verbose == "false" {
        log.SetOutput(&bytes.Buffer{})
    }
    conf, err := config.ReadConfig(afero.NewOsFs(), "config/prod.yaml")
    if err != nil {
        log.Fatal("Can't load config")
    }
    productClient, err := vision.NewProductSearchClient(context.Background())
    if err != nil {
        log.Fatal("Can't load config")
    }
    storageClient, err := storage.NewClient(context.Background())
    if err != nil {
        log.Fatal("Can't load config")
    }
    var wg sync.WaitGroup
    for _, merchant := range conf.Merchants {
        wg.Add(1)
        go func(merchant string) {
            fmt.Println("Processing store: " + merchant)
            signup.SignUpStore(context.Background(), merchant, http.DefaultClient, conf, productClient, storageClient)
            fmt.Println("Processed store: " + merchant)
            wg.Done()
        }(merchant)
    }
    wg.Wait()
}
