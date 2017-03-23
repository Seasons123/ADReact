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

var _TweenOne = require('./TweenOne');

var _TweenOne2 = _interopRequireDefault(_TweenOne);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

var TweenOneGroup = function (_Component) {
  (0, _inherits3["default"])(TweenOneGroup, _Component);

  function TweenOneGroup() {
    (0, _classCallCheck3["default"])(this, TweenOneGroup);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));

    _initialiseProps.call(_this);

    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.onEnterBool = false;
    _this.isTween = {};
    // 第一进入，appear 为 true 时默认用 enter 或 tween-one 上的效果
    var children = (0, _util.toArrayChildren)((0, _util.getChildrenFromProps)(_this.props));
    _this.state = {
      children: children
    };
    return _this;
  }

  TweenOneGroup.prototype.componentDidMount = function componentDidMount() {
    this.onEnterBool = true;
  };

  TweenOneGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var nextChildren = (0, _util.toArrayChildren)(nextProps.children);
    var currentChildren = (0, _util.toArrayChildren)(this.state.children);
    var newChildren = (0, _util.mergeChildren)(currentChildren, nextChildren);

    this.keysToEnter = [];
    this.keysToLeave = [];
    nextChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasPrev = (0, _util.findChildInChildrenByKey)(currentChildren, key);
      if (!hasPrev && key) {
        _this2.keysToEnter.push(key);
      }
    });

    currentChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasNext = (0, _util.findChildInChildrenByKey)(nextChildren, key);
      if (!hasNext && key) {
        _this2.keysToLeave.push(key);
      }
    });
    this.setState({
      children: newChildren
    });
  };

  TweenOneGroup.prototype.render = function render() {
    var childrenToRender = this.getChildrenToRender(this.state.children);
    if (!this.props.component) {
      return childrenToRender[0] || null;
    }
    var componentProps = (0, _extends3["default"])({}, this.props);
    ['component', 'appear', 'enter', 'leave', 'animatingClassName', 'onEnd', 'resetStyleBool', 'willChange'].forEach(function (key) {
      return delete componentProps[key];
    });
    return (0, _react.createElement)(this.props.component, componentProps, childrenToRender);
  };

  return TweenOneGroup;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (animation, key, type, obj) {
    var length = (0, _util.dataToArray)(animation).length;
    var animatingClassName = _this3.props.animatingClassName;
    var tag = obj.target;
    var isEnter = type === 'enter' || type === 'appear';
    if (obj.mode === 'onStart') {
      tag.className = tag.className.replace(animatingClassName[isEnter ? 1 : 0], '').trim();
      if (tag.className.indexOf(animatingClassName[isEnter ? 0 : 1]) === -1) {
        tag.className = (tag.className + ' ' + animatingClassName[isEnter ? 0 : 1]).trim();
      }
    } else if (obj.index === length - 1 && obj.mode === 'onComplete') {
      var children = _this3.state.children;
      if (type === 'enter') {
        _this3.keysToEnter.splice(_this3.keysToEnter.indexOf(key), 1);
      } else if (type === 'leave') {
        children = _this3.state.children.filter(function (child) {
          return key !== child.key;
        });
        _this3.keysToLeave.splice(_this3.keysToLeave.indexOf(key), 1);
      }
      tag.className = tag.className.replace(animatingClassName[isEnter ? 0 : 1], '').trim();
      delete _this3.isTween[key];
      _this3.setState({
        children: children
      });
      var _obj = { key: key, type: type };
      _this3.props.onEnd(_obj);
    }
  };

  this.getCoverAnimation = function (child, i, type) {
    var animation = void 0;
    var onChange = void 0;
    animation = type === 'leave' ? _this3.props.leave : _this3.props.enter;
    if (type === 'appear') {
      var appear = (0, _util.transformArguments)(_this3.props.appear, child.key, i);
      animation = appear && _this3.props.enter || null;
    }
    onChange = _this3.onChange.bind(_this3, animation, child.key, type);
    var children = _react2["default"].createElement(_TweenOne2["default"], (0, _extends3["default"])({}, child.props, {
      willChange: _this3.props.willChange,
      key: child.key,
      component: child.type,
      animation: (0, _util.transformArguments)(animation, child.key, i),
      onChange: onChange,
      resetStyleBool: _this3.props.resetStyleBool
    }));
    if (_this3.keysToEnter.concat(_this3.keysToLeave).indexOf(child.key) >= 0 || !_this3.onEnterBool && animation) {
      _this3.isTween[child.key] = type;
    }
    return children;
  };

  this.getChildrenToRender = function (children) {
    return children.map(function (child, i) {
      if (!child || !child.key) {
        return child;
      }
      var key = child.key;
      if (_this3.keysToLeave.indexOf(key) >= 0) {
        return _this3.getCoverAnimation(child, i, 'leave');
      } else if (_this3.keysToEnter.indexOf(key) >= 0 || _this3.isTween[child.key] && _this3.keysToLeave.indexOf(key) === -1) {
        return _this3.getCoverAnimation(child, i, 'enter');
      } else if (!_this3.onEnterBool) {
        return _this3.getCoverAnimation(child, i, 'appear');
      }
      return _this3.isTween[child.key] && _this3.getCoverAnimation(child, i, _this3.isTween[child.key]) || _react2["default"].createElement(_TweenOne2["default"], (0, _extends3["default"])({}, child.props, { component: child.type, key: child.key }));
    });
  };
};

var objectOrArray = _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array]);
var objectOrArrayOrFunc = _react.PropTypes.oneOfType([objectOrArray, _react.PropTypes.func]);

TweenOneGroup.propTypes = {
  component: _react.PropTypes.any,
  children: _react.PropTypes.any,
  style: _react.PropTypes.object,
  appear: _react.PropTypes.bool,
  enter: objectOrArrayOrFunc,
  leave: objectOrArrayOrFunc,
  animatingClassName: _react.PropTypes.array,
  onEnd: _react.PropTypes.func,
  willChange: _react.PropTypes.bool,
  resetStyleBool: _react.PropTypes.bool
};

TweenOneGroup.defaultProps = {
  component: 'div',
  appear: true,
  animatingClassName: ['tween-one-entering', 'tween-one-leaving'],
  enter: { x: 50, opacity: 0, type: 'from' },
  leave: { x: -50, opacity: 0 },
  onEnd: noop,
  willChange: true,
  resetStyleBool: true
};
exports["default"] = TweenOneGroup;
module.exports = exports['default'];