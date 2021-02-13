package profiles

import (
	"context"
	"fmt"

	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

/* updateuser updates a profile */
func (s *Server) Updateuser(ctx context.Context, in *itproject.Profile) (*itproject.Empty, error) {
	var username interface{}
	var ok bool
	if s.auth {
		creds, err := auth.GetToken(ctx, s.secret.ValidJwt)
		if err != nil {
			creds, err = auth.GetToken(ctx, s.Firebase.ValidJwt)
			if err != nil {
				return nil, err
			}
			username, ok = creds["user_id"]
			if !ok {
				return nil, fmt.Errorf("Unauthorized")
			}
		} else {
			username, ok = creds["username"]
			if !ok {
				return nil, fmt.Errorf("Unauthorized")
			}
		}
		if username.(string) != in.Username {
			return nil, fmt.Errorf("Unauthorized")
		}
	}
	return &itproject.Empty{}, s.db.EnterProfile(in)
}
