"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padZero = exports.repeat = exports.isInstanceOf = void 0;
function isInstanceOf(T) {
    return function (o) {
        return o instanceof T;
    };
}
exports.isInstanceOf = isInstanceOf;
function repeat(txt) {
    return function (qty) {
        return txt.repeat(qty);
    };
}
exports.repeat = repeat;
function padZero(padLength) {
    return function (s) {
        var len = s.length;
        var padded = (padLength - len) < 0 ? 0 : padLength - len;
        var txt = '0'.repeat(padded);
        return "" + txt + s;
    };
}
exports.padZero = padZero;
//# sourceMappingURL=padZero.js.map