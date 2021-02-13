package upload

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime"
	"path"
	"time"

	"github.com/joshcarp/it-project/backend/pkg/auth"
	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"
	"github.com/vincent-petithory/dataurl"

	"cloud.google.com/go/storage"
)

const bucketname = `joshcarp-it-project-storage`

/* upload service is used to upload static assets to gcs */
func (s *Server) Upload(ctx context.Context, in *itproject.UploadRequest) (*itproject.UploadResponse, error) {
	filename, _ := auth.Salt()
	dataURL, err := dataurl.DecodeString(in.GetDataurl())
	if err != nil {
		s.log.Error(err)
		return nil, err
	}
	err = UploadFile(bytes.NewReader(dataURL.Data), bucketname, filename, dataURL.MediaType.ContentType())
	if err != nil {
		s.log.Error(err)
		return nil, err
	}
	url := fmt.Sprintf("https://storage.googleapis.com/%s/%s", bucketname, filename)
	return &itproject.UploadResponse{Url: url}, err
}

func UploadFile(r io.Reader, bucket, object, mimetype string) error {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storage.NewClient: %v", err)
	}
	defer client.Close()
	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()
	wc := client.Bucket(bucket).Object(object)
	wr := wc.NewWriter(ctx)
	if _, err = io.Copy(wr, r); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wr.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}
	if mimetype == "" {
		mimetype = mime.TypeByExtension(path.Ext(object))
	}
	if _, err = wc.Update(ctx, storage.ObjectAttrsToUpdate{
		ContentType: interface{}(mimetype),
	}); err != nil {
		return err
	}

	return nil
}
