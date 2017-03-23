'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Thumb = function (_Component) {
  (0, _inherits3["default"])(Thumb, _Component);

  function Thumb() {
    (0, _classCallCheck3["default"])(this, Thumb);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));

    _this.getDefaultThumb = function () {
      var children = [];
      for (var i = 0; i < _this.props.length; i++) {
        children.push(_react2["default"].createElement('span', { key: i }));
      }
      return children;
    };

    return _this;
  }

  Thumb.prototype.render = function render() {
    var _this2 = this;

    var className = 'banner-anim-thumb';
    var defaultClass = className + '-default';
    className = (className + ' ' + (this.props.prefixCls || '')).trim();
    className = !this.props["default"] ? className : (className + ' ' + defaultClass).trim();
    var children = this.props["default"] ? this.getDefaultThumb() : this.props.children;
    if (this.props.length && (0, _utils.toArrayChildren)(children).length !== this.props.length) {
      console.warn('The thumbnail length and the images length different.'); // eslint-disable-line
    }
    var childToRender = (0, _utils.toArrayChildren)(children).map(function (item, i) {
      var props = (0, _extends3["default"])({}, item.props);
      props.onClick = _this2.props.thumbClick.bind(_this2, i);
      props.className = ((props.className || '') + ' ' + (_this2.props.active === i ? 'active' : '')).trim();
      return _react2["default"].cloneElement(item, props);
    });
    var props = (0, _extends3["default"])({}, this.props);
    ['length', 'thumbClick', 'active', 'default', 'component', 'prefixCls'].forEach(function (key) {
      return delete props[key];
    });
    props.className = className;
    return _react2["default"].createElement(this.props.component, props, childToRender);
  };

  return Thumb;
}(_react.Component);

Thumb.propTypes = {
  children: _react.PropTypes.any,
  style: _react.PropTypes.object,
  prefixCls: _react.PropTypes.string,
  component: _react.PropTypes.any,
  thumbClick: _react.PropTypes.func,
  "default": _react.PropTypes.bool,
  length: _react.PropTypes.number,
  active: _react.PropTypes.number
};
Thumb.defaultProps = {
  component: 'div',
  thumbClick: function thumbClick() {}
};

exports["default"] = Thumb;
module.exports = exports['default'];