import React, { Component, PropTypes } from 'react';
import { toArrayChildren } from './utils';

class Thumb extends Component {
  constructor() {
    super(...arguments);
  }

  getDefaultThumb = () => {
    const children = [];
    for (let i = 0; i < this.props.length; i++) {
      children.push(<span key={i} />);
    }
    return children;
  }

  render() {
    let className = 'banner-anim-thumb';
    const defaultClass = `${className}-default`;
    className = `${className} ${this.props.prefixCls || ''}`.trim();
    className = !this.props.default ? className : `${className} ${defaultClass}`.trim();
    const children = this.props.default ? this.getDefaultThumb() : this.props.children;
    if (this.props.length && toArrayChildren(children).length !== this.props.length) {
      console.warn('The thumbnail length and the images length different.'); // eslint-disable-line
    }
    const childToRender = toArrayChildren(children).map((item, i) => {
      const props = { ...item.props };
      props.onClick = this.props.thumbClick.bind(this, i);
      props.className = `${props.className || ''} ${this.props.active === i ? 'active' : ''}`
        .trim();
      return React.cloneElement(item, props);
    });
    const props = { ...this.props };
    [`length`, `thumbClick`, `active`, 'default', 'component', 'prefixCls']
      .forEach(key => delete props[key]);
    props.className = className;
    return React.createElement(this.props.component,
      props,
      childToRender
    );
  }
}

Thumb.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  thumbClick: PropTypes.func,
  default: PropTypes.bool,
  length: PropTypes.number,
  active: PropTypes.number,
};
Thumb.defaultProps = {
  component: 'div',
  thumbClick: () => {
  },
};


export default Thumb;
