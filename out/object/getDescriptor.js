"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescriptor = void 0;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
exports.getDescriptor = function (obj, name) {
    console.log("getting: " + obj + " name: " + name);
    return getOwnPropertyDescriptor(obj, name);
};
//# sourceMappingURL=getDescriptor.js.map