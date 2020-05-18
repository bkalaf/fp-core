"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPath = exports.splitPathSolidus = exports.splitPathDoubleColon = exports.assoc = void 0;
var get_1 = require("../object/get");
var isEmpty_1 = require("../text/isEmpty");
var append_1 = require("../text/append");
function _assoc(name, value, obj) {
    var _a;
    return Object.assign({}, obj, (_a = {}, _a[name] = value, _a));
}
function assoc(name) {
    return function (value) {
        return function (obj) {
            return _assoc(name, value, obj);
        };
    };
}
exports.assoc = assoc;
function splitPathDoubleColon(name) {
    return append_1.splitAt('::')(name);
}
exports.splitPathDoubleColon = splitPathDoubleColon;
function splitPathSolidus(name) {
    return append_1.splitAt('/')(name);
}
exports.splitPathSolidus = splitPathSolidus;
var handleInput = function (input) { return Array.isArray(input) ? input : splitPathSolidus(input); };
function getPath(name) {
    return function (obj) {
        var splitted = handleInput(name);
        if (isEmpty_1.isEmpty(splitted)) {
            var result = obj;
            return result;
        }
        var h = splitted[0], t = splitted.slice(1);
        return getPath(t)(get_1.get(h)(obj));
    };
}
exports.getPath = getPath;
//# sourceMappingURL=assoc.js.map