"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
Object.defineProperty(exports, "__esModule", { value: true });
var append_1 = require("./append");
var replace_1 = require("./replace");
__exportStar(require("./contains"), exports);
__exportStar(require("./isEmpty"), exports);
__exportStar(require("./padZero"), exports);
__exportStar(require("./replace"), exports);
__exportStar(require("./splitAt"), exports);
__exportStar(require("./substring"), exports);
var Text = {
    append: append_1.append,
    prepend: append_1.prepend,
    concat: append_1.concat,
    join: append_1.join,
    remove: append_1.remove,
    replace: replace_1.replace
};
exports.default = Text;
//# sourceMappingURL=index.js.map