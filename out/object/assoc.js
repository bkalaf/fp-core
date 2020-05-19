"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assoc = void 0;
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
//# sourceMappingURL=assoc.js.map