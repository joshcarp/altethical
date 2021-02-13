package auth

import (
	"testing"

	"github.com/dgrijalva/jwt-go"

	"github.com/stretchr/testify/require"
)

// TestEncode tests a simple encoding and decoding of a jwt
func TestEncode(t *testing.T) {
	claims := jwt.MapClaims{"abc": "def"}
	secret := `7b323b388f9817a71ee1f22be96532acdaa88d28a18b5556ff75b5f568f4e1ffef04bbbd9966c9774d77b8ea266cb1f9d12cc5ba2b29c9fa870a2bac05919f47`
	tokenString, err := Issue(claims, secret)
	require.Nil(t, err)
	token := Decode(tokenString, secret)
	require.Nil(t, token.Valid())
	require.Equal(t, claims, token)
}
