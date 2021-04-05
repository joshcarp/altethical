package shopifyclient

import (
    "encoding/json"
    "io/ioutil"
    "net/http"
)

func GetShopifyProducts(client *http.Client, url string) (ShopifyResponse, error) {
    var b ShopifyResponse
    resp, err := client.Get(url + "/products.json?limit=250") // we can only get the first 250 items as we don't have access to the admin api
    if err != nil {
        return ShopifyResponse{}, err
    }
    a, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return ShopifyResponse{}, err
    }
    return b, json.Unmarshal(a, &b)
}
