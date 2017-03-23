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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Arrow = function (_Component) {
  (0, _inherits3["default"])(Arrow, _Component);

  function Arrow() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Arrow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClick = function () {
      _this.props[_this.props.arrowType]();
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Arrow.prototype.render = function render() {
    var className = this.props.className;
    var defaultClass = className + '-default';
    className = (className + ' ' + (this.props.prefixCls || '')).trim();
    className = !this.props["default"] ? className : (className + ' ' + defaultClass).trim();
    className = className + ' ' + this.props.arrowType;
    var props = (0, _extends3["default"])({}, this.props);
    ['arrowType', 'next', 'prev', 'elemHeight', 'component', 'default', 'prefixCls'].forEach(function (key) {
      return delete props[key];
    });
    props.className = className;
    props.onClick = this.onClick;
    props.style = props.style || {};
    props.style.top = this.props.elemHeight / 2 + 'px';
    return _react2["default"].createElement(this.props.component, props, this.props.children);
  };

  return Arrow;
}(_react.Component);

Arrow.propTypes = {
  children: _react.PropTypes.any,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  prefixCls: _react.PropTypes.string,
  component: _react.PropTypes.any,
  arrowType: _react.PropTypes.string,
  "default": _react.PropTypes.bool,
  next: _react.PropTypes.func,
  prev: _react.PropTypes.func,
  elemHeight: _react.PropTypes.number
};
Arrow.defaultProps = {
  component: 'div',
  className: 'banner-anim-arrow'
};

exports["default"] = Arrow;
module.exports = exports['default'];