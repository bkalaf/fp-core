"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultArg = void 0;
function defaultArg(defVal) {
    return function (value) {
        return value ? value : defVal;
    };
}
exports.defaultArg = defaultArg;
//# sourceMappingURL=defaultArg.js.map