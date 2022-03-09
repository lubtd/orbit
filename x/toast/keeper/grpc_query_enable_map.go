package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/lubtd/orbit/x/toast/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) EnableMapAll(c context.Context, req *types.QueryAllEnableMapRequest) (*types.QueryAllEnableMapResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var enableMaps []types.EnableMap
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	enableMapStore := prefix.NewStore(store, types.KeyPrefix(types.EnableMapKeyPrefix))

	pageRes, err := query.Paginate(enableMapStore, req.Pagination, func(key []byte, value []byte) error {
		var enableMap types.EnableMap
		if err := k.cdc.Unmarshal(value, &enableMap); err != nil {
			return err
		}

		enableMaps = append(enableMaps, enableMap)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllEnableMapResponse{EnableMap: enableMaps, Pagination: pageRes}, nil
}

func (k Keeper) EnableMap(c context.Context, req *types.QueryGetEnableMapRequest) (*types.QueryGetEnableMapResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetEnableMap(
		ctx,
		req.Address,
	)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "not found")
	}

	return &types.QueryGetEnableMapResponse{EnableMap: val}, nil
}
