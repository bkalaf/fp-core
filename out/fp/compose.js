"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = exports.composeR = exports.composeL = void 0;
function composeL(f, g) {
    return function (item) {
        return f(g(item));
    };
}
exports.composeL = composeL;
function composeR(f, g) {
    return function (item) {
        return g(f(item));
    };
}
exports.composeR = composeR;
exports.$ = composeL;
//# sourceMappingURL=compose.js.map