package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
)

type DelegationMissionHook struct {
	k Keeper
	mission int
}

var _ stakingtypes.StakingHooks = DelegationMissionHook{}

func (k Keeper) NewDelegationMissionHook(mission int) DelegationMissionHook { return DelegationMissionHook{k, mission} }

// BeforeDelegationCreated when a delegation is performed
func (h DelegationMissionHook) BeforeDelegationCreated(ctx sdk.Context, delAddr sdk.AccAddress, _ sdk.ValAddress) {
	h.k.Enable(ctx, delAddr.String())

	return
}

func (h DelegationMissionHook) AfterValidatorCreated(_ sdk.Context, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) AfterValidatorRemoved(_ sdk.Context, _ sdk.ConsAddress, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) BeforeDelegationSharesModified(_ sdk.Context, _ sdk.AccAddress, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) AfterDelegationModified(_ sdk.Context, _ sdk.AccAddress, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) BeforeValidatorSlashed(_ sdk.Context, _ sdk.ValAddress, _ sdk.Dec) { return }
func (h DelegationMissionHook) BeforeValidatorModified(_ sdk.Context, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) AfterValidatorBonded(_ sdk.Context, _ sdk.ConsAddress, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) AfterValidatorBeginUnbonding(_ sdk.Context, _ sdk.ConsAddress, _ sdk.ValAddress) { return }
func (h DelegationMissionHook) BeforeDelegationRemoved(_ sdk.Context, _ sdk.AccAddress, _ sdk.ValAddress) { return }
