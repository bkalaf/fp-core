"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fst_1 = require("./fst");
var pair_1 = require("./pair");
var snd_1 = require("./snd");
describe('tuple', function () {
    test('pair1', function () { return expect(pair_1.pair(1)("100")).toStrictEqual([1, "100"]); });
    test('pair2', function () { return expect(pair_1.pair("190")(1)).toStrictEqual(["190", 1]); });
    test('fst', function () { return expect(fst_1.fst(pair_1.pair(100)(200))).toStrictEqual(100); });
    test('snd', function () { return expect(snd_1.snd(pair_1.pair(100)("200"))).toStrictEqual("200"); });
});
//# sourceMappingURL=pair.test.js.map