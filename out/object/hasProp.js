"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProp = exports._hasProp = void 0;
var curry_1 = require("../fp/curry");
var hasOwnProperty = Object.hasOwnProperty;
function _hasProp(name, obj) {
    return hasOwnProperty.call(obj, name);
}
exports._hasProp = _hasProp;
exports.hasProp = curry_1.curry(_hasProp);
//# sourceMappingURL=hasProp.js.map