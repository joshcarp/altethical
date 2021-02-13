package database

import (
	"context"
	"fmt"
	"strings"

	"cloud.google.com/go/firestore"
	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

type Server struct {
	Client *firestore.Client
}

func New(projectID string) (Server, error) {
	client, err := firestore.NewClient(context.Background(), projectID)
	if err != nil {
		return Server{}, err
	}
	return Server{client}, nil
}

func (s Server) EnterProfile(profile *itproject.Profile) error {
	_, err := s.Client.Collection("profiles").Doc(profile.Username).Set(context.Background(), profile)
	if err != nil {
		return err
	}
	return nil
}

func (s Server) VerifyUser(username, password string) error {
	a := s.Client.Collection("accounts").Where("Username", "==", username)
	doc := a.Documents(context.Background())
	ref, err := doc.Next()
	if err != nil {
		return fmt.Errorf("Wrong password")
	}
	data := ref.Data()
	pwd, ok := data["Password"]
	if !ok {
		return fmt.Errorf("Wrong password")
	}
	salt, ok := data["Salt"]
	if !ok {
		return fmt.Errorf("Wrong password")
	}
	if auth.SaltPassword(password, salt.(string)) == pwd.(string) {
		return nil
	}
	return fmt.Errorf("Wrong password")
}

func (s Server) GetAccount(username string) (*itproject.Account, error) {
	var acc = &itproject.Account{}
	a := s.Client.Collection("accounts").Doc(username)
	b, err := a.Get(context.Background())
	if err != nil {
		return nil, err
	}
	if err := b.DataTo(&acc); err != nil {
		return nil, err
	}
	return acc, nil
}

func (s Server) EnterUser(user *itproject.Account) error {
	_, err := s.Client.Collection("accounts").Doc(user.Username).Set(context.Background(), user)
	if err != nil {
		return err
	}
	return nil
}

func (s Server) GetProfile(user string) (*itproject.Profile, error) {
	var acc = &itproject.Profile{}
	a := s.Client.Collection("profiles").Doc(user)
	b, err := a.Get(context.Background())
	if err != nil {
		return nil, err
	}
	if err := b.DataTo(&acc); err != nil {
		return nil, err
	}
	return acc, nil
}

func (s Server) GetProfileLike(term string) ([]*itproject.Profile, error) {
	a := s.Client.Collection("profiles").Documents(context.Background())
	snapshot, err := a.Next()
	var results []*itproject.Profile
	for snapshot != nil && err == nil {
		pr := &itproject.Profile{}
		if err := snapshot.DataTo(&pr); err != nil {
			return nil, err
		}
		if strings.Contains(strings.ToLower(pr.Username), strings.ToLower(term)) {
			results = append(results, pr)
		}
		snapshot, err = a.Next()
	}
	return results, nil
}
