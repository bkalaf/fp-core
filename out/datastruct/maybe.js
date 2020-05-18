"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Op = exports.sequence = exports.traverseArray = exports.lift2a = exports.fmap = exports.ap = exports.chain = exports.of = exports.Nothing = exports.Just = exports.isJust = exports.isNothing = exports.isCase = void 0;
var cons_1 = require("./cons");
var eq_1 = require("../fp/eq");
var identity_1 = require("../fp/identity");
var isEmpty_1 = require("../text/isEmpty");
function isCase(str) {
    return function (x) {
        return eq_1.eq(str)(x.kind);
    };
}
exports.isCase = isCase;
exports.isNothing = isCase('@maybe#nothing');
exports.isJust = isCase('@maybe#just');
exports.Just = function (x) { return ({ kind: '@maybe#just', value: x }); };
exports.Nothing = function (x) { return ({ kind: '@maybe#nothing' }); };
exports.of = exports.Just;
function chain(f) {
    return function (x) {
        return exports.isJust(x) ? f(x.value) : exports.Nothing();
    };
}
exports.chain = chain;
function ap(f) {
    return function (x) {
        return chain(function (fprime) { return chain(function (xprime) { return exports.Just(fprime(xprime)); })(x); })(f);
    };
}
exports.ap = ap;
exports.fmap = function (f) {
    return ap(exports.of(f));
};
function lift2a(f) {
    return function (x) {
        return ap(ap(exports.of(f))(x));
    };
}
exports.lift2a = lift2a;
function traverseArray(f) {
    return function (lst) {
        var c = lift2a(cons_1.cons);
        if (isEmpty_1.isEmpty(lst)) {
            return exports.of([]);
        }
        var h = lst[0], t = lst.slice(1);
        return c(exports.fmap(f)(h))(traverseArray(f)(t));
    };
}
exports.traverseArray = traverseArray;
exports.sequence = traverseArray(identity_1.identity);
exports.Op = {
    fmap: exports.fmap,
    of: exports.of,
    ap: ap,
    chain: chain,
    traverseArray: traverseArray,
    sequence: exports.sequence,
    lift2a: lift2a
};
//# sourceMappingURL=maybe.js.map