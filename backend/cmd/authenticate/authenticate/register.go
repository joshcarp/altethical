package authenticate

import (
	"context"
	"fmt"

	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

func (s *Server) Register(ctx context.Context, req *itproject.RegisterRequest) (*itproject.RegisterResponse, error) {
	/* Check that the user doesn't already exist */
	if a, err := s.db.GetProfile(req.Username); a != nil || err == nil {
		s.log.Error("user already exists")
		return nil, fmt.Errorf("user already exists")
	}
	/* Create a new account */
	account, err := auth.NewAccount(req.Email, req.FullName, req.Username, req.PreferredName, req.Password)
	if err != nil {
		s.log.Error(err)
		return nil, err
	}
	/* Enter the user */
	if err := s.db.EnterUser(account); err != nil {
		s.log.Error(err)
		return nil, err
	}
	/* Issue a JWT with username claims */
	token, err := auth.Issue(map[string]interface{}{"username": req.Username}, string(s.secret))
	if err := s.db.EnterProfile(&itproject.Profile{
		Username: account.Username,
		Email:    account.Email,
		FullName: account.Name,
	}); err != nil {
		s.log.Error(err)
		return nil, err
	}
	return &itproject.RegisterResponse{Jwt: token}, err
}

func (s *Server) RegisterFirebase(ctx context.Context, req *itproject.Empty) (*itproject.Empty, error) {
	/* Get firebase token */
	creds, err := auth.GetToken(ctx, s.Firebase.ValidJwt)
	if err != nil {
		s.log.Error(err)
		return nil, err
	}
	/* Get the info from the jwt */
	username := creds["user_id"]
	email := creds["email"]

	/* Enter the user in the database */
	if err := s.db.EnterProfile(&itproject.Profile{
		Username: username.(string),
		Email:    email.(string),
	}); err != nil {
		s.log.Error(err)
		return nil, err
	}
	return &itproject.Empty{}, nil
}
