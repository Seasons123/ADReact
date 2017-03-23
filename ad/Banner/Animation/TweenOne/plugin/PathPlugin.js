'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _util = require('../util');

var _styleUtils = require('style-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PathPlugin = function PathPlugin(target, vars) {
  this.target = target;
  var path = typeof vars === 'string' ? vars : vars.x || vars.y || vars.rotate;
  this.vars = vars;
  this.path = (0, _util.parsePath)(path);
  this.start = {};
  this.pathLength = this.path.getTotalLength();
};

PathPlugin.prototype = {
  name: 'path',
  useStyle: 'transform',
  getComputedStyle: function getComputedStyle() {
    return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
  },
  getPoint: function getPoint(offset) {
    var o = offset || 0;
    var p = this.pathLength * this.progress + o;
    return this.path.getPointAtLength(p);
  },
  getAnimStart: function getAnimStart() {
    var computedStyle = this.getComputedStyle();
    var transform = (0, _styleUtils.getTransform)(computedStyle[(0, _styleUtils.checkStyleName)('transform')]);
    this.start = transform;
    this.data = (0, _extends3["default"])({}, transform);
  },
  setRatio: function setRatio(r, t) {
    this.progress = r;
    var p = this.getPoint();
    var p0 = this.getPoint(-1);
    var p1 = this.getPoint(1);
    if (typeof this.vars === 'string') {
      this.data.translateX = p.x + this.start.translateX;
      this.data.translateY = p.y + this.start.translateY;
      this.data.rotate = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    } else {
      this.data.translateX = this.vars.x ? p.x + this.start.translateX : this.data.translateX;
      this.data.translateY = this.vars.y ? p.y + this.start.translateY : this.data.translateY;
      this.data.rotate = this.vars.rotate ? Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI : this.data.rotate;
    }
    t.style.transform = (0, _util.getTransformValue)(this.data);
  }
};

exports["default"] = PathPlugin;
module.exports = exports['default'];