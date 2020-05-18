"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tail = void 0;
var ofCharArray_1 = require("./ofCharArray");
var toCharArray_1 = require("./toCharArray");
function tail(str) {
    var _a = toCharArray_1.toCharArray(str), h = _a[0], t = _a.slice(1);
    return ofCharArray_1.ofCharArray(t);
}
exports.tail = tail;
//# sourceMappingURL=tail.js.map