package impl

import (
    "context"

    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
)

/* Verify allows for the frontend to check if a user can edit a page */
func (s Server) Example(ctx context.Context, req *altethical.ExampleRequest) (*altethical.ExampleResponse, error) {
	return &altethical.ExampleResponse{
        Message: req.Message,
    }, nil
}
