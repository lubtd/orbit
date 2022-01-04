package keeper_test

import (
	"testing"

	testkeeper "github.com/lubtd/orbit/testutil/keeper"
	"github.com/lubtd/orbit/x/orbit/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.OrbitKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
