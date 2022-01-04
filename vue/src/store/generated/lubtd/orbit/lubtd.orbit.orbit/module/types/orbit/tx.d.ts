import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "lubtd.orbit.orbit";
export interface MsgCreateStar {
    creator: string;
    name: string;
}
export interface MsgCreateStarResponse {
    id: number;
}
export interface MsgUpdateStar {
    creator: string;
    id: number;
    name: string;
}
export interface MsgUpdateStarResponse {
}
export interface MsgDeleteStar {
    creator: string;
    id: number;
}
export interface MsgDeleteStarResponse {
}
export declare const MsgCreateStar: {
    encode(message: MsgCreateStar, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateStar;
    fromJSON(object: any): MsgCreateStar;
    toJSON(message: MsgCreateStar): unknown;
    fromPartial(object: DeepPartial<MsgCreateStar>): MsgCreateStar;
};
export declare const MsgCreateStarResponse: {
    encode(message: MsgCreateStarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgCreateStarResponse;
    fromJSON(object: any): MsgCreateStarResponse;
    toJSON(message: MsgCreateStarResponse): unknown;
    fromPartial(object: DeepPartial<MsgCreateStarResponse>): MsgCreateStarResponse;
};
export declare const MsgUpdateStar: {
    encode(message: MsgUpdateStar, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateStar;
    fromJSON(object: any): MsgUpdateStar;
    toJSON(message: MsgUpdateStar): unknown;
    fromPartial(object: DeepPartial<MsgUpdateStar>): MsgUpdateStar;
};
export declare const MsgUpdateStarResponse: {
    encode(_: MsgUpdateStarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgUpdateStarResponse;
    fromJSON(_: any): MsgUpdateStarResponse;
    toJSON(_: MsgUpdateStarResponse): unknown;
    fromPartial(_: DeepPartial<MsgUpdateStarResponse>): MsgUpdateStarResponse;
};
export declare const MsgDeleteStar: {
    encode(message: MsgDeleteStar, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteStar;
    fromJSON(object: any): MsgDeleteStar;
    toJSON(message: MsgDeleteStar): unknown;
    fromPartial(object: DeepPartial<MsgDeleteStar>): MsgDeleteStar;
};
export declare const MsgDeleteStarResponse: {
    encode(_: MsgDeleteStarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgDeleteStarResponse;
    fromJSON(_: any): MsgDeleteStarResponse;
    toJSON(_: MsgDeleteStarResponse): unknown;
    fromPartial(_: DeepPartial<MsgDeleteStarResponse>): MsgDeleteStarResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    CreateStar(request: MsgCreateStar): Promise<MsgCreateStarResponse>;
    UpdateStar(request: MsgUpdateStar): Promise<MsgUpdateStarResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    DeleteStar(request: MsgDeleteStar): Promise<MsgDeleteStarResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    CreateStar(request: MsgCreateStar): Promise<MsgCreateStarResponse>;
    UpdateStar(request: MsgUpdateStar): Promise<MsgUpdateStarResponse>;
    DeleteStar(request: MsgDeleteStar): Promise<MsgDeleteStarResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
