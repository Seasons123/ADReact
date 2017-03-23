'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.toArrayChildren = toArrayChildren;
exports.dataToArray = dataToArray;
exports.setAnimCompToTagComp = setAnimCompToTagComp;
exports.currentScrollTop = currentScrollTop;
exports.currentScrollLeft = currentScrollLeft;
exports.windowHeight = windowHeight;
exports.switchChildren = switchChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function toArrayChildren(children) {
  var ret = [];
  _react2["default"].Children.forEach(children, function (c) {
    ret.push(c);
  });
  return ret;
}

function dataToArray(vars) {
  if (!vars && vars !== 0) {
    return [];
  }
  if (Array.isArray(vars)) {
    return vars;
  }
  return [vars];
}

function setAnimCompToTagComp(item, i) {
  if (!item) {
    return null;
  }
  var props = (0, _extends3["default"])({}, item.props);
  props.key = item.key || i;
  // 压缩后名称不一样了。
  var propTypes = item.type.propTypes;
  if (propTypes && (propTypes.animConfig && propTypes.animatingClassName && propTypes.leaveReverse && propTypes.delay && propTypes.ease && propTypes.interval && propTypes.duration || propTypes.animation && propTypes.paused && propTypes.reverse && propTypes.attr && propTypes.moment || propTypes.showProp && propTypes.exclusive && propTypes.transitionName && propTypes.transitionAppear && propTypes.transitionEnter && propTypes.transitionLeave && propTypes.onEnd && propTypes.animation)) {
    // queueAnim or tweeOne or animate;
    var style = (0, _extends3["default"])({}, props.style);
    style.position = 'relative';
    props.style = style;
    var component = props.component;
    ['component', 'appear', 'interval', 'duration', 'delay', 'animConfig', 'ease', 'enterForcedRePlay', 'leaveReverse', 'animatingClassName', 'animation', 'reverseDelay', 'attr', 'paused', 'reverse', 'moment', 'resetStyleBool', 'showProp', 'exclusive', 'transitionName', 'transitionAppear', 'transitionEnter', 'transitionLeave', 'onEnd'].forEach(function (key) {
      return delete props[key];
    });
    return _react2["default"].createElement(component, props);
  }
  return item;
}
setAnimCompToTagComp.propTypes = {
  key: _react2["default"].PropTypes.string,
  style: _react2["default"].PropTypes.object,
  component: _react2["default"].PropTypes.any,
  name: _react2["default"].PropTypes.string
};

function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

function currentScrollLeft() {
  return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
}

function windowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function switchChildren(hideProps, item) {
  if (!hideProps) {
    return item;
  }
  if ((typeof hideProps === 'undefined' ? 'undefined' : (0, _typeof3["default"])(hideProps)) === 'object' && item.key in hideProps) {
    return _react2["default"].cloneElement(item, (0, _extends3["default"])({}, hideProps[item.key]));
  }
  return _react2["default"].cloneElement(item, item.props, null);
}