"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contains_1 = require("./contains");
describe('contains', function () {
    test('single, true', function () { return expect(contains_1.contains('a')('baby')).toStrictEqual(true); });
    test('single, false', function () { return expect(contains_1.contains('a')('other')).toStrictEqual(false); });
    test('multi, true', function () { return expect(contains_1.contains('other')('the other side')).toStrictEqual(true); });
    test('multi, false', function () { return expect(contains_1.contains('close')('the closte')).toStrictEqual(false); });
});
//# sourceMappingURL=contains.test.js.map