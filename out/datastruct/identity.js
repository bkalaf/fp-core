"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequence = exports.traverseArray = exports.lift2a = exports.fmap = exports._fmap = exports._ap = exports.of = exports._chain = exports.toIdentity = void 0;
var curry_1 = require("../fp/curry");
var isEmpty_1 = require("../text/isEmpty");
var cons_1 = require("./cons");
var identity_1 = require("./../fp/identity");
var identity = '@identity';
function toIdentity(x) {
    return ({
        kind: identity,
        value: x
    });
}
exports.toIdentity = toIdentity;
function _chain(f, x) {
    return f(x.value);
}
exports._chain = _chain;
function of(x) {
    return toIdentity(x);
}
exports.of = of;
function _ap(fx, x) {
    return _chain(function (fprime) {
        return _chain(function (xprime) { return of(fprime(xprime)); }, x);
    }, fx);
}
exports._ap = _ap;
function _fmap(f) {
    return curry_1.curry(_ap)(of(f));
}
exports._fmap = _fmap;
exports.fmap = _fmap;
function lift2a(f, x) {
    return curry_1.curry(_ap)(curry_1.curry(_ap)(of(f))(x));
}
exports.lift2a = lift2a;
function traverseArray(f, lst) {
    if (isEmpty_1.isEmpty(lst))
        return of([]);
    var h = lst[0], t = lst.slice(1);
    return curry_1.curry(lift2a)(cons_1.cons)(exports.fmap(f)(h))(traverseArray(f, t));
}
exports.traverseArray = traverseArray;
exports.sequence = curry_1.curry(traverseArray)(identity_1.identity);
//# sourceMappingURL=identity.js.map