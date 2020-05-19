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
exports.processPage = exports.processTable = exports.processColumn = exports.OUTPUT_PATH = void 0;
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var maybe_1 = require("./../datastruct/maybe");
var compl_1 = require("../fp/compl");
var flip_1 = require("./../fp/flip");
var isEmpty_1 = require("./../text/isEmpty");
var substring_1 = require("./../text/substring");
var padZero_1 = require("../text/padZero");
var append_1 = require("./../text/append");
exports.OUTPUT_PATH = {
    AUCTIONDATA_OUTPUT: function (cityName) {
        return path.resolve(__dirname, 'data', cityName + ".json");
    }
};
function toColumnDef(id, name, index) {
    return { id: id, name: name, index: !substring_1.isUndefined(index) ? maybe_1.Just(index) : maybe_1.Nothing() };
}
var column1 = toColumnDef('_Label1', 'customerName');
var column2 = toColumnDef('_Label3', 'auctionDate');
var column3 = toColumnDef('_Label4', 'propertyName');
var column4 = toColumnDef('_Label5', 'propertyAddress');
var column5 = toColumnDef('_Label6', 'propertyState');
var column6 = toColumnDef('_Label7', 'propertyZip', 0);
var column7 = toColumnDef('_Label9', 'propertyPhone');
var column8 = toColumnDef('_Label7', 'contents', 1);
function rowID(rowNumber, ending) {
    var rowBase = "dgAuctionDetails_ctl";
    return append_1.prepend("#")([rowBase, padZero_1.padZero(2)(rowNumber.toString()), ending].join(''));
}
function setKey(obj) {
    return function (key) {
        return function (value) {
            obj[key] = value;
            return obj;
        };
    };
}
var setKeySafe = setKey({});
function processColumn(rowNumber, def) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, function (b) {
                    return __awaiter(this, void 0, void 0, function () {
                        var id, name, index, fullName, ele, ele2, text, obj;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    id = def.id, name = def.name, index = def.index;
                                    fullName = rowID(rowNumber, id);
                                    return [4 /*yield*/, (maybe_1.isJust(index) ? b.$$(fullName) : b.$(fullName))];
                                case 1:
                                    ele = _a.sent();
                                    ele2 = maybe_1.isJust(index) ? ele[index.value] : ele;
                                    return [4 /*yield*/, ele2.getText()];
                                case 2:
                                    text = _a.sent();
                                    obj = {};
                                    obj[name] = text;
                                    return [2 /*return*/, obj];
                            }
                        });
                    });
                }];
        });
    });
}
exports.processColumn = processColumn;
function funcAp(f) {
    return function (x) {
        return f(x);
    };
}
var pipe = function (x) { return flip_1.flip(funcAp)(x); };
function processRow(browser, num) {
    return __awaiter(this, void 0, void 0, function () {
        function mutateResult(key, value, accum) {
            accum[key] = value;
            return accum;
        }
        function guard(cc) {
            return __awaiter(this, void 0, void 0, function () {
                var ele;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, browser.$$(rowID(cc, '_Label3'))];
                        case 1:
                            ele = _a.sent();
                            return [2 /*return*/, compl_1.compl(isEmpty_1.isEmpty)(ele)];
                    }
                });
            });
        }
        var columns, accum_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    columns = [column1, column2, column3, column4, column5, column6, column7, column8];
                    return [4 /*yield*/, guard(num)];
                case 1:
                    if (!_b.sent()) return [3 /*break*/, 3];
                    accum_1 = {};
                    columns.map(function (def) {
                        return __awaiter(this, void 0, void 0, function () {
                            var id, name, index, element, _a, value;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        id = def.id, name = def.name, index = def.index;
                                        if (!maybe_1.isJust(index)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, browser.$$(rowID(num, id))];
                                    case 1:
                                        _a = (_b.sent())[index.value];
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, browser.$(rowID(num, id))];
                                    case 3:
                                        _a = (_b.sent());
                                        _b.label = 4;
                                    case 4:
                                        element = _a;
                                        return [4 /*yield*/, element.getText()];
                                    case 5:
                                        value = _b.sent();
                                        mutateResult(name, value, accum_1);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    _a = [[accum_1]];
                    return [4 /*yield*/, processRow(browser, num + 1)];
                case 2: return [2 /*return*/, __spreadArrays.apply(void 0, _a.concat([(_b.sent())]))];
                case 3: return [2 /*return*/, []];
            }
        });
    });
}
function processTable(browser) {
    return __awaiter(this, void 0, void 0, function () {
        var current;
        return __generator(this, function (_a) {
            current = 2;
            return [2 /*return*/, processRow(browser, current)];
        });
    });
}
exports.processTable = processTable;
'';
function processPage(browser, city) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, processTable(browser)];
                case 1:
                    result = _a.sent();
                    console.log("processed: " + result.length);
                    return [4 /*yield*/, fs.writeFile(exports.OUTPUT_PATH.AUCTIONDATA_OUTPUT(city), JSON.stringify(result))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.processPage = processPage;
//# sourceMappingURL=table.js.map