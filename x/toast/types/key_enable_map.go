package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// EnableMapKeyPrefix is the prefix to retrieve all EnableMap
	EnableMapKeyPrefix = "EnableMap/value/"
)

// EnableMapKey returns the store key to retrieve a EnableMap from the index fields
func EnableMapKey(
	address string,
) []byte {
	var key []byte

	addressBytes := []byte(address)
	key = append(key, addressBytes...)
	key = append(key, []byte("/")...)

	return key
}
