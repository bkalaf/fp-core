"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var eq_1 = require("../fp/eq");
var isEmpty_1 = require("./isEmpty");
var ofCharArray_1 = require("./ofCharArray");
var substring_1 = require("./substring");
var tail_1 = require("./tail");
var toCharArray_1 = require("./toCharArray");
function contains(tocheck) {
    return function (baseStr) {
        function inner(s1, s2) {
            if (isEmpty_1.isEmpty(s1) || isEmpty_1.isEmpty(s2))
                return true;
            var _a = toCharArray_1.toCharArray(s1), h1 = _a[0], t1 = _a.slice(1);
            var _b = toCharArray_1.toCharArray(s2), h2 = _b[0], t2 = _b.slice(1);
            return eq_1.eq(h1)(h2) ? inner(ofCharArray_1.ofCharArray(t1), ofCharArray_1.ofCharArray(t2)) : false;
        }
        if (isEmpty_1.isEmpty(tocheck) || isEmpty_1.isEmpty(baseStr) || tocheck.length > baseStr.length)
            return false;
        return inner(tocheck, substring_1.substring(0)(tocheck.length)(baseStr)) ? true : contains(tocheck)(tail_1.tail(baseStr));
    };
}
exports.contains = contains;
//# sourceMappingURL=contains.js.map