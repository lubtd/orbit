import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../orbit/params";
import { Star } from "../orbit/star";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
export declare const protobufPackage = "lubtd.orbit.orbit";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryGetStarRequest {
    id: number;
}
export interface QueryGetStarResponse {
    Star: Star | undefined;
}
export interface QueryAllStarRequest {
    pagination: PageRequest | undefined;
}
export interface QueryAllStarResponse {
    Star: Star[];
    pagination: PageResponse | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryGetStarRequest: {
    encode(message: QueryGetStarRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetStarRequest;
    fromJSON(object: any): QueryGetStarRequest;
    toJSON(message: QueryGetStarRequest): unknown;
    fromPartial(object: DeepPartial<QueryGetStarRequest>): QueryGetStarRequest;
};
export declare const QueryGetStarResponse: {
    encode(message: QueryGetStarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetStarResponse;
    fromJSON(object: any): QueryGetStarResponse;
    toJSON(message: QueryGetStarResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetStarResponse>): QueryGetStarResponse;
};
export declare const QueryAllStarRequest: {
    encode(message: QueryAllStarRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllStarRequest;
    fromJSON(object: any): QueryAllStarRequest;
    toJSON(message: QueryAllStarRequest): unknown;
    fromPartial(object: DeepPartial<QueryAllStarRequest>): QueryAllStarRequest;
};
export declare const QueryAllStarResponse: {
    encode(message: QueryAllStarResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryAllStarResponse;
    fromJSON(object: any): QueryAllStarResponse;
    toJSON(message: QueryAllStarResponse): unknown;
    fromPartial(object: DeepPartial<QueryAllStarResponse>): QueryAllStarResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a Star by id. */
    Star(request: QueryGetStarRequest): Promise<QueryGetStarResponse>;
    /** Queries a list of Star items. */
    StarAll(request: QueryAllStarRequest): Promise<QueryAllStarResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Star(request: QueryGetStarRequest): Promise<QueryGetStarResponse>;
    StarAll(request: QueryAllStarRequest): Promise<QueryAllStarResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
