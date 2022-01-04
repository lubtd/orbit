package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/lubtd/orbit/testutil/keeper"
	"github.com/lubtd/orbit/testutil/nullify"
	"github.com/lubtd/orbit/x/orbit/keeper"
	"github.com/lubtd/orbit/x/orbit/types"
	"github.com/stretchr/testify/require"
)

func createNStar(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Star {
	items := make([]types.Star, n)
	for i := range items {
		items[i].Id = keeper.AppendStar(ctx, items[i])
	}
	return items
}

func TestStarGet(t *testing.T) {
	keeper, ctx := keepertest.OrbitKeeper(t)
	items := createNStar(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetStar(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestStarRemove(t *testing.T) {
	keeper, ctx := keepertest.OrbitKeeper(t)
	items := createNStar(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveStar(ctx, item.Id)
		_, found := keeper.GetStar(ctx, item.Id)
		require.False(t, found)
	}
}

func TestStarGetAll(t *testing.T) {
	keeper, ctx := keepertest.OrbitKeeper(t)
	items := createNStar(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllStar(ctx)),
	)
}

func TestStarCount(t *testing.T) {
	keeper, ctx := keepertest.OrbitKeeper(t)
	items := createNStar(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetStarCount(ctx))
}
