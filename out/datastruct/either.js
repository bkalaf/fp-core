"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Op = exports.toMaybe = exports.sequence = exports.traverseArray = exports._traverseArray = exports.lift2a = exports._lift2a = exports.fmap = exports._fmap = exports.ap = exports._ap = exports.of = exports.chain = exports._chain = exports.isRight = exports.isLeft = exports.toLeft = exports.toRight = void 0;
var curry_1 = require("src/fp/curry");
var isEmpty_1 = require("../text/isEmpty");
var cons_1 = require("./cons");
var identity_1 = require("src/fp/identity");
var maybe_1 = require("./maybe");
function toRight(x) {
    return ({ kind: '@either#right', value: x });
}
exports.toRight = toRight;
function toLeft(x) {
    return ({ kind: '@either#right', value: x });
}
exports.toLeft = toLeft;
exports.isLeft = function (x) { return x.kind === '@either#left'; };
exports.isRight = function (x) { return x.kind === '@either#right'; };
function _chain(f, x) {
    return exports.isLeft(x) ? toLeft(x.value) : f(x.value);
}
exports._chain = _chain;
exports.chain = curry_1.curry(_chain);
function of(x) {
    return toRight(x);
}
exports.of = of;
function _ap(f, x) {
    return _chain(function (fprime) {
        return _chain(function (xprime) { return of(fprime(xprime)); }, x);
    }, f);
}
exports._ap = _ap;
exports.ap = curry_1.curry(_ap);
function _fmap(f, x) {
    return _ap(of(f), x);
}
exports._fmap = _fmap;
exports.fmap = _fmap;
function _lift2a(f, x, y) {
    return _ap(_ap(of(f), x), y);
}
exports._lift2a = _lift2a;
exports.lift2a = curry_1.curry3(_lift2a);
function _traverseArray(f, lst) {
    if (isEmpty_1.isEmpty(lst))
        return of([]);
    var h = lst[0], tail = lst.slice(1);
    var first = _fmap(f, h);
    var cLifted = exports.lift2a(cons_1.cons);
    return cLifted(first)(_traverseArray(f, tail));
}
exports._traverseArray = _traverseArray;
exports.traverseArray = curry_1.curry(_traverseArray);
exports.sequence = exports.traverseArray(identity_1.identity);
function toMaybe(x) {
    return exports.isRight(x) ? maybe_1.Just(x.value) : maybe_1.Nothing();
}
exports.toMaybe = toMaybe;
exports.Op = {
    of: of,
    fmap: exports.fmap,
    chain: exports.chain,
    ap: exports.ap,
    lift2a: exports.lift2a,
    traverseArray: exports.traverseArray,
    sequence: exports.sequence,
    toMaybe: toMaybe
};
//# sourceMappingURL=either.js.map