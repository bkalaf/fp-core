"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinct = void 0;
var cons_1 = require("../../datastruct/cons");
var isEmpty_1 = require("../../text/isEmpty");
function distinct(arr) {
    function inner(acc, rem) {
        if (isEmpty_1.isEmpty(rem)) {
            return acc;
        }
        var h = rem[0], t = rem.slice(1);
        return inner((acc.includes(h) ? acc : cons_1.cons(h)(acc)), t);
    }
    return inner([], arr);
}
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map