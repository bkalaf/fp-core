"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
var eq_1 = require("../fp/eq");
function isEmpty(x) {
    return eq_1.eq(0)(x.length);
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map