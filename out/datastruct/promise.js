"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseOp = exports.join = exports.sequence = exports.traverse = exports.lift2a = exports.fmap = exports.ap = exports.of = exports.chain = void 0;
var isEmpty_1 = require("./../text/isEmpty");
var identity_1 = require("../fp/identity");
function chain(f) {
    return function (x) {
        return x.then(f);
    };
}
exports.chain = chain;
function of(x) {
    return Promise.resolve(x);
}
exports.of = of;
function ap(f) {
    return function (x) {
        return chain(function (fprime) {
            return chain(function (xprime) { return of(fprime(xprime)); })(x);
        })(f);
    };
}
exports.ap = ap;
function fmap(f) {
    return function (x) {
        return ap(of(f))(x);
    };
}
exports.fmap = fmap;
function lift2a(f) {
    return function (x) {
        return ap(ap(of(f))(x));
    };
}
exports.lift2a = lift2a;
function traverse(f) {
    return function (lst) {
        var cons = function (h) { return function (t) { return __spreadArrays([h], t); }; };
        var lifted = lift2a(cons);
        if (isEmpty_1.isEmpty(lst)) {
            return of([]);
        }
        var head = lst[0], tail = lst.slice(1);
        return lifted(fmap(f)(head))(traverse(f)(tail));
    };
}
exports.traverse = traverse;
exports.sequence = traverse(identity_1.identity);
function join(promise) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, promise];
        });
    });
}
exports.join = join;
exports.PromiseOp = {
    fmap: fmap,
    join: join,
    chain: chain,
    lift2a: lift2a,
    ap: ap,
    of: of,
    sequence: exports.sequence,
    traverse: traverse
};
//# sourceMappingURL=promise.js.map