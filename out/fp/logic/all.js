"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var both_1 = require("./both");
var always_1 = require("../always");
function all() {
    var predicates = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        predicates[_i] = arguments[_i];
    }
    return predicates.reduce(both_1._both, always_1.always(true));
}
exports.all = all;
//# sourceMappingURL=all.js.map