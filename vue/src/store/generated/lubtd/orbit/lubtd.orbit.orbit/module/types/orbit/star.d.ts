import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "lubtd.orbit.orbit";
export interface Star {
    id: number;
    name: string;
    creator: string;
}
export declare const Star: {
    encode(message: Star, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Star;
    fromJSON(object: any): Star;
    toJSON(message: Star): unknown;
    fromPartial(object: DeepPartial<Star>): Star;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
