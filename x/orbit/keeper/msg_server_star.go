package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/lubtd/orbit/x/orbit/types"
)

func (k msgServer) CreateStar(goCtx context.Context, msg *types.MsgCreateStar) (*types.MsgCreateStarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var star = types.Star{
		Creator: msg.Creator,
		Name:    msg.Name,
	}

	id := k.AppendStar(
		ctx,
		star,
	)

	return &types.MsgCreateStarResponse{
		Id: id,
	}, nil
}

func (k msgServer) UpdateStar(goCtx context.Context, msg *types.MsgUpdateStar) (*types.MsgUpdateStarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var star = types.Star{
		Creator: msg.Creator,
		Id:      msg.Id,
		Name:    msg.Name,
	}

	// Checks that the element exists
	val, found := k.GetStar(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.SetStar(ctx, star)

	return &types.MsgUpdateStarResponse{}, nil
}

func (k msgServer) DeleteStar(goCtx context.Context, msg *types.MsgDeleteStar) (*types.MsgDeleteStarResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Checks that the element exists
	val, found := k.GetStar(ctx, msg.Id)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Id))
	}

	// Checks if the msg creator is the same as the current owner
	if msg.Creator != val.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveStar(ctx, msg.Id)

	return &types.MsgDeleteStarResponse{}, nil
}
