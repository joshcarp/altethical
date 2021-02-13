package authenticate

import (
	"context"

	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

/* Verify allows for the frontend to check if a user can edit a page */
func (s *Server) Verify(ctx context.Context, req *itproject.VerifyRequest) (*itproject.VerifyResponse, error) {
	var username interface{}
	var ok bool
	creds, err := auth.GetToken(ctx, s.secret.ValidJwt)
	if err != nil || creds == nil {
		creds, err = auth.GetToken(ctx, s.Firebase.ValidJwt)
		if err != nil {
			s.log.Error(err)
			return &itproject.VerifyResponse{Verified: false}, nil
		}
		username, ok = creds["user_id"]
		if !ok {
			s.log.Error("Unauthorized")
			return &itproject.VerifyResponse{Verified: false}, nil
		}
	} else {
		username, ok = creds["username"]
		if !ok {
			s.log.Error("Unauthorized")
			return &itproject.VerifyResponse{Verified: false}, nil
		}
	}
	return &itproject.VerifyResponse{Verified: username.(string) == req.Username}, nil
}
