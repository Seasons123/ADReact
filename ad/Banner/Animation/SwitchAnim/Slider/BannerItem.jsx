import React, { Component } from 'react';
import OneTween from '../../../../LowLevelAnim/OneTween/index';
import '../../../css/BannerItem.css';

export default class BannerItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        let texts = [];
        let { count, item, nowLocal} = this.props;
        let width = 100 / count + '%';

        for(let i = 0; i < count; i++) {
              if(i === this.props.nowLocal){
                  texts[i] = (
                      <div key={'text' + i} className={item.textPosition} style={{color: item.textColor}}>
                          <OneTween animation={{x: 100, opacity: 0, type: 'from', delay: 200}} name="OneTween">
                              <h1>{item.textHeader}</h1>
                          </OneTween>
                          <OneTween animation={{y: 50, opacity: 0, type: 'from', delay: 200}} name="OneTween">
                              <p>{item.textOne}</p>
                              {item.textTwo}
                          </OneTween>
                      </div>
                  )
              }
        }

        return (
            <li className="slider-item" style={{width: width}}>
              {texts}
              <img src={item.src} alt={item.alt}/>
            </li>
        );
}
}
