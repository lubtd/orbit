/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../orbit/params";
import { Star } from "../orbit/star";

export const protobufPackage = "lubtd.orbit.orbit";

/** GenesisState defines the orbit module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  starList: Star[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  starCount: number;
}

const baseGenesisState: object = { starCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.starList) {
      Star.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.starCount !== 0) {
      writer.uint32(24).uint64(message.starCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.starList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.starList.push(Star.decode(reader, reader.uint32()));
          break;
        case 3:
          message.starCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.starList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.starList !== undefined && object.starList !== null) {
      for (const e of object.starList) {
        message.starList.push(Star.fromJSON(e));
      }
    }
    if (object.starCount !== undefined && object.starCount !== null) {
      message.starCount = Number(object.starCount);
    } else {
      message.starCount = 0;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.starList) {
      obj.starList = message.starList.map((e) =>
        e ? Star.toJSON(e) : undefined
      );
    } else {
      obj.starList = [];
    }
    message.starCount !== undefined && (obj.starCount = message.starCount);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.starList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.starList !== undefined && object.starList !== null) {
      for (const e of object.starList) {
        message.starList.push(Star.fromPartial(e));
      }
    }
    if (object.starCount !== undefined && object.starCount !== null) {
      message.starCount = object.starCount;
    } else {
      message.starCount = 0;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
