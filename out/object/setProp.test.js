"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setProp_1 = require("./setProp");
describe('setProp', function () {
    test('non-existing', function () { return expect(setProp_1.setProp(1)("prop")({})).toHaveProperty('prop', 1); });
    test('existing', function () { return expect(setProp_1.setProp(10)("prop")({ prop: 100 })).toHaveProperty('prop', 10); });
});
//# sourceMappingURL=setProp.test.js.map