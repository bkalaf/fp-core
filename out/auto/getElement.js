"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementByClass = exports.getElementByID = exports.getElement = void 0;
var append_1 = require("./../text/append");
function getElement(prefix) {
    return function (b) {
        return function (name) {
            return b.$(prefix(name));
        };
    };
}
exports.getElement = getElement;
exports.getElementByID = getElement(append_1.prepend("#"));
exports.getElementByClass = getElement(append_1.prepend("."));
//# sourceMappingURL=getElement.js.map