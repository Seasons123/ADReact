'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweenFunctions = require('tween-functions');

var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_tweenFunctions2["default"].path = function (_path, _param) {
  var param = _param || {};
  var pathNode = (0, _util.parsePath)(_path);
  var pathLength = pathNode.getTotalLength();
  var rect = param.rect || 100; // path 的大小，100 * 100，
  var lengthPixel = param.lengthPixel || 1500; // 线上取点像素，默认分为 1500 段。。
  var points = [];
  for (var i = 0; i < lengthPixel; i++) {
    points.push(pathNode.getPointAtLength(pathLength / lengthPixel * i));
  }
  return function path(t, b, _c, d) {
    var p = _tweenFunctions2["default"].linear(t, b, _c, d);
    var timePointX = rect * p; // X 轴的百分比;
    // 取出 x 轴百分比上的点;
    var point = points.filter(function (item) {
      return item.x >= timePointX;
    })[0] || pathNode.getPointAtLength(p * pathLength);
    return 1 - point.y / rect;
  };
};

exports["default"] = _tweenFunctions2["default"];
module.exports = exports['default'];