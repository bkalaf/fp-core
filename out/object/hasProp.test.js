"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasProp_1 = require("./hasProp");
describe('hasProp', function () {
    test('has', function () { return expect(hasProp_1.hasProp("test")({ test: 100 })).toStrictEqual(true); });
    test('hasnot', function () { return expect(hasProp_1.hasProp("test")({ testing: 100 })).toStrictEqual(false); });
});
//# sourceMappingURL=hasProp.test.js.map