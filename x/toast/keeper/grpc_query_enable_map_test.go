package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/lubtd/orbit/testutil/keeper"
	"github.com/lubtd/orbit/testutil/nullify"
	"github.com/lubtd/orbit/x/toast/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestEnableMapQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.ToastKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNEnableMap(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetEnableMapRequest
		response *types.QueryGetEnableMapResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetEnableMapRequest{
				Address: msgs[0].Address,
			},
			response: &types.QueryGetEnableMapResponse{EnableMap: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetEnableMapRequest{
				Address: msgs[1].Address,
			},
			response: &types.QueryGetEnableMapResponse{EnableMap: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetEnableMapRequest{
				Address: strconv.Itoa(100000),
			},
			err: status.Error(codes.InvalidArgument, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.EnableMap(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestEnableMapQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.ToastKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNEnableMap(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllEnableMapRequest {
		return &types.QueryAllEnableMapRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.EnableMapAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.EnableMap), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.EnableMap),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.EnableMapAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.EnableMap), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.EnableMap),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.EnableMapAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.EnableMap),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.EnableMapAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
