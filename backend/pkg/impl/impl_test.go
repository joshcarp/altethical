package impl

import (
    "context"
    "fmt"
    "github.com/joshcarp/altethical/backend/pkg/config"
    "github.com/joshcarp/altethical/backend/pkg/products"
    "github.com/joshcarp/altethical/backend/pkg/proto/altethical"
    "github.com/sirupsen/logrus"
    "github.com/spf13/afero"
    "github.com/stretchr/testify/require"
    "testing"
)

func TestSignup(t *testing.T) {
    conf, err := config.ReadConfig(afero.NewOsFs(), "../../../config/local.yaml")
    require.NoError(t, err)
    s, err := NewServer(conf, logrus.New())
    require.NoError(t, err)
    r, err := s.Signup(context.Background(), &altethical.SignupRequest{
        Url: "http://etiko.com.au/",
    })
    fmt.Println(r, err)
}

func TestCreateSet(t *testing.T) {

    conf, err := config.ReadConfig(afero.NewOsFs(), "../../../config/local.yaml")
    require.NoError(t, err)
    s, err := NewServer(conf, logrus.New())
    require.NoError(t, err)
    products.ListSets(s.productClient, context.Background(), s.config.GCP.ProjectID, s.config.GCP.Location, "altethical", "altethical")

}
