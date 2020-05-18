"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertObj = exports.getOwnPropertyNames = exports.hasOwnProperty = void 0;
exports.hasOwnProperty = Object.hasOwnProperty, exports.getOwnPropertyNames = Object.getOwnPropertyNames;
function invertObj(obj) {
    var result = {};
    exports.getOwnPropertyNames(obj).forEach(function (n) {
        if (exports.hasOwnProperty.call(result, obj[n])) {
            result[obj[n]] = __spreadArrays([n], result[obj[n]]);
        }
        else {
            result[obj[n]] = [n];
        }
    });
    return result;
}
exports.invertObj = invertObj;
//# sourceMappingURL=invertObj.js.map