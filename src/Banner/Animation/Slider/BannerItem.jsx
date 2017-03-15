import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import '../../css/BannerItem.css';

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
                          <TweenOne animation={{x: 100, opacity: 0, type: 'from', delay: 200}} name="TweenOne">
                              <h1>{item.textHeader}</h1>
                          </TweenOne>
                          <TweenOne animation={{y: 50, opacity: 0, type: 'from', delay: 200}} name="TweenOne">
                              <p>{item.textOne}</p>
                              {item.textTwo}
                          </TweenOne>
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
