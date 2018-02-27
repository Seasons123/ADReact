import React, { Component } from 'react';
import SingleAnim from '../../../../LowLevelAnim/SingleAnim/index';
import '../../../css/fade/FadeItem.css';

export default class BannerItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        let li = [];
        let { count, item, nowLocal} = this.props;


        for(let i = 0; i < count; i++) {
              if(i === nowLocal){
                  li[i]=(
                      <li className='fade'>
                          <div key={'text' + i} className={item.textPosition} style={{color: item.textColor}}>
                              <SingleAnim animation={{x: 100, opacity: 0, type: 'from', delay: 200}} name="SingleAnim">
                                  <h1>{item.textHeader}</h1>
                              </SingleAnim>
                              <SingleAnim animation={{y: 50, opacity: 0, type: 'from', delay: 200}} name="SingleAnim">
                                  <p>{item.textOne}</p>
                                  {item.textTwo}
                              </SingleAnim>
                          </div>
                          <SingleAnim animation={{x: 100, opacity: 0, type: 'from', delay: 200}} name="SingleAnim">
                              <img src={item.src} alt={item.alt}/>
                          </SingleAnim>

                      </li>
                )
              }
              else{
                  li[i]=(
                      <li className='fade'>
                              <img src={item.src} alt={item.alt} style={{opacity:0}}/>
                      </li>
                  )
              }
        }

        return (
              {li}
        );
}
}
