'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.toArrayChildren = toArrayChildren;
exports.findChildInChildrenByKey = findChildInChildrenByKey;
exports.mergeChildren = mergeChildren;
exports.transformArguments = transformArguments;
exports.getChildrenFromProps = getChildrenFromProps;
exports.assignChild = assignChild;
exports.checkStyleName = checkStyleName;

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

function findChildInChildrenByKey(children, key) {
  var ret = null;
  if (children) {
    children.forEach(function (c) {
      if (ret || !c) {
        return;
      }
      if (c.key === key) {
        ret = c;
      }
    });
  }
  return ret;
}

function mergeChildren(prev, next) {
  var ret = [];
  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextChildrenPending = {};
  var pendingChildren = [];
  var followChildrenKey = void 0;
  prev.forEach(function (c) {
    if (!c) {
      return;
    }
    if (findChildInChildrenByKey(next, c.key)) {
      if (pendingChildren.length) {
        nextChildrenPending[c.key] = pendingChildren;
        pendingChildren = [];
      }
      followChildrenKey = c.key;
    } else if (c.key) {
      pendingChildren.push(c);
    }
  });
  if (!followChildrenKey) {
    ret = ret.concat(pendingChildren);
  }
  next.forEach(function (c) {
    if (!c) {
      return;
    }
    if (nextChildrenPending.hasOwnProperty(c.key)) {
      ret = ret.concat(nextChildrenPending[c.key]);
    }
    ret.push(c);
    if (c.key === followChildrenKey) {
      ret = ret.concat(pendingChildren);
    }
  });

  return ret;
}

function transformArguments(arg, key, i) {
  var result = void 0;
  if (typeof arg === 'function') {
    result = arg({
      key: key,
      index: i
    });
  } else {
    result = arg;
  }
  if (Array.isArray(result) && result.length === 2) {
    return result;
  }
  return [result, result];
}

function getChildrenFromProps(props) {
  return props && props.children;
}

function assignChild(data) {
  var obj = {};
  Object.keys(data).forEach(function (key) {
    if (Array.isArray(data[key])) {
      obj[key] = [].concat(data[key]);
      return;
    } else if ((0, _typeof3["default"])(data[key]) === 'object') {
      obj[key] = (0, _extends3["default"])({}, data[key]);
      return;
    }
    obj[key] = data[key];
    return;
  });
  return obj;
}

function checkStyleName(p) {
  var a = ['O', 'Moz', 'ms', 'Ms', 'Webkit'];
  if (p !== 'filter' && p in document.body.style) {
    return p;
  }
  var _p = p.charAt(0).toUpperCase() + p.substr(1);
  return '' + (a.filter(function (key) {
    return '' + key + _p in document.body.style;
  })[0] || '') + _p;
}