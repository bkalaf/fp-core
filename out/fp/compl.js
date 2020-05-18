"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compl = void 0;
function compl(predicate) {
    return function (x) {
        return !predicate(x);
    };
}
exports.compl = compl;
//# sourceMappingURL=compl.js.map