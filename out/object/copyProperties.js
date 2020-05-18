"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._merge = exports.combinePropList = exports.isPrimitiveType = void 0;
var isTypeOf_1 = require("../check/isTypeOf");
var any_1 = require("../fp/logic/any");
var arrayConcat_1 = require("../collections/array/arrayConcat");
var distinct_1 = require("../collections/array/distinct");
var getDescriptor_1 = require("./getDescriptor");
var getProperties_1 = require("./getProperties");
var isArray_1 = require("../check/isArray");
exports.isPrimitiveType = any_1.any(isTypeOf_1.isSymbol, isTypeOf_1.isString, isTypeOf_1.isNumber, isTypeOf_1.isBoolean);
function combinePropList(t1, t2) {
    return arrayConcat_1.arrayConcat(getProperties_1.getProperties(t1), getProperties_1.getProperties(t2));
}
exports.combinePropList = combinePropList;
function _merge(source1, source2) {
    function inner(name, dest) {
        var _a = [getDescriptor_1.getDescriptor(source1, name), getDescriptor_1.getDescriptor(source2, name)], descr1 = _a[0], descr2 = _a[1];
        var _b = [source1[name], source2[name]], result1 = _b[0], result2 = _b[1];
        console.log("descr1: " + descr1 + " descr2: " + descr2 + " result1: " + result1 + " result2: " + result2);
        if (isArray_1.isArray(result1) && isArray_1.isArray(result2)) {
            return __spreadArrays(result1, result2);
        }
        else if (isTypeOf_1.isFunction(result1) || isTypeOf_1.isFunction(result2)) {
            var basedescr = isTypeOf_1.isUndefined(result1) ? descr2 : descr1;
            var d = dest;
            return basedescr === null || basedescr === void 0 ? void 0 : basedescr.value;
        }
        else if (isTypeOf_1.isObject(result1) && isTypeOf_1.isObject(result2)) {
            return _merge(result1, result2);
        }
        else if (exports.isPrimitiveType(result1) && exports.isPrimitiveType(result2)) {
            return [result1, result2];
        }
        else if (isTypeOf_1.isNullOrUndefined(result1) && isTypeOf_1.isNotNullOrUndefined(result2)) {
            return result2;
        }
        else if (isTypeOf_1.isNotNullOrUndefined(result1) && isTypeOf_1.isNullOrUndefined(result2)) {
            return result1;
        }
        else {
            return result1;
        }
    }
    var target = {};
    distinct_1.distinct(combinePropList(source1, source2)).forEach(function (n) {
        console.log("foreach: " + n);
        target[n] = inner(n, target);
    });
    return target;
}
exports._merge = _merge;
var item1 = { 1: 'one', 2: 'two', 3: [1, 2, 3], 6: { testing2: 'test' }, toText: function () { return 1; } };
var item2 = { 3: [4, 5], 6: { testing: 'test' } };
console.log(_merge({ 1: 'one', 2: 'two', three: 3, four: {}, 5: ['one', 'two'] }, {}));
console.log(_merge(item1, item2));
console.log(_merge(item1, item2).toText());
//# sourceMappingURL=copyProperties.js.map