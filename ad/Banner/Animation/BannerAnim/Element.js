'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BgElement = require('./BgElement');

var _BgElement2 = _interopRequireDefault(_BgElement);

var _rcTweenOne = require('../TweenOne');

var _rcTweenOne2 = _interopRequireDefault(_rcTweenOne);

var _ticker = require('../TweenOne/ticker');

var _ticker2 = _interopRequireDefault(_ticker);

var _tweenFunctions = require('tween-functions');

var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

var _styleUtils = require('style-utils');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function noop() {}

var Element = function (_Component) {
  (0, _inherits3["default"])(Element, _Component);

  function Element() {
    (0, _classCallCheck3["default"])(this, Element);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));

    _this.onMouseMove = function (e) {
      _this.domRect = _this.dom.getBoundingClientRect();
      _this.enterMouse = _this.enterMouse || { x: _this.domRect.width / 2, y: _this.domRect.height / 2 };
      _this.domWH = {
        w: _this.domRect.width,
        h: _this.domRect.height
      };
      _this.offsetTop = _this.domRect.top + (0, _utils.currentScrollTop)();
      _this.offsetLeft = _this.domRect.left + (0, _utils.currentScrollLeft)();
      var mouseXY = {
        x: e.pageX - _this.offsetLeft,
        y: e.pageY - _this.offsetTop
      };
      _this.setTicker(_this.followParallax, mouseXY);
    };

    _this.setTicker = function (followParallax, mouseXY) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

      _ticker2["default"].clear(_this.tickerId);
      _this.tickerId = 'bannerElementTicker' + (Date.now() + Math.random());
      var startFrame = _ticker2["default"].frame;
      var startX = _this.enterMouse.x;
      var startY = _this.enterMouse.y;
      var duration = followParallax.duration || 450;
      var easeFunc = _tweenFunctions2["default"][followParallax.ease || 'easeOutQuad'];
      var start = typeof followParallax.minMove === 'number' ? followParallax.minMove : 0.08;
      _ticker2["default"].wake(_this.tickerId, function () {
        var moment = (_ticker2["default"].frame - startFrame) * _ticker2["default"].perFrame;
        var ratio = easeFunc(moment, start, 1, duration);
        _this.enterMouse.x = startX + (mouseXY.x - startX) * ratio;
        _this.enterMouse.y = startY + (mouseXY.y - startY) * ratio;
        _this.setFollowStyle(_this.domWH);
        if (moment >= duration) {
          _ticker2["default"].clear(_this.tickerId);
          callback();
        }
      });
    };

    _this.getFollowMouseMove = function () {
      var onMouseMove = void 0;
      if (_this.followParallax) {
        if (_this.followParallax.delay) {
          onMouseMove = !_this.delayTimeout ? null : _this.state.onMouseMove;
          _this.delayTimeout = _this.delayTimeout || _ticker2["default"].timeout(function () {
            _this.setState({
              onMouseMove: _this.onMouseMove
            });
          }, _this.followParallax.delay);
        } else {
          onMouseMove = _this.onMouseMove;
        }
      }
      return onMouseMove;
    };

    _this.getFollowStyle = function (data, domWH) {
      var style = {};
      (0, _utils.dataToArray)(data.type).forEach(function (type) {
        var mouseData = _this.enterMouse.x;
        var domData = domWH.w;
        var value = data.value;
        if ((type.indexOf('y') >= 0 || type.indexOf('Y') >= 0) && type !== 'opacity') {
          mouseData = _this.enterMouse.y;
          domData = domWH.h;
        }
        var d = (mouseData - domData / 2) / (domData / 2) * value;
        var _type = (0, _styleUtils.getGsapType)(type);
        var cssName = (0, _styleUtils.isConvert)(_type);
        if (cssName === 'transform') {
          var transform = (0, _styleUtils.checkStyleName)('transform');
          style[transform] = style[transform] || {};
          style[transform][_type] = (0, _styleUtils.stylesToCss)(_type, d).trim();
        } else if (cssName === 'filter') {
          var filter = (0, _styleUtils.checkStyleName)('filter');
          style[filter] = style[filter] || {};
          style[filter][_type] = (0, _styleUtils.stylesToCss)(_type, d).trim();
        } else {
          style[cssName] = (0, _styleUtils.stylesToCss)(_type, d).trim();
        }
      });
      return style;
    };

    _this.setFollowStyle = function (domWH) {
      _this.doms.map(function (item, i) {
        if (!item) {
          return;
        }
        var data = _this.followParallax.data[i];
        var style = _this.getFollowStyle(data, domWH);
        Object.keys(style).forEach(function (key) {
          if ((0, _typeof3["default"])(style[key]) === 'object') {
            var styleStr = '';
            Object.keys(style[key]).forEach(function (_key) {
              styleStr += (' ' + _key + '(' + style[key][_key] + ')').trim();
            });
            item.style[key] = styleStr;
            return;
          }
          item.style[key] = key.indexOf('backgroundPosition') >= 0 ? 'calc(' + (data.bgPosition || '0%') + ' + ' + style[key] + ' )' : style[key];
        });
      });
    };

    _this.getChildren = function () {
      return (0, _utils.toArrayChildren)(_this.props.children).map(function (item) {
        if (item.type === _BgElement2["default"]) {
          return _react2["default"].cloneElement(item, { show: _this.state.show });
        }
        return item;
      });
    };

    _this.reFollowParallax = function () {
      _this.setTicker(_this.followParallax, {
        x: _this.domRect.width / 2 - _this.offsetLeft,
        y: _this.domRect.height / 2 - _this.offsetTop
      }, function () {
        _this.followParallax = null;
      });
    };

    _this.animEnd = function () {
      var type = _this.state.show ? 'enter' : 'leave';
      _this.props.callBack(type);
      _this.setState({ show: _this.props.show });
    };

    _this.animChildren = function (props, style, bgElem) {
      if (_this.tickerId) {
        _ticker2["default"].clear(_this.tickerId);
      }
      if (_this.delayTimeout) {
        _ticker2["default"].clear(_this.delayTimeout);
        _this.delayTimeout = null;
      }
      style.display = 'block';
      props.component = _this.props.component;
      _this.show = _this.state.show;
      style.zIndex = _this.state.show ? 1 : 0;
      props.children = _this.props.show && !_this.props.sync ? bgElem : _this.getChildren();
      var childrenToRender = _react2["default"].createElement(_rcTweenOne2["default"], props);
      var type = _this.state.show ? 'enter' : 'leave';
      return _this.props.animType(childrenToRender, type, _this.props.direction, {
        ease: _this.props.ease,
        duration: _this.props.duration,
        delay: _this.props.delay,
        onComplete: _this.animEnd
      }, _this.props.elemOffset, _this.props.hideProps);
    };

    _this.state = {
      show: _this.props.show
    };
    _this.tickerId = -1;
    _this.enterMouse = null;
    _this.delayTimeout = null;
    _this.show = _this.state.show;
    _this.followParallax = _this.props.followParallax;
    _this.transform = (0, _styleUtils.checkStyleName)('transform');
    return _this;
  }

  Element.prototype.componentDidMount = function componentDidMount() {
    this.dom = _reactDom2["default"].findDOMNode(this);
  };

  Element.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var show = nextProps.show;
    if (this.tickerId !== -1) {
      _ticker2["default"].clear(this.tickerId);
      this.tickerId = -1;
    }
    var followParallax = nextProps.followParallax;
    if (this.followParallax && !followParallax) {
      this.reFollowParallax();
    } else {
      this.followParallax = followParallax;
    }
    this.setState({ show: show });
  };

  Element.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.followParallax) {
      this.doms = this.followParallax.data.map(function (item) {
        return document.getElementById(item.id);
      });
    }
  };

  Element.prototype.componentWillUnmount = function componentWillUnmount() {
    _ticker2["default"].clear(this.timeoutID);
    _ticker2["default"].clear(this.delayTimeout);
    this.delayTimeout = -1;
    this.timeoutID = -1;
  };

  Element.prototype.render = function render() {
    var _this2 = this;

    var props = (0, _extends3["default"])({}, this.props);
    var style = (0, _extends3["default"])({}, props.style);
    style.display = props.show ? 'block' : 'none';
    style.position = 'absolute';
    style.width = '100%';
    props.style = style;
    props.className = ('banner-anim-elem ' + (this.props.prefixCls || '')).trim();
    var bgElem = (0, _utils.toArrayChildren)(this.props.children).filter(function (item) {
      return item.type === _BgElement2["default"];
    }).map(function (item) {
      return _react2["default"].cloneElement(item, { show: _this2.state.show });
    });
    ['prefixCls', 'callBack', 'animType', 'duration', 'delay', 'ease', 'elemOffset', 'followParallax', 'show', 'type', 'direction', 'hideProps', 'sync'].forEach(function (key) {
      return delete props[key];
    });
    if (this.show === this.state.show) {
      style[this.transform] = null;
      if (!this.state.show) {
        this.enterMouse = null;
        return _react2["default"].createElement(_rcTweenOne2["default"], props, bgElem);
      }
      if (this.props.followParallax) {
        props.onMouseMove = this.getFollowMouseMove();
      }
      return _react2["default"].createElement(_rcTweenOne2["default"], props, this.getChildren());
    }
    return this.animChildren(props, style, bgElem);
  };

  return Element;
}(_react.Component);

Element.propTypes = {
  children: _react.PropTypes.any,
  style: _react.PropTypes.object,
  prefixCls: _react.PropTypes.string,
  component: _react.PropTypes.any,
  elemOffset: _react.PropTypes.object,
  type: _react.PropTypes.string,
  animType: _react.PropTypes.func,
  ease: _react.PropTypes.string,
  duration: _react.PropTypes.number,
  delay: _react.PropTypes.number,
  direction: _react.PropTypes.string,
  callBack: _react.PropTypes.func,
  followParallax: _react.PropTypes.any,
  show: _react.PropTypes.bool,
  hideProps: _react.PropTypes.any,
  sync: _react.PropTypes.bool
};
Element.defaultProps = {
  component: 'div',
  callBack: noop
};

Element.BgElement = _BgElement2["default"];

exports["default"] = Element;
module.exports = exports['default'];