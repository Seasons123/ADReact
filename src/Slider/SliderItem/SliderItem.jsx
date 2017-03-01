import React, { Component } from 'react';

export default class SliderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if("fullScreen"==this.props.size) {
        let {count, item } = this.props;
        let width = 100 / count + '%';
        return (
            <li className="slider-item" style={{width: width}}>
              <img src={item.src} alt={item.alt}/>
            </li>
        );
    }

    if("size7"==this.props.size){
        let {count, item } = this.props;
        let width = 100 / count + '%';
        return (
            <li className="slider-item" style={{width: width}}>
              <img src={item.src} alt={item.alt}/>
            </li>
        );
    }
  }
}
