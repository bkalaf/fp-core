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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTable = exports.execute = exports.executeColumn = exports.constructId = exports.asColumnDef = void 0;
var curry_1 = require("src/fp/curry");
var text_1 = __importDefault(require("../text"));
var fst_1 = require("src/tuple/fst");
var substring_1 = require("./../text/substring");
var append_1 = require("./../text/append");
var snd_1 = require("src/tuple/snd");
function asColumnDef(browser, suffix, index) {
    if (index === void 0) { index = 0; }
    return { suffix: suffix, index: index, browser: browser };
}
exports.asColumnDef = asColumnDef;
function constructId(left, ix, right) {
    return text_1.default.join(ix.toString())(left)(right);
}
exports.constructId = constructId;
function executeColumn(param) {
    return function (rowNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var id, ID, elements, element, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = curry_1.curry3(constructId)("dgAuctionDetails_ctl")(rowNumber)(param.suffix);
                        ID = append_1.prepend('#')(id);
                        return [4 /*yield*/, param.browser.$$(ID)];
                    case 1:
                        elements = _a.sent();
                        element = elements[param.index];
                        return [4 /*yield*/, element.getText()];
                    case 2:
                        text = _a.sent();
                        return [2 /*return*/, text];
                }
            });
        });
    };
}
exports.executeColumn = executeColumn;
var columnMapping = function (b) { return ({
    customerName: asColumnDef(b, '_Label1'),
    auctionDate: asColumnDef(b, '_Label3'),
    propertyName: asColumnDef(b, '_Label4'),
    propertyAddress: asColumnDef(b, '_Label5'),
    propertyState: asColumnDef(b, '_Label6'),
    propertyZip: asColumnDef(b, '_Label7'),
    propertyPhone: asColumnDef(b, '_Label9'),
    contents: asColumnDef(b, '_Label7', 1)
}); };
function execute(b, rowNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var mapping, data;
        var _this = this;
        return __generator(this, function (_a) {
            mapping = columnMapping(b);
            data = {};
            Object.keys(mapping).forEach(function (n) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = data;
                        _b = n;
                        return [4 /*yield*/, executeColumn(mapping[n])(rowNumber)];
                    case 1: return [2 /*return*/, _a[_b] = _c.sent()];
                }
            }); }); });
            return [2 /*return*/, data];
        });
    });
}
exports.execute = execute;
function processTable(b) {
    return __awaiter(this, void 0, void 0, function () {
        function inner(current) {
            return __awaiter(this, void 0, void 0, function () {
                var data, next, nextID, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, execute(b, current)];
                        case 1:
                            data = _a.sent();
                            next = current + 1;
                            nextID = append_1.prepend('#')(curry_1.curry3(constructId)("dgAuctionDetails_ctl")(next)('_Label1'));
                            return [4 /*yield*/, b.$$(nextID)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, [substring_1.isUndefined(result[0]), data]];
                    }
                });
            });
        }
        function cont(rowNum, acc) {
            return __awaiter(this, void 0, void 0, function () {
                var output;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, inner(rowNum)];
                        case 1:
                            output = _a.sent();
                            if (fst_1.fst(output)) {
                                return [2 /*return*/, cont(rowNum + 1, __spreadArrays([snd_1.snd(output)], acc))];
                            }
                            return [2 /*return*/, __spreadArrays([snd_1.snd(output)], acc)];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            return [2 /*return*/, cont(2, [])];
        });
    });
}
exports.processTable = processTable;
//# sourceMappingURL=table2.js.map