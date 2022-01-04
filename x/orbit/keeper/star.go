package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/lubtd/orbit/x/orbit/types"
)

// GetStarCount get the total number of star
func (k Keeper) GetStarCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StarCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetStarCount set the total number of star
func (k Keeper) SetStarCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.StarCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendStar appends a star in the store with a new id and update the count
func (k Keeper) AppendStar(
	ctx sdk.Context,
	star types.Star,
) uint64 {
	// Create the star
	count := k.GetStarCount(ctx)

	// Set the ID of the appended value
	star.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StarKey))
	appendedValue := k.cdc.MustMarshal(&star)
	store.Set(GetStarIDBytes(star.Id), appendedValue)

	// Update star count
	k.SetStarCount(ctx, count+1)

	return count
}

// SetStar set a specific star in the store
func (k Keeper) SetStar(ctx sdk.Context, star types.Star) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StarKey))
	b := k.cdc.MustMarshal(&star)
	store.Set(GetStarIDBytes(star.Id), b)
}

// GetStar returns a star from its id
func (k Keeper) GetStar(ctx sdk.Context, id uint64) (val types.Star, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StarKey))
	b := store.Get(GetStarIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveStar removes a star from the store
func (k Keeper) RemoveStar(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StarKey))
	store.Delete(GetStarIDBytes(id))
}

// GetAllStar returns all star
func (k Keeper) GetAllStar(ctx sdk.Context) (list []types.Star) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.StarKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Star
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetStarIDBytes returns the byte representation of the ID
func GetStarIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetStarIDFromBytes returns ID in uint64 format from a byte array
func GetStarIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
