'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _utils = require('./utils');

var _animTypes = require('./animTypes');

var _animTypes2 = _interopRequireDefault(_animTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ease = {
  easeInElastic: function easeInElastic(_p, o, t) {
    var p = _p;
    var _p1 = o >= 1 ? o : 1;
    var _p2 = (t || 1) / (o < 1 ? o : 1);
    var _p3 = _p2 / Math.PI * 2 * (Math.asin(1 / _p1) || 0);
    return -(_p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - _p3) * _p2));
  },
  easeOutElastic: function easeOutElastic(p, o, t) {
    var _p1 = o >= 1 ? o : 1;
    var _p2 = (t || 1) / (o < 1 ? o : 1);
    var _p3 = _p2 / Math.PI * 2 * (Math.asin(1 / _p1) || 0);
    return _p1 * Math.pow(2, -10 * p) * Math.sin((p - _p3) * _p2) + 1;
  },
  easeInOutElastic: function easeInOutElastic(_p, o, t) {
    var p = _p;
    var _p1 = o >= 1 ? o : 1;
    var _p2 = (t || 1) / (o < 1 ? o : 1);
    var _p3 = _p2 / Math.PI * 2 * (Math.asin(1 / _p1) || 0);
    p *= 2;
    return p < 1 ? -0.5 * (_p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - _p3) * _p2)) : _p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - _p3) * _p2) * 0.5 + 1;
  },
  easeInBounce: function easeInBounce(_p) {
    var p = _p;
    var __p = 1 - p;
    if (__p < 1 / 2.75) {
      return 1 - 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
    } else if (p < 2.5 / 2.75) {
      return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
    }
    return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
  },
  easeOutBounce: function easeOutBounce(_p) {
    var p = _p;
    if (p < 1 / 2.75) {
      return 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    }
    return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
  },
  easeInOutBounce: function easeInOutBounce(_p) {
    var p = _p;
    var invert = p < 0.5;
    if (invert) {
      p = 1 - p * 2;
    } else {
      p = p * 2 - 1;
    }
    if (p < 1 / 2.75) {
      p = 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    } else {
      p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
    }
    return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
  }
};

var velocity = void 0;
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  // only load velocity on the client
  velocity = require('velocity-animate');
  Object.keys(_ease).forEach(function (key) {
    if (velocity.Easings) {
      velocity.Easings[key] = _ease[key];
    }
  });
} else {
  // provide a velocity stub for the server
  velocity = function velocityServerDummy() {
    var callback = arguments[arguments.length - 1];
    // call after stack flushes
    // in case you app depends on the asyncron nature of this function
    setImmediate(function () {
      return callback();
    });
  };
}

var BackEase = {
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55]
};

var placeholderKeyPrefix = 'ant-queue-anim-placeholder-';

var noop = function noop() {};

var QueueAnim = function (_React$Component) {
  (0, _inherits3["default"])(QueueAnim, _React$Component);

  function QueueAnim() {
    (0, _classCallCheck3["default"])(this, QueueAnim);

    var _this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.apply(this, arguments));

    _initialiseProps.call(_this);

    _this.keysToEnter = [];
    _this.keysToLeave = [];
    _this.keysAnimating = [];
    _this.placeholderTimeoutIds = {};

    // 第一次进入，默认进场
    var children = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this.props));
    var childrenShow = {};
    children.forEach(function (child) {
      if (!child || !child.key) {
        return;
      }
      if (_this.props.appear) {
        _this.keysToEnter.push(child.key);
      } else {
        childrenShow[child.key] = true;
      }
    });

    _this.originalChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this.props));

    _this.state = {
      children: children,
      childrenShow: childrenShow
    };
    return _this;
  }

  QueueAnim.prototype.componentDidMount = function componentDidMount() {
    if (this.props.appear) {
      this.componentDidUpdate();
    }
  };

  QueueAnim.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var nextChildren = (0, _utils.toArrayChildren)(nextProps.children);
    var currentChildren = this.originalChildren;
    var newChildren = (0, _utils.mergeChildren)(currentChildren, nextChildren);

    var childrenShow = !newChildren.length ? {} : this.state.childrenShow;
    // 在出场没结束时，childrenShow 里的值将不会清除。再触发进场时， childrenShow 里的值是保留着的, 设置了 enterForcedRePlay 将重新播放进场。
    this.keysToLeave.forEach(function (key) {
      // 将所有在出场里的停止掉。避免间隔性出现
      // 因为进场是用的间隔性进入，这里不做 stop 处理将会在这间隔里继续出场的动画。。
      var node = (0, _reactDom.findDOMNode)(_this2.refs[key]);
      velocity(node, 'stop');
      if (nextProps.enterForcedRePlay) {
        // 清掉所有出场的。
        delete childrenShow[key];
      }
    });

    this.keysToEnter = [];
    this.keysToLeave = [];
    this.keysAnimating = [];

    // need render to avoid update
    this.setState({
      childrenShow: childrenShow,
      children: newChildren
    });

    nextChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasPrev = (0, _utils.findChildInChildrenByKey)(currentChildren, key);
      if (!hasPrev && key) {
        _this2.keysToEnter.push(key);
      }
    });

    currentChildren.forEach(function (c) {
      if (!c) {
        return;
      }
      var key = c.key;
      var hasNext = (0, _utils.findChildInChildrenByKey)(nextChildren, key);
      if (!hasNext && key) {
        _this2.keysToLeave.push(key);
      }
    });
  };

  QueueAnim.prototype.componentDidUpdate = function componentDidUpdate() {
    this.originalChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(this.props));
    var keysToEnter = Array.prototype.slice.call(this.keysToEnter);
    var keysToLeave = Array.prototype.slice.call(this.keysToLeave);
    if (this.keysAnimating.length === 0) {
      this.keysAnimating = keysToEnter.concat(keysToLeave);
    }
    keysToEnter.forEach(this.performEnter);
    keysToLeave.forEach(this.performLeave);
  };

  QueueAnim.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    [].concat(this.keysToEnter, this.keysToLeave, this.keysAnimating).forEach(function (key) {
      return _this3.refs[key] && velocity((0, _reactDom.findDOMNode)(_this3.refs[key]), 'stop');
    });
    Object.keys(this.placeholderTimeoutIds).forEach(function (key) {
      clearTimeout(_this3.placeholderTimeoutIds[key]);
    });
    this.keysToEnter = [];
    this.keysToLeave = [];
    this.keysAnimating = [];
  };

  QueueAnim.prototype.render = function render() {
    var _this4 = this;

    var childrenToRender = (0, _utils.toArrayChildren)(this.state.children).map(function (child) {
      if (!child || !child.key) {
        return child;
      }
      return _this4.state.childrenShow[child.key] ? (0, _react.cloneElement)(child, {
        ref: child.key,
        key: child.key
      }) : (0, _react.createElement)('div', {
        ref: placeholderKeyPrefix + child.key,
        key: placeholderKeyPrefix + child.key
      });
    });
    var tagProps = (0, _objectWithoutProperties3["default"])(this.props, []);

    ['component', 'interval', 'duration', 'delay', 'type', 'animConfig', 'ease', 'leaveReverse', 'animatingClassName', 'enterForcedRePlay', 'onEnd', 'appear'].forEach(function (key) {
      return delete tagProps[key];
    });
    return (0, _react.createElement)(this.props.component, (0, _extends3["default"])({}, tagProps), childrenToRender);
  };

  return QueueAnim;
}(_react2["default"].Component);

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.getVelocityConfig = function (index) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (_this5.props.animConfig) {
      return _utils.transformArguments.apply(undefined, [_this5.props.animConfig].concat(args))[index];
    }
    return _animTypes2["default"][_utils.transformArguments.apply(undefined, [_this5.props.type].concat(args))[index]];
  };

  this.getVelocityEnterConfig = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _this5.getVelocityConfig.apply(_this5, [0].concat(args));
  };

  this.getVelocityLeaveConfig = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var config = _this5.getVelocityConfig.apply(_this5, [1].concat(args));
    var ret = {};
    Object.keys(config).forEach(function (key) {
      if (Array.isArray(config[key])) {
        ret[key] = Array.prototype.slice.call(config[key]).reverse();
      } else {
        ret[key] = config[key];
      }
    });
    return ret;
  };

  this.getVelocityEasing = function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _utils.transformArguments.apply(undefined, [_this5.props.ease].concat(args)).map(function (easeName) {
      if (typeof easeName === 'string') {
        return BackEase[easeName] || easeName;
      }
      return easeName;
    });
  };

  this.getInitAnimType = function (node, velocityConfig) {
    /*
     * enterForcedRePlay 为 false 时:
     * 强行结束后，获取当前 dom 里是否有 data 里的 key 值，
     * 如果有，出场开始启动为 dom 里的值
     * 而不是 animTypes 里的初始值，如果是初始值将会跳动。
     */
    var data = (0, _extends3["default"])({}, (0, _utils.assignChild)(velocityConfig));
    var transformsBase = velocity && velocity.prototype.constructor && velocity.prototype.constructor.CSS.Lists.transformsBase || [];
    var setPropertyValue = velocity && velocity.prototype.constructor && velocity.prototype.constructor.CSS.setPropertyValue || noop;
    var getUnitType = velocity && velocity.prototype.constructor && velocity.prototype.constructor.CSS.Values.getUnitType || noop;
    var nodeStyle = node.style;
    Object.keys(data).forEach(function (dataKey) {
      var cssName = dataKey;
      if (transformsBase.indexOf(dataKey) >= 0) {
        cssName = 'transform';
        var transformString = nodeStyle[(0, _utils.checkStyleName)(cssName)];
        if (transformString && transformString !== 'none') {
          if (transformString.match(dataKey)) {
            var rep = new RegExp('^.*' + dataKey + '\\(([^\\)]+?)\\).*', 'i');
            var transformData = transformString.replace(rep, '$1');
            data[dataKey][1] = parseFloat(transformData);
          }
        }
      } else if (nodeStyle[dataKey] && parseFloat(nodeStyle[dataKey])) {
        data[dataKey][1] = parseFloat(nodeStyle[dataKey]);
      }
      // 先把初始值设进 style 里。免得跳动；把下面的设置放到这里。
      setPropertyValue(node, cssName, '' + data[dataKey][1] + getUnitType(dataKey));
    });
    return data;
  };

  this.performEnter = function (key, i) {
    var interval = (0, _utils.transformArguments)(_this5.props.interval, key, i)[0];
    var delay = (0, _utils.transformArguments)(_this5.props.delay, key, i)[0];
    _this5.placeholderTimeoutIds[key] = setTimeout(_this5.performEnterBegin.bind(_this5, key, i), interval * i + delay);
    if (_this5.keysToEnter.indexOf(key) >= 0) {
      _this5.keysToEnter.splice(_this5.keysToEnter.indexOf(key), 1);
    }
  };

  this.performEnterBegin = function (key, i) {
    var childrenShow = _this5.state.childrenShow;
    childrenShow[key] = true;
    _this5.setState({ childrenShow: childrenShow }, _this5.realPerformEnter.bind(_this5, key, i));
  };

  this.realPerformEnter = function (key, i) {
    var node = (0, _reactDom.findDOMNode)(_this5.refs[key]);
    if (!node) {
      return;
    }
    var duration = (0, _utils.transformArguments)(_this5.props.duration, key, i)[0];
    velocity(node, 'stop');
    var data = _this5.props.enterForcedRePlay ? _this5.getVelocityEnterConfig(key, i) : _this5.getInitAnimType(node, _this5.getVelocityEnterConfig(key, i));
    if (_this5.props.enterForcedRePlay) {
      node.style.visibility = 'hidden';
    }
    velocity(node, data, {
      duration: duration,
      easing: _this5.getVelocityEasing(key, i)[0],
      visibility: 'visible',
      begin: _this5.enterBegin.bind(_this5, key),
      complete: _this5.enterComplete.bind(_this5, key)
    });
  };

  this.performLeave = function (key, i) {
    clearTimeout(_this5.placeholderTimeoutIds[key]);
    delete _this5.placeholderTimeoutIds[key];
    var node = (0, _reactDom.findDOMNode)(_this5.refs[key]);
    if (!node) {
      return;
    }
    var interval = (0, _utils.transformArguments)(_this5.props.interval, key, i)[1];
    var delay = (0, _utils.transformArguments)(_this5.props.delay, key, i)[1];
    var duration = (0, _utils.transformArguments)(_this5.props.duration, key, i)[1];
    var order = _this5.props.leaveReverse ? _this5.keysToLeave.length - i - 1 : i;
    velocity(node, 'stop');
    node.style.visibility = 'visible';
    var data = _this5.getInitAnimType(node, _this5.getVelocityLeaveConfig(key, i));
    velocity(node, data, {
      delay: interval * order + delay,
      duration: duration,
      easing: _this5.getVelocityEasing(key, i)[1],
      begin: _this5.leaveBegin.bind(_this5, key),
      complete: _this5.leaveComplete.bind(_this5, key)
    });
  };

  this.enterBegin = function (key, elements) {
    elements.forEach(function (elem) {
      var animatingClassName = _this5.props.animatingClassName;
      elem.className = elem.className.replace(animatingClassName[1], '');
      if (elem.className.indexOf(animatingClassName[0]) === -1) {
        elem.className += ' ' + animatingClassName[0];
      }
    });
  };

  this.enterComplete = function (key, elements) {
    if (_this5.keysAnimating.indexOf(key) >= 0) {
      _this5.keysAnimating.splice(_this5.keysAnimating.indexOf(key), 1);
    }
    elements.forEach(function (elem) {
      elem.className = elem.className.replace(_this5.props.animatingClassName[0], '').trim();
    });
    _this5.props.onEnd({ key: key, type: 'enter' });
  };

  this.leaveBegin = function (key, elements) {
    elements.forEach(function (elem) {
      var animatingClassName = _this5.props.animatingClassName;
      elem.className = elem.className.replace(animatingClassName[0], '');
      if (elem.className.indexOf(animatingClassName[1]) === -1) {
        elem.className += ' ' + animatingClassName[1];
      }
    });
  };

  this.leaveComplete = function (key, elements) {
    if (_this5.keysAnimating.indexOf(key) < 0) {
      return;
    }
    _this5.keysAnimating.splice(_this5.keysAnimating.indexOf(key), 1);
    var childrenShow = _this5.state.childrenShow;
    childrenShow[key] = false;
    if (_this5.keysToLeave.indexOf(key) >= 0) {
      _this5.keysToLeave.splice(_this5.keysToLeave.indexOf(key), 1);
    }
    var needLeave = _this5.keysToLeave.some(function (c) {
      return childrenShow[c];
    });
    if (!needLeave) {
      var currentChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(_this5.props));
      _this5.setState({
        children: currentChildren,
        childrenShow: childrenShow
      });
    }
    elements.forEach(function (elem) {
      elem.className = elem.className.replace(_this5.props.animatingClassName[1], '').trim();
    });
    _this5.props.onEnd({ key: key, type: 'leave' });
  };
};

QueueAnim.propTypes = {
  component: _react2["default"].PropTypes.any,
  interval: _react2["default"].PropTypes.any,
  duration: _react2["default"].PropTypes.any,
  delay: _react2["default"].PropTypes.any,
  type: _react2["default"].PropTypes.any,
  animConfig: _react2["default"].PropTypes.any,
  ease: _react2["default"].PropTypes.any,
  leaveReverse: _react2["default"].PropTypes.bool,
  enterForcedRePlay: _react2["default"].PropTypes.bool,
  animatingClassName: _react2["default"].PropTypes.array,
  onEnd: _react2["default"].PropTypes.func,
  appear: _react2["default"].PropTypes.bool
};

QueueAnim.defaultProps = {
  component: 'div',
  interval: 100,
  duration: 450,
  delay: 0,
  type: 'right',
  animConfig: null,
  ease: 'easeOutQuart',
  leaveReverse: false,
  enterForcedRePlay: false,
  animatingClassName: ['queue-anim-entering', 'queue-anim-leaving'],
  onEnd: noop,
  appear: true
};

exports["default"] = QueueAnim;
module.exports = exports['default'];