"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProp = void 0;
var hasOwnProperty = Object.hasOwnProperty;
function hasProp(name) {
    return function (obj) {
        return hasOwnProperty.call(obj, name);
    };
}
exports.hasProp = hasProp;
//# sourceMappingURL=hasProp.js.map