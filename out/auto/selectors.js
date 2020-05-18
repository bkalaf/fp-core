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
Object.defineProperty(exports, "__esModule", { value: true });
exports.steps = exports.navTo = exports.useButton = exports.useDropDown = exports.wrapInPostBack = exports.setDropDown = exports.doPostBack = exports.selectDropDownValue = exports.unpair = exports.join = exports.getTextFromMulti = exports.getTextFromID = exports.toMultiSelector = exports.toSelector = void 0;
var promise_1 = require("./../datastruct/promise");
var compose_1 = require("./../fp/compose");
var curry_1 = require("./../fp/curry");
var flip_1 = require("./../fp/flip");
var pair_1 = require("src/tuple/pair");
var append_1 = require("./../text/append");
var P = promise_1.PromiseOp;
var forClass = append_1.prepend('.');
var forId = append_1.prepend('#');
exports.toSelector = function (b) { return function (selector) { return b.$(selector); }; };
// BrowserObject -> string -> Promise<Element>
exports.toMultiSelector = function (b) { return function (selector) { return b.$$(selector); }; };
// string -> BrowserObject -> Promise<Element>
var classSelector = compose_1.composeL(flip_1.flip(exports.toSelector), forClass);
// string -> BrowserObject -> Promise<Element>
var idSelector = compose_1.composeL(flip_1.flip(exports.toSelector), forId);
// Element -> Promise<void>
var click = function (element) { return element.click(); };
function atIndex(n) {
    return function (arr) {
        return arr[n];
    };
}
var getText = function (element) { return element.getText(); };
exports.getTextFromID = function (b) { return compose_1.composeL(P.chain(getText), exports.toSelector(b)); };
var getIndex = function (ix) { return P.fmap(atIndex(ix)); };
exports.getTextFromMulti = function (ix) { return function (b) {
    return compose_1.composeL(P.chain(getText), compose_1.composeL(P.fmap(atIndex(ix)), exports.toMultiSelector(b)));
}; };
function join(x) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, x];
        });
    });
}
exports.join = join;
var b = {};
// string -> Promise<Element>
var clickButton = function (b) { return function (n) {
    return P.chain(click)(idSelector(n)(b));
}; };
function unpair(f) {
    return function (tuple) {
        return f(tuple[0])(tuple[1]);
    };
}
exports.unpair = unpair;
var pickDropDown = function (element) { return function (value) { return element.selectByAttribute('value', value); }; };
function selectDropDownValue(name) {
    return function (browser) {
        var res = flip_1.flip(pickDropDown);
        var res2 = function (value) { return compose_1.composeL(P.chain(res(value)), idSelector(name)); };
        var postBack = browser.execute(doPostBack(name), 0);
        var chainPromise = function (p, p2) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, p];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, p2];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, browser.pause(1000)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        var f = flip_1.flip(compose_1.composeL(curry_1.curry(chainPromise), flip_1.flip(res2)(browser)));
        return f(postBack);
    };
}
exports.selectDropDownValue = selectDropDownValue;
function doPostBack(name) {
    // onchange="javascript:setTimeout('__doPostBack(\'ddlState\',\'\')', 0)"
    // (x) => setTimeout(`__doPostBack(\'${name}\',\'\')`, x), 0);
    var script = function (x) { return setTimeout("__doPostBack('" + name + "','')", x); };
    return script;
}
exports.doPostBack = doPostBack;
function setDropDown(b) {
    var liftedPair = P.lift2a(pair_1.pair);
    var unpaired = P.chain(unpair(exports.toSelector));
    var comb = function (browser) {
        return compose_1.composeL(compose_1.composeL(unpaired, liftedPair(P.of(browser))), function (s) { return P.of(s); });
    };
    var setDD = function (browser) { return function (name) { return function (value) {
        return P.chain(flip_1.flip(pickDropDown)(value))(comb(browser)(name));
    }; }; };
    return setDD(b);
}
exports.setDropDown = setDropDown;
function wrapInPostBack(f, browser, name, value) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = f(browser)(name);
                    if (!(typeof result === 'function')) return [3 /*break*/, 2];
                    return [4 /*yield*/, result(value)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, f(browser)(name)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.wrapInPostBack = wrapInPostBack;
exports.useDropDown = function (b, name, value) {
    return wrapInPostBack(setDropDown, b, name, value);
};
exports.useButton = function (b, name) { return wrapInPostBack(clickButton, b, name); };
exports.navTo = function (b, url) { return b.url(url); };
var navHome = ['https://publicstorageauctions/', '', exports.navTo];
var ddlState = ['ddlState', 'CA', exports.useDropDown];
var ddlCity = ['ddlCity', 'San Diego', exports.useDropDown];
var btnSubmit = ['btnSubmit', '', exports.useButton];
exports.steps = [navHome, ddlState, ddlCity, btnSubmit];
//# sourceMappingURL=selectors.js.map