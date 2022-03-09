package toast

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/lubtd/orbit/x/toast/keeper"
	"github.com/lubtd/orbit/x/toast/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the enableMap
	for _, elem := range genState.EnableMapList {
		k.SetEnableMap(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.EnableMapList = k.GetAllEnableMap(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
