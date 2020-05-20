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
exports.doit = void 0;
var path = __importStar(require("path"));
var auctions_1 = require("./../api/ps/auctions");
var webdriverio_1 = require("webdriverio");
var cityList_1 = require("../api/ps/cityList");
var compose_1 = require("../fp/compose");
var not_1 = require("../fp/logic/not");
var objMerge_1 = require("./objMerge");
var text_1 = require("../text");
var toClassSelector_1 = require("./toClassSelector");
var toIDSelector_1 = require("./toIDSelector");
var writeData_1 = require("./writeData");
var sync = require('@wdio/sync').default;
var onChange = function (name) { return function (x) { return setTimeout('__doPostBack(\'${name}\',\'\')', x); }; };
function generateNextRowTester(current) {
    return generateNextColumnID(current, '_Label1');
}
function generateNextColumnID(current, suffix) {
    return toIDSelector_1.toIDSelector([auctions_1.TABLE_START, text_1.padZero(2)(current.toString()), suffix].join(''));
}
function invertObj(obj) {
    return Object.keys(obj).map(function (k) {
        var _a;
        return (_a = {}, _a[obj[k]] = k, _a);
    }).reduce(objMerge_1.objMerge, {});
}
function getCountyAbbreviationFromLongName(county) {
    var result = invertObj(cityList_1.counties)[county];
    console.log("getCountyAbbreviationFromLongName: county: " + county + " result: " + result + " inverted: " + JSON.stringify(invertObj(cityList_1.counties)));
    return invertObj(cityList_1.counties)[county];
    // return Object.entries(counties).filter(([k, v]: [string, string]) => eq(county)(v)).map(([k,v]:[string, string]) => k)[0];
}
function getCountyAbbreviationFromCityLongName(city) {
    var fullText = cityList_1.cities[city];
    console.log("fullText: " + fullText);
    return getCountyAbbreviationFromLongName(fullText);
}
function calculateOutputFileName(cityName) {
    var countyAbbrev = getCountyAbbreviationFromCityLongName(cityName);
    var normalizedName = normalizeCityName(cityName);
    var fn = [normalizedName, '.json'].join('');
    console.log("cityName: " + cityName + " countryAbbrev: " + countyAbbrev + ", normalized: " + normalizedName + ", fn: " + fn);
    return path.resolve(process.cwd(), 'data', countyAbbrev, fn);
}
function normalizeCityName(name) {
    return name.toLowerCase().replace(' ', '_');
}
function constructPropertyObj(n, converter, result) {
    var _a;
    return (_a = {}, _a[n] = converter(result), _a);
}
function doit(cities) {
    return __awaiter(this, void 0, void 0, function () {
        function inner2(browser) {
            return __awaiter(this, void 0, void 0, function () {
                var exe, result, fullData, outputfn, fullpath;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            browser.url(auctions_1.AUCTION_URL);
                            browser.$(toIDSelector_1.toIDSelector(auctions_1.STATE_DDL)).selectByAttribute('value', auctions_1.STATE_VALUE);
                            exe = browser.execute(onChange(auctions_1.STATE_DDL), 0);
                            console.log("state selected");
                            result = cities.map(function (city) { return __awaiter(_this, void 0, void 0, function () {
                                var exe, hasNoRecords, data, current_1, cols, row, cityData, wf;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            console.log("processing: " + city);
                                            browser.$(toIDSelector_1.toIDSelector(auctions_1.CITY_DDL)).selectByAttribute('value', city);
                                            exe = browser.execute(onChange(auctions_1.CITY_DDL), 0);
                                            browser.$(toIDSelector_1.toIDSelector(auctions_1.SUBMIT_BUTTON)).click();
                                            while (not_1.not(browser.$(toClassSelector_1.toClassSelector(auctions_1.UNSUCCESSFUL_INDICATOR)).isExisting() || browser.$(toIDSelector_1.toIDSelector(auctions_1.SUCCESSFUL_INDICATOR)).isExisting())) {
                                                browser.pause(1000);
                                                console.log('pausing... 1 sec');
                                            }
                                            hasNoRecords = browser.$(toClassSelector_1.toClassSelector(auctions_1.UNSUCCESSFUL_INDICATOR)).isExisting();
                                            data = [];
                                            if (hasNoRecords) {
                                                console.log('no records found');
                                            }
                                            else {
                                                console.log('records found');
                                                current_1 = 2;
                                                while (browser.$(generateNextRowTester(current_1)).isExisting()) {
                                                    console.log("row " + current_1 + ": exists");
                                                    cols = Object.entries(auctions_1.columnMapping(b)).map(function (_a) {
                                                        var _b;
                                                        var k = _a[0], v = _a[1];
                                                        var suffix = v.suffix, index = v.index, converter = v.converter;
                                                        var value = converter(browser.$$(generateNextColumnID(current_1, suffix))[index].getText());
                                                        return _b = {}, _b[k] = value, _b;
                                                    });
                                                    row = cols.reduce(objMerge_1.objMerge);
                                                    data = __spreadArrays([auctions_1.xformDetails(row, city)], data);
                                                    current_1 = current_1 + 1;
                                                }
                                                console.log("row " + current_1 + " does not exist");
                                                console.log(city + " processed: " + (current_1 - 2) + " rows");
                                                console.log("data rows: " + data.length);
                                            }
                                            cityData = (_a = {}, _a[normalizeCityName(city)] = data, _a);
                                            wf = compose_1.composeL(writeData_1.writeDataToFile(cityData), calculateOutputFileName);
                                            return [4 /*yield*/, wf(city)];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/, cityData];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(result)];
                        case 1:
                            fullData = _a.sent();
                            outputfn = Date.now().toString() + ".json";
                            fullpath = path.resolve(process.cwd(), 'data', outputfn);
                            return [4 /*yield*/, writeData_1.writeDataToFile(fullData.reduce(objMerge_1.objMerge, {}))(fullpath)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function inner(browser) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, sync(function () { return inner2(browser); })];
                });
            });
        }
        var b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    b = webdriverio_1.remote({
                        maxInstances: 5,
                        capabilities: {
                            browserName: 'chrome'
                        }
                    });
                    console.log("browser: " + b);
                    if (!(b instanceof Promise)) return [3 /*break*/, 2];
                    return [4 /*yield*/, b];
                case 1:
                    b = _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, inner(b)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, b.deleteSession()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.doit = doit;
//# sourceMappingURL=controls.js.map