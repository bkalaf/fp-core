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
exports.page = exports.postBack = exports.setDropDownValue = exports.click = void 0;
var webdriverio_1 = require("webdriverio");
var table_1 = require("./table");
var getElement_1 = require("./getElement");
function click(b) {
    return function (ele) {
        return ele.click();
    };
}
exports.click = click;
function setDropDownValue(b) {
    return function (ele) {
        return function (value) {
            return ele.selectByAttribute('value', value);
        };
    };
}
exports.setDropDownValue = setDropDownValue;
function postBack(b) {
    return function (name) {
        var script = function (x) {
            setTimeout("__doPostBack('" + name + "','')", x);
        };
        return b.execute(script, 0);
    };
}
exports.postBack = postBack;
function page(b) {
    return __awaiter(this, void 0, void 0, function () {
        function dd(name, value) {
            return __awaiter(this, void 0, void 0, function () {
                var ele;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getElement_1.getElementByID(b)(name)];
                        case 1:
                            ele = _a.sent();
                            return [4 /*yield*/, setDropDownValue(b)(ele)(value)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, postBack(b)(name)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function btn(name) {
            return __awaiter(this, void 0, void 0, function () {
                var ele;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getElement_1.getElementByID(b)(name)];
                        case 1:
                            ele = _a.sent();
                            return [4 /*yield*/, click(b)(ele)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, postBack(b)(name)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, b.navigateTo('https://www.publicstorageauctions.com/')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dd('ddlState', 'CA')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dd('ddlCity', 'San Diego')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, btn('btnSubmit')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, table_1.processTable(b)];
                case 5:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.page = page;
var b = function () { return webdriverio_1.remote({
    capabilities: {
        browserName: 'chrome'
    }
}); };
b().then(page);
//# sourceMappingURL=actions.js.map