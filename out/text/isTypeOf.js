"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypeOf = isTypeOf;
exports.isNotNullOrUndefined = exports.isNullOrUndefined = exports.isNotUndefined = exports.isBoolean = exports.isBigInt = exports.isObject = exports.isFunction = exports.isSymbol = exports.isNumber = exports.isString = exports.isNull = exports.isUndefined = void 0;

var _compl = require("../fp/compl");

var _either = require("../fp/logic/either");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isTypeOf(label) {
  return function (o) {
    return _typeof(o) === label;
  };
}

var isUndefined = isTypeOf('undefined');
exports.isUndefined = isUndefined;

var isNull = function isNull(x) {
  return x == null && isNotUndefined(x);
};

exports.isNull = isNull;
var isString = isTypeOf('string');
exports.isString = isString;
var isNumber = isTypeOf('number');
exports.isNumber = isNumber;
var isSymbol = isTypeOf('symbol');
exports.isSymbol = isSymbol;
var isFunction = isTypeOf('function');
exports.isFunction = isFunction;
var isObject = isTypeOf('object');
exports.isObject = isObject;
var isBigInt = isTypeOf('bigint');
exports.isBigInt = isBigInt;
var isBoolean = isTypeOf("boolean");
exports.isBoolean = isBoolean;
var isNotUndefined = (0, _compl.compl)(isUndefined);
exports.isNotUndefined = isNotUndefined;
var isNullOrUndefined = (0, _either.either)(isNull)(isUndefined);
exports.isNullOrUndefined = isNullOrUndefined;
var isNotNullOrUndefined = (0, _compl.compl)(isNullOrUndefined);
exports.isNotNullOrUndefined = isNotNullOrUndefined;