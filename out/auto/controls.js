"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.doit = exports.doCity = exports.writeData = exports.toIDSelector = void 0;
var path = __importStar(require("path"));
var auctions_1 = require("./../api/ps/auctions");
var webdriverio_1 = require("webdriverio");
var compl_1 = require("../fp/compl");
var eq_1 = require("../fp/eq");
var fs_extra_1 = require("fs-extra");
var text_1 = require("../text");
var append_1 = require("./../text/append");
function toIDSelector(str) {
    return append_1.prepend('#')(str);
}
exports.toIDSelector = toIDSelector;
function writeData(data, fn) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, fs_extra_1.promises.appendFile(fn, JSON.stringify(data))];
        });
    });
}
exports.writeData = writeData;
var onchange = function (x) { return setTimeout('__doPostBack(\'ddlState\',\'\')', x); };
var onchange2 = function (x) { return setTimeout('__doPostBack(\'ddlCity\',\'\')', x); };
function doCity(browser, cityName) {
    return __awaiter(this, void 0, void 0, function () {
        function nextRow(b, current, acc) {
            return __awaiter(this, void 0, void 0, function () {
                var nextID, element, e_2, mapping, result, data;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nextID = ["#", auctions_1.TABLE_START, text_1.padZero(2)(current.toString()), '_Label1'].join("");
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            console.log("in try");
                            return [4 /*yield*/, b.$(nextID)];
                        case 2:
                            element = _a.sent();
                            return [4 /*yield*/, element.waitForExist({ timeout: 5000 })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_2 = _a.sent();
                            console.error("row " + current + " not found");
                            return [2 /*return*/, acc];
                        case 5:
                            mapping = auctions_1.columnMapping(b);
                            return [4 /*yield*/, Promise.all(Object.keys(mapping).map(function (n) { return __awaiter(_this, void 0, void 0, function () {
                                    var value, colID, element, ele, result;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                value = mapping[n];
                                                colID = ["#", auctions_1.TABLE_START, text_1.padZero(2)(current.toString()), value.suffix].join("");
                                                return [4 /*yield*/, browser.$$(colID)];
                                            case 1:
                                                element = _b.sent();
                                                ele = element[value.index];
                                                return [4 /*yield*/, ele.getText()];
                                            case 2:
                                                result = _b.sent();
                                                return [2 /*return*/, (_a = {}, _a[n] = value.converter(result), _a)];
                                        }
                                    });
                                }); }))];
                        case 6:
                            result = _a.sent();
                            data = result.reduce(Object.assign, {});
                            console.log("result: " + data);
                            return [2 /*return*/, nextRow(b, current + 1, __spreadArrays([data], acc))];
                    }
                });
            });
        }
        var ele2, ele3, outputFn, noRecords, table, winner, winText, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.$(toIDSelector(auctions_1.CITY_DDL))];
                case 1:
                    ele2 = _a.sent();
                    return [4 /*yield*/, ele2.waitForExist()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ele2.selectByAttribute('value', cityName)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, browser.execute(onchange2, 0)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, browser.pause(4000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, browser.$(toIDSelector(auctions_1.SUBMIT_BUTTON))];
                case 6:
                    ele3 = _a.sent();
                    ele3.waitForClickable();
                    ele3.click();
                    outputFn = path.resolve(__dirname, cityName.toLowerCase().replace(' ', '_') + "-output.json");
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 13, , 14]);
                    noRecords = browser.$('.searchmessage');
                    table = browser.$(["#", auctions_1.TABLE_START, "02", "_Label1"].join(""));
                    return [4 /*yield*/, Promise.race([noRecords, table])];
                case 8:
                    winner = _a.sent();
                    return [4 /*yield*/, winner.getText()];
                case 9:
                    winText = _a.sent();
                    if (!compl_1.compl(eq_1.eq("No record(s) found."))(winText)) return [3 /*break*/, 12];
                    console.log(cityName + ":: " + winText);
                    return [4 /*yield*/, nextRow(browser, 2, [])];
                case 10:
                    result = _a.sent();
                    return [4 /*yield*/, writeData(result, outputFn)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    e_1 = _a.sent();
                    console.log(cityName + " failed. " + e_1.message);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.doCity = doCity;
function doit(cities) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, ele, index, city;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, webdriverio_1.remote({
                        maxInstances: 5,
                        capabilities: {
                            browserName: 'chrome'
                        }
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.url(auctions_1.AUCTION_URL)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, browser.$(toIDSelector(auctions_1.STATE_DDL))];
                case 3:
                    ele = _a.sent();
                    return [4 /*yield*/, ele.waitForExist()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, ele.selectByAttribute('value', auctions_1.STATE_VALUE)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, browser.execute(onchange, 0)];
                case 6:
                    _a.sent();
                    index = 0;
                    _a.label = 7;
                case 7:
                    if (!(index < cities.length)) return [3 /*break*/, 10];
                    city = cities[index];
                    console.log("awaiting: " + city);
                    return [4 /*yield*/, doCity(browser, city)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    index++;
                    return [3 /*break*/, 7];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.doit = doit;
//# sourceMappingURL=controls.js.map