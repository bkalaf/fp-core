"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotNullOrUndefined = exports.isNullOrUndefined = exports.isNotUndefined = exports.isBoolean = exports.isBigInt = exports.isObject = exports.isFunction = exports.isSymbol = exports.isNumber = exports.isString = exports.isNull = exports.isUndefined = exports.isTypeOf = void 0;
var compl_1 = require("../fp/compl");
var either_1 = require("../fp/logic/either");
function isTypeOf(label) {
    return function (o) {
        return typeof o === label;
    };
}
exports.isTypeOf = isTypeOf;
exports.isUndefined = isTypeOf('undefined');
exports.isNull = function (x) { return x == null && exports.isNotUndefined(x); };
exports.isString = isTypeOf('string');
exports.isNumber = isTypeOf('number');
exports.isSymbol = isTypeOf('symbol');
exports.isFunction = isTypeOf('function');
exports.isObject = isTypeOf('object');
exports.isBigInt = isTypeOf('bigint');
exports.isBoolean = isTypeOf("boolean");
exports.isNotUndefined = compl_1.compl(exports.isUndefined);
exports.isNullOrUndefined = either_1.either(exports.isNull)(exports.isUndefined);
exports.isNotNullOrUndefined = compl_1.compl(exports.isNullOrUndefined);
//# sourceMappingURL=isTypeOf.js.map