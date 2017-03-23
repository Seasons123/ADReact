'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _ticker = require('../TweenOne/ticker');

var _ticker2 = _interopRequireDefault(_ticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = {
  across: function across(elem, type, direction, animData, elemOffset, hideProps) {
    var _x = void 0;
    var props = (0, _extends3["default"])({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _x = direction === 'next' ? '-100%' : '100%';
      children = (0, _utils.toArrayChildren)(children).map(_utils.switchChildren.bind(this, hideProps));
    }
    return (0, _react.cloneElement)(elem, {
      animation: (0, _extends3["default"])({}, animData, {
        x: _x,
        type: type === 'enter' ? 'from' : 'to'
      })
    }, children);
  },
  vertical: function vertical(elem, type, direction, animData, elemOffset, hideProps) {
    var _y = void 0;
    var props = (0, _extends3["default"])({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      // 时间轴不同，导致中间有空隙， 等修复 twee-one,先加delay
      _y = direction === 'next' ? '100%' : '-100%';
      children = (0, _utils.toArrayChildren)(children).map(_utils.switchChildren.bind(this, hideProps));
    }
    return (0, _react.cloneElement)(elem, (0, _extends3["default"])({}, props, {
      animation: (0, _extends3["default"])({}, animData, {
        y: _y,
        type: type === 'enter' ? 'from' : 'to'
      })
    }), children);
  },
  acrossOverlay: function acrossOverlay(elem, type, direction, animData, elemOffset, hideProps) {
    var _x = void 0;
    var props = (0, _extends3["default"])({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _x = direction === 'next' ? '100%' : '-100%';
    } else {
      _x = direction === 'next' ? '-20%' : '20%';
      children = (0, _utils.toArrayChildren)(children).map(_utils.switchChildren.bind(this, hideProps));
    }
    return (0, _react.cloneElement)(elem, (0, _extends3["default"])({}, props, {
      animation: (0, _extends3["default"])({}, animData, {
        x: _x,
        type: type === 'enter' ? 'from' : 'to'
      })
    }), children);
  },
  verticalOverlay: function verticalOverlay(elem, type, direction, animData, elemOffset, hideProps) {
    var _y = void 0;
    var props = (0, _extends3["default"])({}, elem.props);
    var children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '20%' : '-20%';
      children = (0, _utils.toArrayChildren)(children).map(_utils.switchChildren.bind(this, hideProps));
    }
    return (0, _react.cloneElement)(elem, (0, _extends3["default"])({}, props, {
      animation: (0, _extends3["default"])({}, animData, {
        y: _y,
        type: type === 'enter' ? 'from' : 'to'
      })
    }), children);
  },
  gridBar: function gridBar(elem, type, direction, animData, elemOffset) {
    var props = (0, _extends3["default"])({}, elem.props);
    var animChild = [];
    var girdNum = 10;
    var girdSize = 100 / girdNum;

    var _y = void 0;
    var children = props.children;
    if (type === 'enter') {
      _y = direction === 'next' ? '-100%' : '100%';
    } else {
      _y = direction === 'next' ? '100%' : '-100%';
      children = (0, _utils.toArrayChildren)(children).map(_utils.setAnimCompToTagComp);
    }
    for (var i = 0; i < girdNum; i++) {
      var style = (0, _extends3["default"])({}, props.style);
      style.width = girdSize + 0.1 + '%';
      style.left = i * girdSize + '%';
      style.position = 'absolute';
      style.overflow = 'hidden';
      var _style = (0, _extends3["default"])({}, props.style);
      _style.width = elemOffset.width + 'px';
      _style.height = elemOffset.height + 'px';
      _style["float"] = 'left';
      _style.position = 'relative';
      _style.left = -i * girdSize / 100 * elemOffset.width + 'px';
      props.style = _style;
      props.animation = (0, _extends3["default"])({}, animData, {
        y: _y,
        type: type === 'enter' ? 'from' : 'to',
        delay: i * 50 + (type === 'enter' ? 0 : 50) + (animData.delay || 0),
        onComplete: i === girdNum - 1 ? animData.onComplete : null
      });

      var mask = _react2["default"].createElement(
        'div',
        { style: style, key: i },
        (0, _react.cloneElement)(elem, props, children)
      );
      animChild.push(mask);
    }
    var animSlot = _react2["default"].createElement(
      'div',
      { style: { width: '100%', position: 'absolute', top: 0 } },
      animChild
    );
    var _props = (0, _extends3["default"])({}, elem.props);
    _props.children = animSlot;
    return (0, _react.cloneElement)(elem, _props);
  },
  grid: function grid(elem, type, direction, animData, elemOffset) {
    var props = (0, _extends3["default"])({}, elem.props);
    var animChild = [];
    var gridNum = 10;
    var gridWidth = elemOffset.width / gridNum;
    var gridNumH = Math.ceil(elemOffset.height / gridWidth);
    if (type === 'leave') {
      var _delay = (gridNum * gridNumH - 1) % gridNum * 50 + Math.floor((gridNum * gridNumH - 1) / gridNum) * 50;
      _ticker2["default"].timeout(function () {
        animData.onComplete();
      }, _delay + animData.duration);
      return _react2["default"].cloneElement(elem, props);
    }
    for (var i = 0; i < gridNum * gridNumH; i++) {
      // mask样式
      var style = (0, _extends3["default"])({}, props.style);
      style.position = 'absolute';
      style.overflow = 'hidden';
      style.width = gridWidth + 1 + 'px';
      style.height = gridWidth + 1 + 'px';
      style.left = i % gridNum * gridWidth;
      style.top = Math.floor(i / gridNum) * gridWidth;
      // clone 的样式
      var _style = (0, _extends3["default"])({}, props.style);
      _style.width = elemOffset.width + 'px';
      _style.height = elemOffset.height + 'px';
      _style.position = 'relative';
      _style.left = -i % gridNum * gridWidth;
      _style.top = -Math.floor(i / gridNum) * gridWidth;
      props.style = _style;
      var delay = direction === 'next' ? i % gridNum * 50 + Math.floor(i / gridNum) * 50 : (gridNum - i % gridNum) * 50 + (gridNumH - Math.floor(i / gridNum)) * 50;
      delay += animData.delay || 0;
      var length = direction === 'next' ? gridNum * gridNumH - 1 : 0;
      var animation = (0, _extends3["default"])({}, animData, {
        opacity: 0,
        type: 'from',
        delay: delay,
        onComplete: i === length ? animData.onComplete : null
      });
      var mask = _react2["default"].createElement(
        elem.type,
        { style: style, key: i, animation: animation },
        (0, _react.cloneElement)(elem, props)
      );
      animChild.push(mask);
    }
    var _props = (0, _extends3["default"])({}, elem.props);
    _props.children = animChild;
    return (0, _react.cloneElement)(elem, _props);
  }
};
module.exports = exports['default'];