"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
function set(value) {
    return function (name) {
        return function (obj) {
            obj[name] = value;
            return obj;
        };
    };
}
exports.set = set;
//# sourceMappingURL=set.js.map