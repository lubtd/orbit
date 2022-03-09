package toast_test

import (
	"testing"

	keepertest "github.com/lubtd/orbit/testutil/keeper"
	"github.com/lubtd/orbit/testutil/nullify"
	"github.com/lubtd/orbit/x/toast"
	"github.com/lubtd/orbit/x/toast/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		EnableMapList: []types.EnableMap{
			{
				Address: "0",
			},
			{
				Address: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ToastKeeper(t)
	toast.InitGenesis(ctx, *k, genesisState)
	got := toast.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.EnableMapList, got.EnableMapList)
	// this line is used by starport scaffolding # genesis/test/assert
}
