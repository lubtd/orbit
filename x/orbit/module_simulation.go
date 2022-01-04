package orbit

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/lubtd/orbit/testutil/sample"
	orbitsimulation "github.com/lubtd/orbit/x/orbit/simulation"
	"github.com/lubtd/orbit/x/orbit/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = orbitsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateStar = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateStar int = 100

	opWeightMsgUpdateStar = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateStar int = 100

	opWeightMsgDeleteStar = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteStar int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	orbitGenesis := types.GenesisState{
		StarList: []types.Star{
			{
				Id:      0,
				Creator: sample.AccAddress(),
			},
			{
				Id:      1,
				Creator: sample.AccAddress(),
			},
		},
		StarCount: 2,
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&orbitGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCreateStar int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateStar, &weightMsgCreateStar, nil,
		func(_ *rand.Rand) {
			weightMsgCreateStar = defaultWeightMsgCreateStar
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateStar,
		orbitsimulation.SimulateMsgCreateStar(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateStar int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateStar, &weightMsgUpdateStar, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateStar = defaultWeightMsgUpdateStar
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateStar,
		orbitsimulation.SimulateMsgUpdateStar(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteStar int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteStar, &weightMsgDeleteStar, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteStar = defaultWeightMsgDeleteStar
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteStar,
		orbitsimulation.SimulateMsgDeleteStar(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
