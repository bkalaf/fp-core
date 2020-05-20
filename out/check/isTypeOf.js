"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.neither = exports.isPOJO = exports.isFunction = exports.isArray = exports.isNotNullOrUndefined = exports.isNullOrUndefined = exports.isNotUndefined = exports.isBoolean = exports.isBigInt = exports._isObject = exports._isFunction = exports.isSymbol = exports.isNumber = exports.isString = exports.isObjectInstance = exports.hasNullProto = exports._isNull = exports.isUndef = exports.getProto = exports.isTypeOf = void 0;
var both_1 = require("../fp/logic/both");
var compl_1 = require("../fp/compl");
var compose_1 = require("../fp/compose");
var either_1 = require("../fp/logic/either");
var text_1 = require("../text");
function isTypeOf(label) {
    return function (o) {
        return typeof o === label;
    };
}
exports.isTypeOf = isTypeOf;
function getProto(obj) {
    return Object.getPrototypeOf(obj);
}
exports.getProto = getProto;
exports.isUndef = isTypeOf('undefined');
exports._isNull = function (x) { return x == null && exports.isNotUndefined(x); };
exports.hasNullProto = compose_1.composeL(exports._isNull, getProto);
exports.isObjectInstance = text_1.isInstanceOf(Object);
exports.isString = isTypeOf('string');
exports.isNumber = isTypeOf('number');
exports.isSymbol = isTypeOf('symbol');
exports._isFunction = isTypeOf('function');
exports._isObject = isTypeOf('object');
exports.isBigInt = isTypeOf('bigint');
exports.isBoolean = isTypeOf("boolean");
exports.isNotUndefined = compl_1.compl(exports.isUndef);
exports.isNullOrUndefined = either_1.either(exports._isNull)(exports.isUndef);
exports.isNotNullOrUndefined = compl_1.compl(exports.isNullOrUndefined);
exports.isArray = function (x) { return Array.isArray(x); };
exports.isFunction = both_1.both(exports._isFunction)(text_1.isInstanceOf(Function));
exports.isPOJO = function (x) {
    return both_1.both(both_1.both(exports._isObject)(either_1.either(exports.hasNullProto)(exports.isObjectInstance)))(compl_1.compl(exports.isArray))(x);
};
exports.neither = function (p1) { return function (p2) { return both_1.both(compl_1.compl(p1))(compl_1.compl(p2)); }; };
exports.isObject = function (x) {
    return both_1.both(exports._isObject)(exports.neither(exports.isFunction)(exports.isArray))(x);
};
//# sourceMappingURL=isTypeOf.js.map