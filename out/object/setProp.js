"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProp = exports._setProp = void 0;
var curry_1 = require("../fp/curry");
function _setProp(value, name, obj) {
    obj[name] = value;
    return obj;
}
exports._setProp = _setProp;
exports.setProp = curry_1.curry3(_setProp);
//# sourceMappingURL=setProp.js.map