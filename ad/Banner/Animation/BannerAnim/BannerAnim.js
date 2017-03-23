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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

var _Thumb = require('./Thumb');

var _Thumb2 = _interopRequireDefault(_Thumb);

var _ticker = require('../TweenOne/ticker');

var _ticker2 = _interopRequireDefault(_ticker);

var _utils = require('./utils');

var _anim = require('./anim');

var _anim2 = _interopRequireDefault(_anim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BannerAnim = function (_Component) {
  (0, _inherits3["default"])(BannerAnim, _Component);

  function BannerAnim() {
    (0, _classCallCheck3["default"])(this, BannerAnim);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));

    _this.onMouseEnter = function () {
      _this.props.onMouseEnter();
      if (_this.props.autoPlay) {
        _ticker2["default"].clear(_this.autoPlayId);
      }
    };

    _this.onMouseLeave = function () {
      _this.props.onMouseLeave();
      if (_this.props.autoPlay) {
        _this.autoPlay();
      }
    };

    _this.onTouchStart = function (e) {
      _this.mouseXY = {
        startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
        startY: e.touches === undefined ? e.clientY : e.touches[0].clientY
      };
    };

    _this.onTouchMove = function (e) {
      if (!_this.mouseXY) {
        return;
      }
      _this.mouseXY.currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
      _this.mouseXY.currentY = e.touches === undefined ? e.clientY : e.touches[0].clientY;
    };

    _this.onTouchEnd = function () {
      if (!_this.mouseXY) {
        return;
      }
      var differX = _this.mouseXY.currentX - _this.mouseXY.startX;
      var differY = _this.mouseXY.currentY - _this.mouseXY.startY;
      var r = Math.atan2(differY, differX);
      var angle = Math.round(r * 180 / Math.PI);
      angle = angle < 0 ? 360 - Math.abs(angle) : angle;
      if ((angle >= 0 && angle <= 45 || angle >= 315) && differX > _this.state.domRect.width * 0.1) {
        _this.prev();
      } else if (angle >= 135 && angle <= 225 && differX < -_this.state.domRect.width * 0.1) {
        _this.next();
      }
      delete _this.mouseXY;
    };

    _this.getRenderChildren = function (children) {
      var elem = [];
      var arrow = [];
      var thumb = void 0;

      var _animType = _this.getAnimType(_this.props.type);
      (0, _utils.toArrayChildren)(children).forEach(function (item, i) {
        if (!item.key) {
          throw new Error('Please add key, key is required');
        }
        var itemProps = (0, _extends3["default"])({}, item.props);
        switch (item.type) {
          case _Element2["default"]:
            itemProps.key = item.key;
            itemProps.callBack = _this.animEnd;
            itemProps.show = _this.state.currentShow === i;
            itemProps.animType = _animType;
            itemProps.duration = _this.props.duration;
            itemProps.delay = _this.props.delay;
            itemProps.ease = _this.props.ease;
            itemProps.sync = _this.props.sync;
            itemProps.elemOffset = {
              top: _this.state.domRect.top,
              width: _this.state.domRect.width,
              height: _this.state.wrapperHeight
            };
            itemProps.direction = _this.state.direction;
            elem.push(_react2["default"].cloneElement(item, itemProps));
            break;
          case _Arrow2["default"]:
            itemProps.next = _this.next;
            itemProps.prev = _this.prev;
            itemProps.elemHeight = _this.state.wrapperHeight;
            arrow.push(_react2["default"].cloneElement(item, itemProps));
            break;
          case _Thumb2["default"]:
            itemProps.thumbClick = _this.slickGoTo;
            itemProps.active = _this.state.currentShow;
            thumb = _react2["default"].cloneElement(item, itemProps);
            break;
          default:
            break;
        }
      });
      if (elem.length > 1) {
        if (!arrow.length && _this.props.arrow) {
          arrow.push(_react2["default"].createElement(_Arrow2["default"], { arrowType: 'prev', key: 'arrowPrev', next: _this.next, prev: _this.prev, 'default': true,
            elemHeight: _this.state.wrapperHeight
          }), _react2["default"].createElement(_Arrow2["default"], { arrowType: 'next', key: 'arrowNext', next: _this.next, prev: _this.prev, 'default': true,
            elemHeight: _this.state.wrapperHeight
          }));
        }
        if (!thumb && _this.props.thumb) {
          thumb = _react2["default"].createElement(_Thumb2["default"], { length: elem.length, key: 'thumb',
            thumbClick: _this.slickGoTo,
            active: _this.state.currentShow,
            'default': true
          });
        }
      }
      _this.elemWrapper = elem;
      return elem.concat(arrow, thumb);
    };

    _this.getDomDataSetToState = function () {
      _this.dom = _reactDom2["default"].findDOMNode(_this);
      var domRect = _this.dom.getBoundingClientRect();
      // 获取宽度与定位，setState刷新；
      var wrapperHeight = _this.getElementHeight(_this.dom.getElementsByClassName('banner-anim-elem'));
      _this.setState({
        wrapperHeight: wrapperHeight,
        domRect: domRect
      });
      _this.tweenBool = false;
    };

    _this.getElementHeight = function (children) {
      var height = 0;
      for (var i = 0; i < children.length; i++) {
        var dom = children[i];
        var _height = dom.getBoundingClientRect().height;
        height = height > _height ? height : _height;
      }
      return height;
    };

    _this.getAnimType = function (type) {
      var typeArray = type ? (0, _utils.dataToArray)(type) : Object.keys(_anim2["default"]);
      var random = Math.round(Math.random() * (typeArray.length - 1));
      return _anim2["default"][typeArray[random]];
    };

    _this.autoPlay = function () {
      _this.autoPlayId = _ticker2["default"].interval(_this.next, _this.props.autoPlaySpeed);
    };

    _this.animTweenStart = function (show, type) {
      _this.props.onChange('before', show);
      _this.setState({
        currentShow: show,
        direction: type
      });
    };

    _this.animEnd = function (type) {
      if (type === 'enter') {
        _this.tweenBool = false;
        _this.props.onChange('after', _this.state.currentShow);
      }
    };

    _this.next = function () {
      if (!_this.tweenBool) {
        _this.tweenBool = true;
        var newShow = _this.state.currentShow;
        newShow++;
        if (newShow >= _this.elemWrapper.length) {
          newShow = 0;
        }
        _this.animTweenStart(newShow, 'next');
      }
    };

    _this.prev = function () {
      if (!_this.tweenBool) {
        _this.tweenBool = true;
        var newShow = _this.state.currentShow;
        newShow--;
        if (newShow < 0) {
          newShow = _this.elemWrapper.length - 1;
        }
        _this.animTweenStart(newShow, 'prev');
      }
    };

    _this.slickGoTo = function (i) {
      if (!_this.tweenBool && i !== _this.state.currentShow) {
        _this.tweenBool = true;
        var type = i > _this.state.currentShow ? 'next' : 'prev';
        _this.animTweenStart(i, type);
      }
    };

    _this.state = {
      currentShow: _this.props.initShow,
      direction: null,
      wrapperHeight: 0,
      domRect: {}
    };
    _this.tweenBool = false;
    return _this;
  }

  BannerAnim.prototype.componentDidMount = function componentDidMount() {
    this.getDomDataSetToState();
    if (window.addEventListener) {
      window.addEventListener('resize', this.getDomDataSetToState);
    } else {
      window.attachEvent('onresize', this.getDomDataSetToState);
    }
    if (this.props.autoPlay) {
      this.autoPlay();
    }
  };

  BannerAnim.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this.tweenBool = false;
  };

  BannerAnim.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.autoPlayId) {
      _ticker2["default"].clear(this.autoPlayId);
    }
    if (window.addEventListener) {
      window.removeEventListener('resize', this.getDomDataSetToState);
    } else {
      window.detachEvent('onresize', this.getDomDataSetToState);
    }
  };

  BannerAnim.prototype.render = function render() {
    var prefixCls = this.props.prefixCls;
    var props = (0, _extends3["default"])({}, this.props);
    ['prefixCls', 'component', 'initShow', 'duration', 'delay', 'ease', 'arrow', 'thumb', 'autoPlaySpeed', 'autoPlay', 'thumbFloat', 'sync', 'dragPlay'].forEach(function (key) {
      return delete props[key];
    });
    var childrenToRender = this.getRenderChildren(props.children);
    props.className = (props.className + ' ' + (prefixCls || '')).trim();
    props.style = (0, _extends3["default"])({}, props.style);
    if (childrenToRender.length > 1 && this.props.dragPlay) {
      props.onMouseEnter = this.onMouseEnter;
      props.onMouseLeave = this.onMouseLeave;
      props.onTouchStart = this.onTouchStart;
      props.onMouseDown = this.onTouchStart;
      props.onTouchMove = this.onTouchMove;
      props.onMouseMove = this.onTouchMove;
      props.onTouchEnd = this.onTouchEnd;
      props.onMouseUp = this.onTouchEnd;
    }
    return _react2["default"].createElement(this.props.component, props, childrenToRender);
  };

  return BannerAnim;
}(_react.Component);

var stringOrArray = _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.string]);
BannerAnim.propTypes = {
  children: _react.PropTypes.any,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  prefixCls: _react.PropTypes.string,
  component: _react.PropTypes.any,
  arrow: _react.PropTypes.bool,
  thumb: _react.PropTypes.bool,
  initShow: _react.PropTypes.number,
  type: stringOrArray,
  duration: _react.PropTypes.number,
  delay: _react.PropTypes.number,
  ease: _react.PropTypes.string,
  autoPlay: _react.PropTypes.bool,
  autoPlaySpeed: _react.PropTypes.number,
  onChange: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  sync: _react.PropTypes.bool,
  dragPlay: _react.PropTypes.bool
};
BannerAnim.defaultProps = {
  component: 'div',
  className: 'banner-anim',
  initShow: 0,
  duration: 450,
  delay: 0,
  ease: 'easeInOutQuad',
  arrow: true,
  thumb: true,
  autoPlaySpeed: 5000,
  dragPlay: true,
  onChange: function onChange() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {}
};
BannerAnim.Arrow = _Arrow2["default"];
BannerAnim.Element = _Element2["default"];
BannerAnim.Thumb = _Thumb2["default"];
BannerAnim.animType = _anim2["default"];
BannerAnim.setAnimCompToTagComp = _utils.setAnimCompToTagComp;
BannerAnim.switchChildren = _utils.switchChildren;
exports["default"] = BannerAnim;
module.exports = exports['default'];