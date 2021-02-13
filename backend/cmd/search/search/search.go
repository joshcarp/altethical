package search

import (
	"context"

	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
)

/* search is a service that is used to find a profile/user based on a search parameter */
func (s *Server) Search(ctx context.Context, in *itproject.SearchRequest) (*itproject.SearchResponse, error) {
	prof, err := s.db.GetProfileLike(in.Term)
	if err != nil {
		return nil, err
	}
	return &itproject.SearchResponse{
		Results: prof,
	}, nil
}
