"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry3 = exports.curry = void 0;
function curry(f) {
    return function (x) {
        return function (y) {
            return f(x, y);
        };
    };
}
exports.curry = curry;
function curry3(f) {
    return function (x) {
        return function (y) {
            return function (z) {
                return f(x, y, z);
            };
        };
    };
}
exports.curry3 = curry3;
//# sourceMappingURL=curry.js.map