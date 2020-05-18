"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.any = void 0;
var either_1 = require("./either");
var always_1 = require("../always");
function any() {
    var predicates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        predicates[_i] = arguments[_i];
    }
    return predicates.reduce(either_1._either, always_1.always(false));
}
exports.any = any;
//# sourceMappingURL=any.js.map