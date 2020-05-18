"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var substring_1 = require("./substring");
describe('substring', function () {
    test('0, none', function () { return expect(substring_1.substring(1)(0)("abc")).toStrictEqual("bc"); });
    test('2, yes', function () { return expect(substring_1.substring(2)(2)("abcdefgh")).toStrictEqual("cd"); });
    test('2', function () { return expect(substring_1.substring(2)(undefined)("abcdefg")).toStrictEqual("cdefg"); });
});
//# sourceMappingURL=substring.test.js.map