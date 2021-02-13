package auth

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Duration is the time in seconds that the jwt is valid for
var Duration float64 = 900

// Issue issues a jwt string from claims
func Issue(claims map[string]interface{}, secret string) (string, error) {
	claims["exp"] = float64(time.Now().Unix()) + Duration
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims(claims))
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// Decode decodes a jwt string into its claims
func Decode(tokenString, secret string) jwt.MapClaims {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(secret), nil
	})
	if err != nil {
		return nil
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims
	}
	return nil
}
