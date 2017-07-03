import React, { Component, PropTypes } from 'react';
/*import  enquire from 'enquire';*/
import '../../css/banner.css';
import '../../css/banner-anim.css';
import '../../css/fullScreenAnim/antMotion_style.css';

import QueueAnim from '../../../LowLevelAnim/QueueAnim/QueueAnim';
import BannerAnim from '../BannerAnim/BannerAnim';
import TopNav from '../../../modules/TopNav/TopNav';
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class FullScreenAnim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMode: false,
      children: [
          <Element key="element1" prefixCls="banner-user-elem" >
            <BgElement key="bg" className="bg "
                       style={{
                           backgroundImage:'url(' + this.props.data.items[0].src + ')',
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                       }}
            />

          </Element>,
          <Element key="element2" prefixCls="banner-user-elem" >
            <BgElement key="bg" className="bg"
                       style={{
                           backgroundImage: 'url(' + this.props.data.items[1].src + ')',
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                       }}
            />
            <div  className={this.props.data.items[1].textPosition} style={{color: this.props.data.items[1].textColor}}>
              <QueueAnim name="QueueAnim">
                <h1 key="h1">{this.props.data.items[1].textHeader}</h1>
              </QueueAnim>
              <QueueAnim name="QueueAnim" type="bottom">
                <p key="p1">{this.props.data.items[1].textOne}</p>
                <p key="p2">{this.props.data.items[1].textTwo}</p>
              </QueueAnim>
            </div>
          </Element>,
          <Element key="element3" prefixCls="banner-user-elem" >
            <BgElement key="bg" className="bg"
                       style={{
                           backgroundImage: 'url(' + this.props.data.items[2].src + ')',
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                       }}
            />
            <div  className={this.props.data.items[2].textPosition} style={{color: this.props.data.items[2].textColor}}>
              <QueueAnim name="QueueAnim">
                <h1 key="h1">{this.props.data.items[2].textHeader}</h1>
              </QueueAnim>
              <QueueAnim name="QueueAnim" type="bottom">
                <p key="p1">{this.props.data.items[2].textOne}</p>
                <p key="p2">{this.props.data.items[2].textTwo}</p>
              </QueueAnim>
            </div>
          </Element>
        ]
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
   /* this.enquireScreen((isMode) => {
      this.setState({ isMode });
    });*/
  }

  enquireScreen = (cb) => {
    /* eslint-disable no-unused-expressions */
    enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
      match: () => {
        cb && cb(true);
      },
      unmatch: () => {
        cb && cb();
      },
    });
    /* eslint-enable no-unused-expressions */
  }

  render() {
      return (
          <div>
              <TopNav>
              </TopNav>
              <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto',position:'absolute'}}>
                <BannerAnim type="across"
                            delay={this.props.data.delay}
                            duration={this.props.data.duration}
                            autoPlaySpeed={this.props.data.autoPlaySpeed}
                            autoPlay={this.props.data.autoPlay}
                            pause={this.props.data.pause}
                            arrow={this.props.data.arrow}
                            thumb={this.props.data.thumb}>
                    {this.state.children}

                </BannerAnim>

              </div>
          </div>
      );
  }
}
