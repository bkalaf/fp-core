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
exports.Controls = exports.doPostBack = void 0;
var append_1 = require("./../text/append");
var table2_1 = require("./table2");
var webdriverio_1 = require("webdriverio");
function doPostBack(name) {
    var script = function (x) { return setTimeout("__doPostBack('" + name + "','')", x); };
    return script;
}
exports.doPostBack = doPostBack;
var button = {
    click: function (b, name) { return __awaiter(void 0, void 0, void 0, function () {
        var element;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, b.$(append_1.prepend('#')(name))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, element.click()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, b.execute(doPostBack(name), 0)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
};
var dropDown = {
    selectByValue: function (b, name, value) { return __awaiter(void 0, void 0, void 0, function () {
        var element;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, b.$(append_1.prepend(name))];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, element.selectByAttribute('value', value)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, b.execute(doPostBack(name), 0)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
};
var navigate = {
    goto: function (b, x) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, b.url(x)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); }
};
var table = {
    gather: table2_1.processTable
};
exports.Controls = {
    button: button,
    navigate: navigate,
    dropDown: dropDown,
    table: table
};
function doit() {
    return __awaiter(this, void 0, void 0, function () {
        var b, browser, out;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    b = function () { return webdriverio_1.remote({
                        capabilities: {
                            browserName: 'chrome'
                        }
                    }); };
                    return [4 /*yield*/, b()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, exports.Controls.navigate.goto(browser, 'https://www.publicstorageauction.com/')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, exports.Controls.dropDown.selectByValue(browser, 'ddlState', 'CA')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, exports.Controls.dropDown.selectByValue(browser, 'ddlCity', 'San Diego')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, exports.Controls.table.gather(browser)];
                case 5:
                    out = _a.sent();
                    console.log(JSON.stringify(out));
                    return [2 /*return*/];
            }
        });
    });
}
doit();
//# sourceMappingURL=controls.js.map