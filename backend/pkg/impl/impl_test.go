package impl

//func TestSignup(t *testing.T) {
//    conf, err := config.ReadConfig(afero.NewOsFs(), "../../../config/local.yaml")
//    require.NoError(t, err)
//    s, err := NewServer(conf, logrus.New())
//    require.NoError(t, err)
//    r, err := s.Signup(context.Background(), &altethical.SignupRequest{
//        Url: "http://etiko.com.au/",
//    })
//    fmt.Println(r, err)
//}

//func TestCreateSet(t *testing.T) {
//
//    conf, err := config.ReadConfig(afero.NewOsFs(), "../../../config/local.yaml")
//    require.NoError(t, err)
//    s, err := NewServer(conf, logrus.New())
//    require.NoError(t, err)
//    r, err := s.Search(context.Background(), &altethical.SearchRequest{
//        Url: "http://3.bp.blogspot.com/-HrFhp35SWIU/UiyQwGIOu8I/AAAAAAAABUA/SQWumyD8BaY/s1600/Trendy+t-shirts+for+men+Styleslook.blogspot+%25286%2529.jpg",
//    })
//    fmt.Println(r, err)
//}

//func TestDeleteAllProducts(t *testing.T) {
//
//    conf, err := config.ReadConfig(afero.NewOsFs(), "../../../config/local.yaml")
//    require.NoError(t, err)
//    s, err := NewServer(conf, logrus.New())
//    require.NoError(t, err)
//    ps, err := products.ListProducts(s.productClient, context.Background(), s.config.GCP.ProjectID, s.config.GCP.Location)
//    require.NoError(t, err)
//    for _, e := range ps {
//
//        fmt.Println(products.Delete(s.productClient, context.Background(), e))
//    }
//}
