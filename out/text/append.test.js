"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var append_1 = require("./append");
describe('append', function () {
    test('append 1', function () { return expect(append_1.append('!')('no')).toStrictEqual('no!'); });
    test('append 2', function () { return expect(append_1.append('no')('!')).toStrictEqual('!no'); });
    test('prepend 1', function () { return expect(append_1.prepend('!')('no')).toStrictEqual('!no'); });
    test('prepend 2', function () { return expect(append_1.prepend('yes')('!')).toStrictEqual('yes!'); });
});
//# sourceMappingURL=append.test.js.map