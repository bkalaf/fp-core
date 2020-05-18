"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
var maybe_1 = require("../datastruct/maybe");
var maybe_2 = require("../datastruct/maybe");
var getDescriptor_1 = require("./getDescriptor");
function get(name) {
    return function (obj) {
        var maybe = getDescriptor_1.getDescriptor(obj, name);
        return maybe_1.isJust(maybe) ? maybe_1.Just(maybe.value.value) : maybe_2.Nothing();
    };
}
exports.get = get;
//# sourceMappingURL=get.js.map