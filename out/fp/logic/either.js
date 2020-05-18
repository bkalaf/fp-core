"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.either = exports._either = void 0;
function _either(p1, p2) {
    return function (x) { return p1(x) ? true : p2(x); };
}
exports._either = _either;
function either(p1) {
    return function (p2) {
        return _either(p1, p2);
    };
}
exports.either = either;
//# sourceMappingURL=either.js.map