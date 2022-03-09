package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/lubtd/orbit/testutil/keeper"
	"github.com/lubtd/orbit/testutil/nullify"
	"github.com/lubtd/orbit/x/toast/keeper"
	"github.com/lubtd/orbit/x/toast/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNEnableMap(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.EnableMap {
	items := make([]types.EnableMap, n)
	for i := range items {
		items[i].Address = strconv.Itoa(i)

		keeper.SetEnableMap(ctx, items[i])
	}
	return items
}

func TestEnableMapGet(t *testing.T) {
	keeper, ctx := keepertest.ToastKeeper(t)
	items := createNEnableMap(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetEnableMap(ctx,
			item.Address,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestEnableMapRemove(t *testing.T) {
	keeper, ctx := keepertest.ToastKeeper(t)
	items := createNEnableMap(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveEnableMap(ctx,
			item.Address,
		)
		_, found := keeper.GetEnableMap(ctx,
			item.Address,
		)
		require.False(t, found)
	}
}

func TestEnableMapGetAll(t *testing.T) {
	keeper, ctx := keepertest.ToastKeeper(t)
	items := createNEnableMap(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllEnableMap(ctx)),
	)
}
