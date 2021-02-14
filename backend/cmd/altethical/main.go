package main

import (
    "github.com/joshcarp/altethical/backend/pkg/impl"
    "github.com/joshcarp/altethical/backend/pkg/server"
    "github.com/sirupsen/logrus"
)

func main() {
    l := logrus.New()
    s, handler, conf, err := server.SetupServer()
    if err != nil {
        l.Fatal(err)
    }
    if err := impl.RegisterService(conf, l, s); err != nil {
        l.Fatal(err)
    }
    server.Serve(conf, l, handler)
}
