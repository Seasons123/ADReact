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

var _styleUtils = require('style-utils');

var _utils = require('./utils');

var _anim = require('./anim');

var _anim2 = _interopRequireDefault(_anim);

var _TimeLine = require('../TweenOne/TimeLine');

var _TimeLine2 = _interopRequireDefault(_TimeLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BgElement = function (_React$Component) {
  (0, _inherits3["default"])(BgElement, _React$Component);

  function BgElement() {
    (0, _classCallCheck3["default"])(this, BgElement);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));

    _this.onScroll = function () {
      var scrollTop = (0, _utils.currentScrollTop)();
      var domRect = _this.dom.parentNode.getBoundingClientRect();
      var offsetTop = domRect.top + scrollTop;
      var height = Math.max(domRect.height, (0, _utils.windowHeight)());
      var elementShowHeight = scrollTop - offsetTop + height;
      var scale = elementShowHeight / (height + domRect.height);
      scale = scale || 0;
      scale = scale >= 1 ? 1 : scale;
      _this.timeLine.frame(scale * _this.scrollParallaxDuration);
    };

    _this.onResize = function () {
      var domRect = _this.dom.getBoundingClientRect();
      var videoDomRect = _this.video.getBoundingClientRect();
      _this.videoLoad = true;
      var scale = void 0;
      var videoRect = {
        display: 'block',
        position: 'relative',
        top: 0,
        left: 0
      };
      if (domRect.width / domRect.height > videoDomRect.width / videoDomRect.height) {
        scale = domRect.width / videoDomRect.width;
        videoRect.width = domRect.width;
        videoRect.height = videoDomRect.height * scale;
        videoRect.top = -(videoRect.height - domRect.height) / 2;
      } else {
        scale = domRect.height / videoDomRect.height;
        videoRect.height = domRect.height;
        videoRect.width = videoDomRect.width * scale;
        videoRect.left = -(videoRect.width - domRect.width) / 2;
      }
      Object.keys(videoRect).forEach(function (key) {
        _this.video.style[key] = (0, _styleUtils.stylesToCss)(key, videoRect[key]);
      });
    };

    _this.videoLoadedData = function () {
      _this.onResize();
      if (window.addEventListener) {
        window.addEventListener('resize', _this.onResize);
      } else {
        window.attachEvent('onresize', _this.onResize);
      }
    };

    _this.isVideo = (0, _utils.toArrayChildren)(_this.props.children).filter(function (item) {
      return item.type === 'video';
    });
    if (_this.isVideo.length) {
      // 如果是 video，删除 grid 系列，位置发生变化，重加载了 video;
      delete _anim2["default"].grid;
      delete _anim2["default"].gridBar;
    }
    if (_this.props.scrollParallax) {
      _this.scrollParallaxDuration = _this.props.scrollParallax.duration || 450;
    }
    _this.video = null;
    _this.videoLoad = false;
    return _this;
  }

  BgElement.prototype.componentDidMount = function componentDidMount() {
    this.dom = _reactDom2["default"].findDOMNode(this);
    if (!this.videoLoad) {
      this.video = _reactDom2["default"].findDOMNode(this.refs.video);
      if (this.video && this.props.videoResize) {
        this.video.onloadeddata = this.videoLoadedData;
      }
    }
    if (this.props.scrollParallax) {
      this.timeLine = new _TimeLine2["default"](this.dom, [(0, _extends3["default"])({
        ease: 'linear' }, this.props.scrollParallax)], { attr: 'style' });
      this.timeLine.frame(0);
      this.onScroll();
      if (window.addEventListener) {
        window.addEventListener('scroll', this.onScroll);
      } else {
        window.attachEvent('onscroll', this.onScroll);
      }
    }
  };

  BgElement.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      if (this.video && this.props.videoResize && this.videoLoad) {
        this.videoLoadedData();
      }
      if (this.props.scrollParallax) {
        this.onScroll();
      }
    } else {
      this.componentWillUnmount();
    }
  };

  BgElement.prototype.componentWillUnmount = function componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onScroll);
    } else {
      window.detachEvent('onresize', this.onResize);
      window.detachEvent('onscroll', this.onScroll);
    }
  };

  BgElement.prototype.render = function render() {
    var props = (0, _extends3["default"])({}, this.props);
    ['videoResize', 'scrollParallax', 'scrollParallaxDuration', 'show', 'component'].forEach(function (key) {
      return delete props[key];
    });
    if (this.isVideo && this.props.videoResize) {
      props.children = (0, _utils.toArrayChildren)(props.children).map(function (item) {
        var ref = item.type === 'video' ? 'video' : null;
        return _react2["default"].cloneElement(item, (0, _extends3["default"])({}, item.props, { ref: ref }));
      });
    }
    return _react2["default"].createElement(this.props.component, props);
  };

  return BgElement;
}(_react2["default"].Component);

exports["default"] = BgElement;


BgElement.propTypes = {
  className: _react2["default"].PropTypes.string,
  style: _react2["default"].PropTypes.object,
  children: _react2["default"].PropTypes.any,
  component: _react2["default"].PropTypes.any,
  videoResize: _react2["default"].PropTypes.bool,
  scrollParallax: _react2["default"].PropTypes.object,
  show: _react2["default"].PropTypes.bool
};

BgElement.defaultProps = {
  component: 'div',
  videoResize: true
};
module.exports = exports['default'];