"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flipTup = exports.flip = void 0;
function flip(f) {
    return function (x) {
        return function (y) {
            return (f(y)(x));
        };
    };
}
exports.flip = flip;
function flipTup(f) {
    return function (x, y) {
        return f(y, x);
    };
}
exports.flipTup = flipTup;
//# sourceMappingURL=flip.js.map