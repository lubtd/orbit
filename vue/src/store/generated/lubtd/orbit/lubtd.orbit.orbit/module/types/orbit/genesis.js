/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../orbit/params";
import { Star } from "../orbit/star";
export const protobufPackage = "lubtd.orbit.orbit";
const baseGenesisState = { starCount: 0 };
export const GenesisState = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.starList) {
            Star.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.starCount !== 0) {
            writer.uint32(24).uint64(message.starCount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseGenesisState };
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
                    message.starCount = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseGenesisState };
        message.starList = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.starList !== undefined && object.starList !== null) {
            for (const e of object.starList) {
                message.starList.push(Star.fromJSON(e));
            }
        }
        if (object.starCount !== undefined && object.starCount !== null) {
            message.starCount = Number(object.starCount);
        }
        else {
            message.starCount = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        if (message.starList) {
            obj.starList = message.starList.map((e) => e ? Star.toJSON(e) : undefined);
        }
        else {
            obj.starList = [];
        }
        message.starCount !== undefined && (obj.starCount = message.starCount);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseGenesisState };
        message.starList = [];
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        if (object.starList !== undefined && object.starList !== null) {
            for (const e of object.starList) {
                message.starList.push(Star.fromPartial(e));
            }
        }
        if (object.starCount !== undefined && object.starCount !== null) {
            message.starCount = object.starCount;
        }
        else {
            message.starCount = 0;
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
