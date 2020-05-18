"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combinePropList = combinePropList;
exports.defineProp = defineProp;
exports.propAttributes = propAttributes;
exports._merge = _merge;
exports.isPrimitiveType = void 0;

var _isTypeOf = require("./../text/isTypeOf");

var _any = require("../fp/logic/any");

var _arrayConcat = require("./arrayConcat");

var _distinct = require("./distinct");

var _getDescriptor = require("../object/getDescriptor");

var _getProperties = require("./getProperties");

var _isArray = require("./isArray");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isPrimitiveType = (0, _any.any)(_isTypeOf.isSymbol, _isTypeOf.isString, _isTypeOf.isNumber, _isTypeOf.isBoolean);
exports.isPrimitiveType = isPrimitiveType;

function combinePropList(t1, t2) {
  return (0, _arrayConcat.arrayConcat)((0, _getProperties.getProperties)(t1), (0, _getProperties.getProperties)(t2));
}

function defineProp(target, name, descr) {
  return Object.defineProperty(target, name, descr);
}

function propAttributes(descr) {
  if ((0, _isTypeOf.isNotUndefined)(descr.get) || (0, _isTypeOf.isNotUndefined)(descr.set)) {
    return {
      get: descr.get,
      set: descr.set,
      enumerable: descr.enumerable,
      configurable: descr.configurable
    };
  }

  return {
    value: descr.value,
    writable: descr.writable,
    enumerable: descr.enumerable
  };
}

function _merge(source1, source2) {
  function inner(name, dest) {
    var _ref = [(0, _getDescriptor.getDescriptor)(source1, name), (0, _getDescriptor.getDescriptor)(source2, name)],
        descr1 = _ref[0],
        descr2 = _ref[1];
    var _ref2 = [source1[name], source2[name]],
        result1 = _ref2[0],
        result2 = _ref2[1];
    console.log("descr1: ".concat(descr1, " descr2: ").concat(descr2, " result1: ").concat(result1, " result2: ").concat(result2));

    if ((0, _isArray.isArray)(result1) && (0, _isArray.isArray)(result2)) {
      return [].concat(_toConsumableArray(result1), _toConsumableArray(result2));
    } else if ((0, _isTypeOf.isFunction)(result1) || (0, _isTypeOf.isFunction)(result2)) {
      var basedescr = (0, _isTypeOf.isUndefined)(result1) ? descr2 : descr1;
      var d = dest;
      return basedescr === null || basedescr === void 0 ? void 0 : basedescr.value;
    } else if ((0, _isTypeOf.isObject)(result1) && (0, _isTypeOf.isObject)(result2)) {
      return _merge(result1, result2);
    } else if (isPrimitiveType(result1) && isPrimitiveType(result2)) {
      return [result1, result2];
    } else if ((0, _isTypeOf.isNullOrUndefined)(result1) && (0, _isTypeOf.isNotNullOrUndefined)(result2)) {
      return result2;
    } else if ((0, _isTypeOf.isNotNullOrUndefined)(result1) && (0, _isTypeOf.isNullOrUndefined)(result2)) {
      return result1;
    } else {
      return result1;
    }
  }

  var target = {};
  (0, _distinct.distinct)(combinePropList(source1, source2)).forEach(function (n) {
    console.log("foreach: ".concat(n));
    target[n] = inner(n, target);
  });
  return target;
}

var item1 = {
  1: 'one',
  2: 'two',
  3: [1, 2, 3],
  6: {
    testing2: 'test'
  },
  toText: function toText() {
    return 1;
  }
};
var item2 = {
  3: [4, 5],
  6: {
    testing: 'test'
  }
};
console.log(_merge({
  1: 'one',
  2: 'two',
  three: 3,
  four: {},
  5: ['one', 'two']
}, {}));
console.log(_merge(item1, item2));
console.log(_merge(item1, item2).toText());