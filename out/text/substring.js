"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring = exports.isUndefined = exports.isType = void 0;
var eq_1 = require("../fp/eq");
function isType(s) {
    return function (x) {
        return typeof x === s;
    };
}
exports.isType = isType;
exports.isUndefined = isType('undefined');
function substring(start) {
    return function (length) {
        return function (str) {
            var total = str.length - (start);
            var len = exports.isUndefined(length) || eq_1.eq(0)(length) ? total : length;
            if (total < len)
                throw Error('bad length passed to substring');
            return str.substr(start, len);
        };
    };
}
exports.substring = substring;
//# sourceMappingURL=substring.js.map