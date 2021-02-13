/* authenticate is the miroservice that handles authentication and issues JWTs to use with other services */
package main

import (
	"github.com/sirupsen/logrus"

	"github.com/joshcarp/it-project/backend/cmd/authenticate/authenticate"
	"github.com/joshcarp/it-project/backend/pkg/server"

	_ "github.com/GoogleCloudPlatform/cloudsql-proxy/proxy/dialers/postgres"
)

func main() {
	l := logrus.New()
	s, handler, conf, err := server.SetupServer()
	if err != nil {
		l.Fatal(err)
	}
	if err := authenticate.RegisterService(conf, l, s); err != nil {
		l.Fatal(err)
	}
	server.Serve(conf, l, handler)
}
