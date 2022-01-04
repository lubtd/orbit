/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "lubtd.orbit.orbit";

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

export interface MsgUpdateStarResponse {}

export interface MsgDeleteStar {
  creator: string;
  id: number;
}

export interface MsgDeleteStarResponse {}

const baseMsgCreateStar: object = { creator: "", name: "" };

export const MsgCreateStar = {
  encode(message: MsgCreateStar, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateStar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateStar } as MsgCreateStar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateStar {
    const message = { ...baseMsgCreateStar } as MsgCreateStar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgCreateStar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateStar>): MsgCreateStar {
    const message = { ...baseMsgCreateStar } as MsgCreateStar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgCreateStarResponse: object = { id: 0 };

export const MsgCreateStarResponse = {
  encode(
    message: MsgCreateStarResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateStarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateStarResponse } as MsgCreateStarResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateStarResponse {
    const message = { ...baseMsgCreateStarResponse } as MsgCreateStarResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateStarResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateStarResponse>
  ): MsgCreateStarResponse {
    const message = { ...baseMsgCreateStarResponse } as MsgCreateStarResponse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgUpdateStar: object = { creator: "", id: 0, name: "" };

export const MsgUpdateStar = {
  encode(message: MsgUpdateStar, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateStar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateStar } as MsgUpdateStar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateStar {
    const message = { ...baseMsgUpdateStar } as MsgUpdateStar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateStar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateStar>): MsgUpdateStar {
    const message = { ...baseMsgUpdateStar } as MsgUpdateStar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
};

const baseMsgUpdateStarResponse: object = {};

export const MsgUpdateStarResponse = {
  encode(_: MsgUpdateStarResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgUpdateStarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateStarResponse } as MsgUpdateStarResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateStarResponse {
    const message = { ...baseMsgUpdateStarResponse } as MsgUpdateStarResponse;
    return message;
  },

  toJSON(_: MsgUpdateStarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateStarResponse>): MsgUpdateStarResponse {
    const message = { ...baseMsgUpdateStarResponse } as MsgUpdateStarResponse;
    return message;
  },
};

const baseMsgDeleteStar: object = { creator: "", id: 0 };

export const MsgDeleteStar = {
  encode(message: MsgDeleteStar, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteStar {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteStar } as MsgDeleteStar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteStar {
    const message = { ...baseMsgDeleteStar } as MsgDeleteStar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: MsgDeleteStar): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteStar>): MsgDeleteStar {
    const message = { ...baseMsgDeleteStar } as MsgDeleteStar;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseMsgDeleteStarResponse: object = {};

export const MsgDeleteStarResponse = {
  encode(_: MsgDeleteStarResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgDeleteStarResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteStarResponse } as MsgDeleteStarResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeleteStarResponse {
    const message = { ...baseMsgDeleteStarResponse } as MsgDeleteStarResponse;
    return message;
  },

  toJSON(_: MsgDeleteStarResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgDeleteStarResponse>): MsgDeleteStarResponse {
    const message = { ...baseMsgDeleteStarResponse } as MsgDeleteStarResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateStar(request: MsgCreateStar): Promise<MsgCreateStarResponse>;
  UpdateStar(request: MsgUpdateStar): Promise<MsgUpdateStarResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  DeleteStar(request: MsgDeleteStar): Promise<MsgDeleteStarResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateStar(request: MsgCreateStar): Promise<MsgCreateStarResponse> {
    const data = MsgCreateStar.encode(request).finish();
    const promise = this.rpc.request(
      "lubtd.orbit.orbit.Msg",
      "CreateStar",
      data
    );
    return promise.then((data) =>
      MsgCreateStarResponse.decode(new Reader(data))
    );
  }

  UpdateStar(request: MsgUpdateStar): Promise<MsgUpdateStarResponse> {
    const data = MsgUpdateStar.encode(request).finish();
    const promise = this.rpc.request(
      "lubtd.orbit.orbit.Msg",
      "UpdateStar",
      data
    );
    return promise.then((data) =>
      MsgUpdateStarResponse.decode(new Reader(data))
    );
  }

  DeleteStar(request: MsgDeleteStar): Promise<MsgDeleteStarResponse> {
    const data = MsgDeleteStar.encode(request).finish();
    const promise = this.rpc.request(
      "lubtd.orbit.orbit.Msg",
      "DeleteStar",
      data
    );
    return promise.then((data) =>
      MsgDeleteStarResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
