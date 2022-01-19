// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateStar } from "./types/orbit/tx";
import { MsgCreateStar } from "./types/orbit/tx";
import { MsgDeleteStar } from "./types/orbit/tx";
const types = [
    ["/lubtd.orbit.orbit.MsgUpdateStar", MsgUpdateStar],
    ["/lubtd.orbit.orbit.MsgCreateStar", MsgCreateStar],
    ["/lubtd.orbit.orbit.MsgDeleteStar", MsgDeleteStar],
];
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgUpdateStar: (data) => ({ typeUrl: "/lubtd.orbit.orbit.MsgUpdateStar", value: MsgUpdateStar.fromPartial(data) }),
        msgCreateStar: (data) => ({ typeUrl: "/lubtd.orbit.orbit.MsgCreateStar", value: MsgCreateStar.fromPartial(data) }),
        msgDeleteStar: (data) => ({ typeUrl: "/lubtd.orbit.orbit.MsgDeleteStar", value: MsgDeleteStar.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
