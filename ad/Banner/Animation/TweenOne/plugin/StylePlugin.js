'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _styleUtils = require('style-utils');

var _styleUtils2 = _interopRequireDefault(_styleUtils);

var _util = require('../util.js');

var _plugins = require('../plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StylePlugin = function StylePlugin(target, vars, type) {
  this.target = target;
  this.vars = vars;
  this.type = type;
  this.propsData = {};
  this.setDefaultData();
}; /* eslint-disable func-names, no-console */

var p = StylePlugin.prototype = {
  name: 'style'
};
p.getComputedStyle = function () {
  return document.defaultView ? document.defaultView.getComputedStyle(this.target) : {};
};
p.getTweenData = function (key, vars) {
  var data = {
    data: {},
    dataType: {},
    dataUnit: {},
    dataCount: {},
    dataSplitStr: {}
  };
  if (key.match(/colo|fill|storker/i)) {
    data.data[key] = (0, _styleUtils.parseColor)(vars);
    data.dataType[key] = 'color';
  } else if (key.match(/shadow/i)) {
    data.data[key] = (0, _styleUtils.parseShadow)(vars);
    data.dataType[key] = 'shadow';
  } else if (typeof vars === 'string' && vars.split(/[\s|,]/).length > 1) {
    data.data[key] = vars.split(/[\s|,]/);
    data.dataSplitStr[key] = vars.replace(/[^\s|,]/g, '');
    data.dataType[key] = 'string';
  } else {
    data.data[key] = vars;
    data.dataType[key] = 'other';
  }
  if (Array.isArray(data.data[key])) {
    data.dataUnit[key] = data.data[key].map(function (_item) {
      return _item.toString().replace(/[^a-z|%]/g, '');
    });
    data.dataCount[key] = data.data[key].map(function (_item) {
      return _item.toString().replace(/[^+|=|-]/g, '');
    });

    data.data[key] = data.data[key].map(function (_item) {
      return !parseFloat(_item) && parseFloat(_item) !== 0 ? _item : parseFloat(_item);
    });
  } else {
    data.dataUnit[key] = data.data[key].toString().replace(/[^a-z|%]/g, '');
    data.dataCount[key] = data.data[key].toString().replace(/[^+|=|-]/g, '');
    var d = parseFloat(data.data[key].toString().replace(/[a-z|%|=]/g, ''));
    data.data[key] = !d && d !== 0 ? data.data[key] : d;
  }
  return data;
};
p.setDefaultData = function () {
  var _this = this;

  this.propsData.data = {};
  this.propsData.dataType = {};
  this.propsData.dataUnit = {};
  this.propsData.dataCount = {};
  this.propsData.dataSplitStr = {};
  Object.keys(this.vars).forEach(function (_key) {
    if (_key in _plugins2["default"]) {
      _this.propsData.data[_key] = new _plugins2["default"][_key](_this.target, _this.vars[_key]);
      return;
    }
    var key = (0, _styleUtils.getGsapType)(_key);
    var _data = _this.getTweenData(key, _this.vars[_key]);
    _this.propsData.data[key] = _data.data[key];
    _this.propsData.dataType[key] = _data.dataType[key];
    _this.propsData.dataUnit[key] = _data.dataUnit[key];
    _this.propsData.dataCount[key] = _data.dataCount[key];
    if (_data.dataSplitStr[key]) {
      _this.propsData.dataSplitStr[key] = _data.dataSplitStr[key];
    }
  });
};
p.convertToMarksArray = function (unit, key, data, i) {
  var startUnit = data.toString().replace(/[^a-z|%]/g, '');
  var endUnit = unit[i];
  if (startUnit === endUnit) {
    return parseFloat(data);
  } else if (!parseFloat(data) && parseFloat(data) !== 0) {
    return data;
  }
  return (0, _util.startConvertToEndUnit)(this.target, key, data, startUnit, endUnit, null, key === 'transformOrigin' && !i);
};
p.getAnimStart = function (willChangeBool) {
  var _this2 = this;

  var computedStyle = this.getComputedStyle();
  var style = {};
  this.supports3D = (0, _styleUtils.checkStyleName)('perspective');
  var willChangeArray = void 0;
  if (willChangeBool) {
    this.willChange = computedStyle.willChange === 'auto' || !computedStyle.willChange || computedStyle.willChange === 'none' ? '' : computedStyle.willChange;
    willChangeArray = this.willChange.split(',').filter(function (k) {
      return k;
    });
  }
  Object.keys(this.propsData.data).forEach(function (key) {
    var cssName = (0, _styleUtils.isConvert)(key);
    if (willChangeBool) {
      var willStyle = key in _plugins2["default"] ? _this2.propsData.data[key].useStyle || cssName : cssName;
      if (willChangeArray.indexOf(willStyle) === -1 && (willStyle in computedStyle || key in _plugins2["default"])) {
        willChangeArray.push(willStyle.replace(/([A-Z])/g, '-$1').toLocaleLowerCase());
      }
      _this2.willChange = willChangeArray.join(',');
    }
    var startData = computedStyle[cssName];
    var fixed = computedStyle.position === 'fixed';
    if (!startData || startData === 'none' || startData === 'auto') {
      startData = '';
    }
    var transform = void 0;
    var endUnit = void 0;
    var startUnit = void 0;
    if (key in _plugins2["default"]) {
      if (key === 'bezier') {
        _this2.transform = (0, _styleUtils.checkStyleName)('transform');
        startData = computedStyle[_this2.transform];
        style.transform = style.transform || (0, _styleUtils.getTransform)(startData);
      }
      _this2.propsData.data[key].getAnimStart();
    } else if (cssName === 'transform') {
      _this2.transform = (0, _styleUtils.checkStyleName)('transform');
      startData = computedStyle[_this2.transform];
      endUnit = _this2.propsData.dataUnit[key];
      transform = style.transform || (0, _styleUtils.getTransform)(startData);
      if (endUnit && endUnit.match(/%|vw|vh|em|rem/i)) {
        var percent = key === 'translateX' ? 'xPercent' : 'yPercent';
        transform[percent] = (0, _util.startConvertToEndUnit)(_this2.target, key, transform[key], null, endUnit);
        transform[key] = 0;
      }
      style.transform = transform;
    } else if (cssName === 'filter') {
      _this2.filterName = (0, _styleUtils.checkStyleName)('filter') || 'filter';
      startData = computedStyle[_this2.filterName];
      _this2.filterObject = (0, _extends3["default"])({}, _this2.filterObject, (0, _styleUtils.splitFilterToObject)(startData));
      startData = _this2.filterObject[key] || 0;
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      endUnit = _this2.propsData.dataUnit[key];
      if (endUnit !== startUnit) {
        startData = (0, _util.startConvertToEndUnit)(_this2.target, cssName, parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[key] = parseFloat(startData);
    } else if (key.match(/color|fill/i) || key === 'stroke') {
      startData = !startData && key === 'stroke' ? 'rgba(255, 255, 255, 0)' : startData;
      style[cssName] = (0, _styleUtils.parseColor)(startData);
    } else if (key.match(/shadow/i)) {
      startData = (0, _styleUtils.parseShadow)(startData);
      endUnit = _this2.propsData.dataUnit[key];
      startData = startData.map(_this2.convertToMarksArray.bind(_this2, endUnit, key));
      style[cssName] = startData;
    } else if (Array.isArray(_this2.propsData.data[key])) {
      startData = startData.split(/[\s|,]/);
      endUnit = _this2.propsData.dataUnit[key];
      startData = startData.map(_this2.convertToMarksArray.bind(_this2, endUnit, key));
      style[cssName] = startData;
    } else {
      // 计算单位
      endUnit = _this2.propsData.dataUnit[cssName];
      startUnit = startData.toString().replace(/[^a-z|%]/g, '');
      if (endUnit !== startUnit) {
        startData = (0, _util.startConvertToEndUnit)(_this2.target, cssName, parseFloat(startData), startUnit, endUnit, fixed);
      }
      style[cssName] = parseFloat(startData || 0);
    }
  });
  this.start = style;
  return style;
};
p.setArrayRatio = function (ratio, start, vars, unit, type) {
  if (type === 'color' && start.length === 4 && vars.length === 3) {
    vars[3] = 1;
  }
  var startInset = start.indexOf('inset') >= 0;
  var endInset = vars.indexOf('inset') >= 0;
  if (startInset && !endInset || endInset && !startInset) {
    throw console.error('Error: "box-shadow" inset have to exist');
  }
  var length = endInset ? 9 : 8;
  if (start.length === length && vars.length === length - 1) {
    vars.splice(3, 0, 0);
    unit.splice(3, 0, '');
  } else if (vars.length === length && start.length === length - 1) {
    start.splice(3, 0, 0);
  }
  var _vars = vars.map(function (endData, i) {
    var startIsAlpha = type === 'color' && i === 3 && !start[i] ? 1 : 0;
    var startData = typeof start[i] === 'number' ? start[i] : startIsAlpha;
    if (typeof endData === 'string') {
      return endData;
    }
    return (endData - startData) * ratio + startData + (unit[i] || 0);
  });
  if (type === 'color') {
    return (0, _styleUtils.getColor)(_vars);
  } else if (type === 'shadow') {
    var l = _vars.length === length ? 4 : 3;
    var s = _vars.slice(0, l).map(function (item) {
      if (typeof item === 'number') {
        return item + 'px';
      }
      return item;
    });
    var c = _vars.slice(l, endInset ? _vars.length - 1 : _vars.length);
    var color = (0, _styleUtils.getColor)(c);
    return (s.join(' ') + ' ' + color + ' ' + (endInset ? 'inset' : '')).trim();
  }
  return _vars;
};

p.setRatio = function (ratio, tween) {
  var _this3 = this;

  tween.style = tween.style || {};
  if (this.start.transform) {
    tween.style.transform = tween.style.transform || (0, _extends3["default"])({}, this.start.transform);
  }
  var style = this.target.style;
  if (this.willChange) {
    if (ratio === (this.type === 'from' ? 0 : 1)) {
      style.willChange = null;
    } else {
      style.willChange = this.willChange;
    }
  }
  Object.keys(this.propsData.data).forEach(function (key) {
    var _isTransform = (0, _styleUtils.isTransform)(key) === 'transform';
    var startVars = _isTransform ? _this3.start.transform[key] : _this3.start[key];
    var endVars = _this3.propsData.data[key];
    var unit = _this3.propsData.dataUnit[key];
    var count = _this3.propsData.dataCount[key];
    if (key in _plugins2["default"]) {
      _this3.propsData.data[key].setRatio(ratio, tween);
      if (key === 'bezier') {
        style[_this3.transform] = (0, _util.getTransformValue)(tween.style.transform, _this3.supports3D);
      } else {
        Object.keys(tween.style).forEach(function (css) {
          return style[css] = tween.style[css];
        });
      }
      return;
    } else if (_isTransform) {
      if (unit && unit.match(/%|vw|vh|em|rem/i)) {
        var pName = key === 'translateX' ? 'xPercent' : 'yPercent';
        startVars = _this3.start.transform[pName];
        if (count.charAt(1) === '=') {
          tween.style.transform[pName] = startVars + endVars * ratio + unit;
        } else {
          tween.style.transform[pName] = (endVars - startVars) * ratio + startVars + unit;
        }
      } else if (key === 'scale') {
        var xStart = _this3.start.transform.scaleX;
        var yStart = _this3.start.transform.scaleY;
        if (count.charAt(1) === '=') {
          tween.style.transform.scaleX = xStart + endVars * ratio;
          tween.style.transform.scaleY = yStart + endVars * ratio;
        } else {
          tween.style.transform.scaleX = (endVars - xStart) * ratio + xStart;
          tween.style.transform.scaleY = (endVars - yStart) * ratio + yStart;
        }
      }
      if (count.charAt(1) === '=') {
        tween.style.transform[key] = startVars + endVars * ratio;
      } else {
        tween.style.transform[key] = (endVars - startVars) * ratio + startVars;
      }
      style[_this3.transform] = (0, _util.getTransformValue)(tween.style.transform, _this3.supports3D);
      return;
    } else if (Array.isArray(endVars)) {
      var _type = _this3.propsData.dataType[key];
      tween.style[key] = _this3.setArrayRatio(ratio, startVars, endVars, unit, _type);
      if (_type === 'string') {
        tween.style[key] = tween.style[key].join(_this3.propsData.dataSplitStr[key]);
      }
    } else {
      var styleUnit = (0, _styleUtils.stylesToCss)(key, 0);
      styleUnit = typeof styleUnit === 'number' ? '' : styleUnit.replace(/[^a-z|%]/g, '');
      unit = unit || (_styleUtils2["default"].filter.indexOf(key) >= 0 ? '' : styleUnit);
      if (typeof endVars === 'string') {
        tween.style[key] = endVars;
      } else {
        if (count.charAt(1) === '=') {
          tween.style[key] = startVars + endVars * ratio + unit;
        } else {
          tween.style[key] = (endVars - startVars) * ratio + startVars + unit;
        }
      }
    }
    if (_styleUtils2["default"].filter.indexOf(key) >= 0) {
      if (!_this3.filterObject) {
        return;
      }
      _this3.filterObject[key] = tween.style[key];
      var filterStyle = '';
      Object.keys(_this3.filterObject).forEach(function (filterKey) {
        filterStyle += ' ' + filterKey + '(' + _this3.filterObject[filterKey] + ')';
      });
      style[_this3.filterName] = filterStyle.trim();
      return;
    }
    style[key] = tween.style[key];
  });
};
exports["default"] = StylePlugin;
module.exports = exports['default'];