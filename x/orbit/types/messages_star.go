package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateStar = "create_star"
	TypeMsgUpdateStar = "update_star"
	TypeMsgDeleteStar = "delete_star"
)

var _ sdk.Msg = &MsgCreateStar{}

func NewMsgCreateStar(creator string, name string) *MsgCreateStar {
	return &MsgCreateStar{
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgCreateStar) Route() string {
	return RouterKey
}

func (msg *MsgCreateStar) Type() string {
	return TypeMsgCreateStar
}

func (msg *MsgCreateStar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateStar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateStar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateStar{}

func NewMsgUpdateStar(creator string, id uint64, name string) *MsgUpdateStar {
	return &MsgUpdateStar{
		Id:      id,
		Creator: creator,
		Name:    name,
	}
}

func (msg *MsgUpdateStar) Route() string {
	return RouterKey
}

func (msg *MsgUpdateStar) Type() string {
	return TypeMsgUpdateStar
}

func (msg *MsgUpdateStar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateStar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateStar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteStar{}

func NewMsgDeleteStar(creator string, id uint64) *MsgDeleteStar {
	return &MsgDeleteStar{
		Id:      id,
		Creator: creator,
	}
}
func (msg *MsgDeleteStar) Route() string {
	return RouterKey
}

func (msg *MsgDeleteStar) Type() string {
	return TypeMsgDeleteStar
}

func (msg *MsgDeleteStar) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteStar) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteStar) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
