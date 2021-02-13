package auth

import (
	"context"
	"fmt"

	secretmanager "cloud.google.com/go/secretmanager/apiv1"
	secretmanagerpb "google.golang.org/genproto/googleapis/cloud/secretmanager/v1"
)

func GetSecret(projectid, name string) (Secret, error) {
	fmt.Println("Accessing Secret")
	secretClinet, _ := secretmanager.NewClient(context.Background())
	s, err := secretClinet.AccessSecretVersion(context.Background(), &secretmanagerpb.AccessSecretVersionRequest{
		Name: fmt.Sprintf("projects/%s/secrets/%s/versions/latest", projectid, name),
	})
	if err != nil {
		return "", err
	}
	fmt.Println("Secret retrieved")
	return Secret(s.Payload.Data), nil
}
