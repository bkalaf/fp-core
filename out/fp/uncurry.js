"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncurry = void 0;
function uncurry(f) {
    return function (x, y) {
        return f(x)(y);
    };
}
exports.uncurry = uncurry;
//# sourceMappingURL=uncurry.js.map