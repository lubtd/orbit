package orbit

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/lubtd/orbit/x/orbit/keeper"
	"github.com/lubtd/orbit/x/orbit/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the star
	for _, elem := range genState.StarList {
		k.SetStar(ctx, elem)
	}

	// Set star count
	k.SetStarCount(ctx, genState.StarCount)
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.StarList = k.GetAllStar(ctx)
	genesis.StarCount = k.GetStarCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
