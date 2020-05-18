"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._deepCopy = exports.isPrimitiveType = exports._copyProperties = void 0;
var padZero_1 = require("./../text/padZero");
var any_1 = require("src/fp/logic/any");
var getProperties_1 = require("./getProperties");
var hasProp_1 = require("../object/hasProp");
var isArray_1 = require("./isArray");
function _copyProperties(obj) {
    return getProperties_1.getProperties(obj).map(function (_a) {
        var _b;
        var n = _a[0], desc = _a[1];
        return (_b = {}, _b[n] = desc.value, _b);
    }).reduce(Object.assign, {});
}
exports._copyProperties = _copyProperties;
exports.isPrimitiveType = any_1.any(padZero_1.isSymbol, padZero_1.isString, padZero_1.isNumber, padZero_1.isBoolean);
function _deepCopy(source, target) {
    if (target === void 0) { target = {}; }
    var props = getProperties_1.getProperties(source);
    props.forEach(function (_a) {
        var n = _a[0], desc = _a[1];
        var result = desc === null || desc === void 0 ? void 0 : desc.value;
        var final = result;
        if (hasProp_1.hasProp(n)(target)) {
            var result2 = target[n];
            if (isArray_1.isArray(result2)) {
                final = __spreadArrays(result, result2);
            }
            else if (padZero_1.isObject(result2)) {
                final = __assign(__assign({}, result), result2);
            }
            else if (exports.isPrimitiveType(result2)) {
                final = [result, result2];
            }
            final = result;
        }
        target[n] = final;
    });
}
exports._deepCopy = _deepCopy;
console.log(_deepCopy({ 1: 'one', 2: 'two', 'three': 3, four: {}, 5: ['one', 'two'] }));
//# sourceMappingURL=_copyProperties.js.map