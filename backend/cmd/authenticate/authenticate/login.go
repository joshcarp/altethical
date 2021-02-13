package authenticate

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/joshcarp/it-project/backend/pkg/auth"

	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

func (s *Server) Login(ctx context.Context, req *itproject.LoginRequest) (*itproject.LoginResponse, error) {
	/* Get basic auth from metadata */
	username, password, err := auth.BasicAuth(ctx)
	if err != nil {
		return nil, err
	}
	/* Verify against database */
	if err := s.db.VerifyUser(username, password); err != nil {
		return nil, status.Error(codes.PermissionDenied, "Incorrect username or password")
	}
	/* Issue JWT with username */
	token, err := auth.Issue(map[string]interface{}{"username": username}, string(s.secret))
	return &itproject.LoginResponse{Jwt: token}, err
}
