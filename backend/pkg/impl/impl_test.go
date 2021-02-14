package impl

import (
    "context"
    "fmt"
    "github.com/joshcarp/altethical/backend/pkg/config"
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
    r, err := s.Search(context.Background(), &altethical.SearchRequest{
        Url: "https://cdn.shopify.com/s/files/1/0004/5252/6146/products/DSC_4446_1080x.jpg?v=1604199029",
    })
    fmt.Println(r, err)
}
