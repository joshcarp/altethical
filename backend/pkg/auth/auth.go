package auth

import (
	"context"
	"crypto/md5"
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/joshcarp/it-project/backend/pkg/proto/itproject"

	"google.golang.org/grpc/metadata"
)

const saltlen = 32

/* Salt returns a salt */
func Salt() (string, error) {
	bytes := make([]byte, saltlen)
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}
	hexSalt := make([]byte, hex.EncodedLen(len(bytes)))
	hex.Encode(hexSalt, bytes)
	return string(hexSalt), err
}

/* NewAccount returns a new account and creates a salt */
func NewAccount(email, name, username, preferred_name, password string) (*itproject.Account, error) {
	salt, err := Salt()
	if err != nil {
		return nil, err
	}
	hashedPass := SaltPassword(password, salt)
	return &itproject.Account{Email: email, Name: name, Username: username, PreferredName: preferred_name, Password: hashedPass, Salt: salt}, nil
}

/* SaltPassword salts a password */
func SaltPassword(password, salt string) string {
	data := append([]byte(password), []byte(salt)...)
	hash := md5.Sum(data)
	src := hash[:]
	hexPassword := make([]byte, hex.EncodedLen(len(src)))
	hex.Encode(hexPassword, src)
	return string(hexPassword)
}

/* EnsureValidToken ensures that the context of an incoming request is ValidJwt */
func GetToken(ctx context.Context, valid func([]string) (map[string]interface{}, error)) (map[string]interface{}, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("No auth found")
	}
	claims, err := valid(md["authorization"])
	if err != nil {
		return nil, err
	}
	return claims, nil
}

type Secret string

/* ValidJwt validates the authorization. */
func (s Secret) ValidJwt(authorization []string) (map[string]interface{}, error) {
	if len(authorization) < 1 {
		return nil, fmt.Errorf("auth not found")
	}
	token := strings.TrimPrefix(authorization[0], "Bearer ")
	jwtToken := Decode(token, string(s))
	if err := jwtToken.Valid(); err != nil {
		return nil, err
	}
	return jwtToken, nil
}

/* BasicAuth gets the */
func BasicAuth(ctx context.Context) (whatever string, asdasd string, err error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", "", fmt.Errorf("No auth found")
	}
	authorization := md["authorization"]
	token := strings.TrimPrefix(authorization[0], "Basic ")
	unamePwd, _ := base64.StdEncoding.DecodeString(token)
	tmp := strings.Split(string(unamePwd), ":")
	if len(tmp) < 2 {
		return "", "", fmt.Errorf("auth not ValidJwt: need in form Base64(username:password)")
	}
	return tmp[0], tmp[1], nil
}
