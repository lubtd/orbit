package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/lubtd/orbit/x/orbit/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) StarAll(c context.Context, req *types.QueryAllStarRequest) (*types.QueryAllStarResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var stars []types.Star
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	starStore := prefix.NewStore(store, types.KeyPrefix(types.StarKey))

	pageRes, err := query.Paginate(starStore, req.Pagination, func(key []byte, value []byte) error {
		var star types.Star
		if err := k.cdc.Unmarshal(value, &star); err != nil {
			return err
		}

		stars = append(stars, star)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllStarResponse{Star: stars, Pagination: pageRes}, nil
}

func (k Keeper) Star(c context.Context, req *types.QueryGetStarRequest) (*types.QueryGetStarResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	star, found := k.GetStar(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetStarResponse{Star: star}, nil
}
