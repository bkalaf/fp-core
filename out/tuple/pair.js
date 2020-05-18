"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pair = void 0;
function _pair(left, right) {
    return [left, right];
}
function pair(x) {
    return function (y) {
        return _pair(x, y);
    };
}
exports.pair = pair;
//# sourceMappingURL=pair.js.map