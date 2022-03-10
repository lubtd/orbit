package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/lubtd/orbit/x/toast/types"
)

// SetEnableMap set a specific enableMap in the store from its index
func (k Keeper) SetEnableMap(ctx sdk.Context, enableMap types.EnableMap) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EnableMapKeyPrefix))
	b := k.cdc.MustMarshal(&enableMap)
	store.Set(types.EnableMapKey(
		enableMap.Address,
	), b)
}

// GetEnableMap returns a enableMap from its index
func (k Keeper) GetEnableMap(
	ctx sdk.Context,
	address string,

) (val types.EnableMap, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EnableMapKeyPrefix))

	b := store.Get(types.EnableMapKey(
		address,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveEnableMap removes a enableMap from the store
func (k Keeper) RemoveEnableMap(
	ctx sdk.Context,
	address string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EnableMapKeyPrefix))
	store.Delete(types.EnableMapKey(
		address,
	))
}

// GetAllEnableMap returns all enableMap
func (k Keeper) GetAllEnableMap(ctx sdk.Context) (list []types.EnableMap) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.EnableMapKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.EnableMap
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

func (k Keeper) Enable(ctx sdk.Context, address string) {
	k.SetEnableMap(ctx, types.EnableMap{
		Address: address,
		Enabled: true,
	})
}