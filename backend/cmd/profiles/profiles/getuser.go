package profiles

import (
	"context"

	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

/* getuser gets a user from a userid */
func (s *Server) Getuser(ctx context.Context, in *itproject.GetuserRequest) (*itproject.Profile, error) {
	p, err := s.db.GetProfile(in.Userid)
	if err != nil {
		s.log.Error(err)
		return nil, err
	}
	return p, err
}
