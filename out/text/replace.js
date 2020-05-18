"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
function replace(toRepl) {
    return function (replacement) {
        return function (baseStr) {
            return baseStr.replace(toRepl, replacement);
        };
    };
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map