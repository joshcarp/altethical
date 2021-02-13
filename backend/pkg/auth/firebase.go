package auth

import (
	"context"
	"fmt"
	"strings"

	"firebase.google.com/go/auth"

	firebase "firebase.google.com/go"
	"github.com/joshcarp/it-project/backend/pkg/config"
)

type Firebase struct {
	App  *firebase.App
	Auth *auth.Client
}

func New(conf config.Config) (Firebase, error) {
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, &firebase.Config{
		DatabaseURL:   conf.GCP.Databaseurl,
		ProjectID:     conf.GCP.ProjectID,
		StorageBucket: conf.GCP.Storagebucket,
	})
	if err != nil {
		return Firebase{}, err
	}
	auth, err := app.Auth(ctx)
	if err != nil {
		return Firebase{}, err
	}
	return Firebase{
		App:  app,
		Auth: auth,
	}, nil
}

/* ValidJwt is used to verify an authorization header */
func (f Firebase) ValidJwt(authorization []string) (map[string]interface{}, error) {
	if len(authorization) < 1 {
		return nil, fmt.Errorf("auth not found")
	}
	token := strings.TrimPrefix(authorization[0], "Bearer ")
	tok, err := f.Auth.VerifyIDToken(context.Background(), token)
	if err != nil {
		return nil, err
	}
	return tok.Claims, nil

}
