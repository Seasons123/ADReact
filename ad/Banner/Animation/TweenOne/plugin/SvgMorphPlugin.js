'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snapsvglite = require('./snapsvglite');

var SvgPlugin = function SvgPlugin(target, vars, key) {
  this.target = target;
  this.vars = vars;
  this.key = key;
  this.propsData = {};
}; /* eslint-disable func-names */


var p = SvgPlugin.prototype = {
  name: 'SVGMorph'
};
p.getPointVars = function (d) {
  return d.split(/\s+/).map(function (item) {
    return item.split(',').map(function (_item) {
      return parseFloat(_item);
    });
  });
};
p.polygonPoints = function (start, end) {
  var startArray = this.getPointVars(start);
  var endArray = this.getPointVars(end);
  if (startArray.length !== endArray.length) {
    var long = startArray.length > endArray.length ? startArray : endArray;
    var short = long === startArray ? endArray : startArray;
    for (var i = short.length; i < long.length; i++) {
      short[i] = short[short.length - 1];
    }
    return startArray.length > endArray.length ? [long, short] : [short, long];
  }
  return [startArray, endArray];
};
p.getAnimStart = function () {
  this.start = this.target.getAttribute(this.key);
  if (this.key === 'd') {
    this.pathArray = (0, _snapsvglite.path2curve)(this.start, this.vars);
  } else {
    this.pathArray = this.polygonPoints(this.start, this.vars);
  }
  return this.pathArray;
};
p.setArrayRatio = function (ratio, start, item, i) {
  if (typeof item === 'string') {
    return item;
  }
  var startData = start[i];
  return (item - startData) * ratio + startData;
};
p.setRatio = function (ratio, tween) {
  var _this = this;

  var start = this.pathArray[0];
  var end = this.pathArray[1];
  tween[this.key] = end.map(function (item, i) {
    var startData = start[i];
    var t = item.map(_this.setArrayRatio.bind(_this, ratio, startData));
    var name = t[0];
    if (_this.key === 'd') {
      t.shift();
    }
    return _this.key === 'd' ? '' + name + t.join(',') : t.join(',');
  });
  var vars = ratio === 1 ? this.vars : tween[this.key].join(' ');
  vars = ratio === 0 ? this.start : vars;
  if (vars) {
    this.target.setAttribute(this.key, vars);
  }
};
exports["default"] = SvgPlugin;
module.exports = exports['default'];