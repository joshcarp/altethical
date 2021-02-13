package auth

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestSalt(t *testing.T) {
	_, err := Salt()
	require.Nil(t, err)
}
