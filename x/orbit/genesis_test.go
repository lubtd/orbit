package orbit_test

import (
	"testing"

	keepertest "github.com/lubtd/orbit/testutil/keeper"
	"github.com/lubtd/orbit/testutil/nullify"
	"github.com/lubtd/orbit/x/orbit"
	"github.com/lubtd/orbit/x/orbit/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		StarList: []types.Star{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		StarCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.OrbitKeeper(t)
	orbit.InitGenesis(ctx, *k, genesisState)
	got := orbit.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.StarList, got.StarList)
	require.Equal(t, genesisState.StarCount, got.StarCount)
	// this line is used by starport scaffolding # genesis/test/assert
}
