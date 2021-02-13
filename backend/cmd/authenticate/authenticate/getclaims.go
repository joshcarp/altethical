package authenticate

import (
	"context"
	"fmt"

	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

/* GetClaims returns which user is currently logged in */
func (s *Server) GetClaims(ctx context.Context, _ *itproject.Empty) (*itproject.GetClaimsResponse, error) {
	var username interface{}
	var ok bool
	creds, err := auth.GetToken(ctx, s.secret.ValidJwt)
	if err != nil || creds == nil {
		creds, err = auth.GetToken(ctx, s.Firebase.ValidJwt)
		if err != nil {
			return &itproject.GetClaimsResponse{}, err
		}
		username, ok = creds["user_id"]
		if !ok {
			s.log.Error("Unauthorized")
			return &itproject.GetClaimsResponse{}, fmt.Errorf("Unauthorised")
		}
	} else {
		username, ok = creds["username"]
		if !ok {
			s.log.Error("Unauthorized")
			return &itproject.GetClaimsResponse{}, fmt.Errorf("Unauthorised")
		}
	}
	return &itproject.GetClaimsResponse{Username: username.(string)}, nil
}
