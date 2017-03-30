import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { dataToArray, objectEqual } from './util';
import { stylesToCss } from 'style-utils';
import TimeLine from './TimeLine';
import plugins from './plugins';
import ticker from './ticker';

function noop() {
}

const perFrame = Math.round(1000 / 60);

class TweenOne extends Component {
  constructor() {
    super(...arguments);
    this.rafID = -1;
    this.moment = this.props.moment || 0;
    this.startMoment = this.props.moment || 0;
    this.startFrame = ticker.frame;
    this.paused = this.props.paused;
    this.reverse = this.props.reverse;
    this.onChange = this.props.onChange;
    this.newMomentAnim = false;
    this.updateAnim = null;
  }

  componentDidMount() {
    this.dom = ReactDom.findDOMNode(this);
    this.start();
  }









  start = () => {
    this.updateAnim = null;
    const props = this.props;
    if (props.animation && Object.keys(props.animation).length) {
      this.timeLine = new TimeLine(this.dom, dataToArray(props.animation),
        { attr: props.attr, willChange: props.willChange });
      // 预先注册 raf, 初始动画数值。
      this.raf();
      // 开始动画
      this.play();
    }
  }

  play = () => {
    this.cancelRequestAnimationFrame();
    if (this.paused) {
      return;
    }
    this.rafID = ticker.add(this.raf);
  }



  frame = () => {
    let moment = (ticker.frame - this.startFrame) * perFrame + this.startMoment;
    if (this.reverse) {
      moment = (this.startMoment || 0) - (ticker.frame - this.startFrame) * perFrame;
    }
    moment = moment > this.timeLine.totalTime ? this.timeLine.totalTime : moment;
    moment = moment <= 0 ? 0 : moment;
    if (moment < this.moment && !this.reverse) {
      this.timeLine.resetDefaultStyle();
    }
    this.moment = moment;
    this.timeLine.onChange = this.onChange;
    this.timeLine.frame(moment);
  }

  raf = () => {
    this.frame();
    if (this.updateAnim) {
      if (this.updateStartStyle) {
        this.timeLine.reStart(this.props.style);
      }
      this.updateAnimFunc();
      this.start();
    }
    if ((this.moment >= this.timeLine.totalTime && !this.reverse)
      || this.paused || (this.reverse && this.moment === 0)) {
      return this.cancelRequestAnimationFrame();
    }
  }

  cancelRequestAnimationFrame = () => {
    ticker.clear(this.rafID);
    this.rafID = -1;
  }

  render() {
    const props = { ...this.props };
    [
      'animation',
      'component',
      'reverseDelay',
      'attr',
      'paused',
      'reverse',
      'moment',
      'resetStyleBool',
      'updateReStart',
      'willChange',
    ].forEach(key => delete props[key]);
    props.style = { ...this.props.style };
    Object.keys(props.style).forEach(p => {
      if (p.match(/filter/i)) {
        ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix =>
          props.style[`${prefix}Filter`] = props.style[p]);
      }
    });
    props.component = typeof props.component === 'function' ?
      this.props.componentReplace : props.component;
    if (!props.component) {
      delete props.component;
    }
    return React.createElement(this.props.component, props);
  }
}

const objectOrArray = PropTypes.oneOfType([PropTypes.object, PropTypes.array]);

TweenOne.propTypes = {
  component: PropTypes.any,
  componentReplace: PropTypes.string,
  animation: objectOrArray,
  children: PropTypes.any,
  style: PropTypes.object,
  paused: PropTypes.bool,
  reverse: PropTypes.bool,
  reverseDelay: PropTypes.number,
  moment: PropTypes.number,
  attr: PropTypes.string,
  willChange: PropTypes.bool,
  onChange: PropTypes.func,
  resetStyleBool: PropTypes.bool,
  updateReStart: PropTypes.bool,
};

TweenOne.defaultProps = {
  component: 'div',
  reverseDelay: 0,
  attr: 'style',
  onChange: noop,
  willChange: true,
  updateReStart: true,
};
TweenOne.plugins = plugins;
export default TweenOne;
