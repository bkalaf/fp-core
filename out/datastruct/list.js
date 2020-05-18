"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Op = exports.sequence = exports.traverseArray = exports._traverseArray = exports.lift2a = exports._lift2a = exports.ap = exports.fmap = exports._fmap = exports._ap = exports.chain = exports._chain = exports.ofArray = exports.toArray = exports.join = exports.foldl = exports._foldl = exports.concatList = exports.of = exports.isEmpty = exports.isCons = exports.toCons = exports.toEmpty = void 0;
var substring_1 = require("./../text/substring");
var curry_1 = require("src/fp/curry");
var isEmpty_1 = require("./../text/isEmpty");
var cons_1 = require("./cons");
var identity_1 = require("src/fp/identity");
function toEmpty() {
    return ({ kind: '@list#empty' });
}
exports.toEmpty = toEmpty;
function toCons(head, tail) {
    var t = substring_1.isUndefined(tail) ? toEmpty() : tail;
    return ({ kind: '@list#cons', head: head, tail: t });
}
exports.toCons = toCons;
exports.isCons = function (x) { return x.kind === '@list#cons'; };
exports.isEmpty = function (x) { return x.kind === '@list#empty'; };
function of(x) {
    return toCons(x);
}
exports.of = of;
function concatList(l1, l2) {
    if (exports.isEmpty(l1))
        return l2;
    var head = l1.head, tail = l1.tail;
    return toCons(head, concatList(tail, l2));
}
exports.concatList = concatList;
function _foldl(folder, init, lst) {
    if (exports.isEmpty(lst)) {
        return init;
    }
    var head = lst.head, tail = lst.tail;
    return _foldl(folder, folder(init)(head), tail);
}
exports._foldl = _foldl;
exports.foldl = curry_1.curry3(_foldl);
function join(x) {
    if (exports.isEmpty(x))
        return toEmpty();
    return concatList(x.head, join(x.tail));
}
exports.join = join;
function toArray(lst) {
    return exports.isEmpty(lst) ? [] : __spreadArrays([lst.head], toArray(lst.tail));
}
exports.toArray = toArray;
function ofArray(lst) {
    if (lst.length === 0)
        return toEmpty();
    var h = lst[0], t = lst.slice(1);
    return toCons(lst[0], ofArray(t));
}
exports.ofArray = ofArray;
function _chain(f, x) {
    if (exports.isEmpty(x)) {
        return toEmpty();
    }
    return toArray(x).map(f).reduce(function (pv, cv) { return concatList(pv, cv); });
}
exports._chain = _chain;
exports.chain = curry_1.curry(_chain);
function _ap(f, x) {
    return _chain(function (fprime) {
        return _chain(function (xprime) { return of(fprime(xprime)); }, x);
    }, f);
}
exports._ap = _ap;
function _fmap(f, x) {
    return _ap(of(f), x);
}
exports._fmap = _fmap;
exports.fmap = curry_1.curry(_fmap);
exports.ap = curry_1.curry(_ap);
function _lift2a(f, x) {
    return curry_1.curry(_ap)(_ap(of(f), x));
}
exports._lift2a = _lift2a;
exports.lift2a = curry_1.curry(_lift2a);
function _traverseArray(f, lst) {
    if (isEmpty_1.isEmpty(lst)) {
        return of([]);
    }
    var h = lst[0], t = lst.slice(1);
    var first = _fmap(f, h);
    return exports.lift2a(cons_1.cons)(first)(exports.traverseArray(f)(t));
}
exports._traverseArray = _traverseArray;
exports.traverseArray = curry_1.curry(_traverseArray);
exports.sequence = exports.traverseArray(identity_1.identity);
exports.Op = {
    of: of,
    fmap: exports.fmap,
    chain: exports.chain,
    ap: exports.ap,
    lift2a: exports.lift2a,
    traverseArray: exports.traverseArray,
    sequence: exports.sequence,
    join: join,
    foldl: exports.foldl,
    toArray: toArray,
    ofArray: ofArray
};
//# sourceMappingURL=list.js.map