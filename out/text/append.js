"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropTil = exports.remove = exports.append = exports.concat = exports.prepend = exports.join = void 0;
var flip_1 = require("../fp/flip");
var replace_1 = require("./replace");
var substring_1 = require("./substring");
function join(joiner) {
    return function (left) {
        return function (right) {
            return [left, joiner, right].join('');
        };
    };
}
exports.join = join;
exports.prepend = join("");
exports.concat = join("");
exports.append = flip_1.flip(exports.prepend);
exports.remove = flip_1.flip(replace_1.replace)("");
function dropTil(start) {
    return flip_1.flip(substring_1.substring);
}
exports.dropTil = dropTil;
//# sourceMappingURL=append.js.map