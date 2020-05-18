"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.both = exports._both = void 0;
function _both(p1, p2) {
    return function (x) { return p1(x) ? p2(x) : false; };
}
exports._both = _both;
function both(p1) {
    return function (p2) {
        return _both(p1, p2);
    };
}
exports.both = both;
//# sourceMappingURL=both.js.map