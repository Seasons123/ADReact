import React, { Component, PropTypes } from 'react';
import './css/banner.css';
import './css/banner-anim.css';

import BannerItem from './Animation/slider/BannerItem';
import BannerDots from './Animation/slider/BannerDots';
import BannerArrows from './Animation/slider/BannerArrows';

import QueueAnim from './Animation/QueueAnim/index';
import BannerAnim from './Animation/BannerAnim/index';
import TweenOne from './Animation/TweenOne/index';
const { Element } = BannerAnim;
const BgElement = Element.BgElement;

export default class Banner extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      nowLocal: 0,
      children: [
        <Element key="element1" prefixCls="banner-user-elem" >
          <BgElement key="bg" className="bg "
                     style={{
                         backgroundImage:'url(' + this.props.items[0].src + ')',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}
          />
          <div  className={this.props.items[0].textPosition} style={{color:this.props.items[0].textColor}}>
              <QueueAnim name="QueueAnim">
                <h1 key="h1">{this.props.items[0].textHeader}</h1>
                <p key="p">{this.props.items[0].textOne}</p>
              </QueueAnim>
              <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne2">
                  {this.props.items[0].textTwo}
              </TweenOne>
          </div>
        </Element>,
        <Element key="element2" prefixCls="banner-user-elem" >
          <BgElement key="bg" className="bg"
                     style={{
                         backgroundImage: 'url(' + this.props.items[1].src + ')',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}
          />
          <div  className={this.props.items[1].textPosition} style={{color: this.props.items[1].textColor}}>
              <QueueAnim name="QueueAnim">
                <h1 key="h1">{this.props.items[1].textHeader}</h1>
                <p key="p">{this.props.items[1].textOne}</p>
              </QueueAnim>
              <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne2">
                  {this.props.items[1].textTwo}
              </TweenOne>
          </div>
        </Element>
      ],
    };
    [].forEach((method) => this[method] = this[method].bind(this));
  }
    componentDidMount2() {
        const children = this.state.children;

        setTimeout(() => {
            children.push(
                <Element key="element3" prefixCls="banner-user-elem" >
                  <BgElement key="bg" className="bg"
                             style={{
                                 backgroundImage: 'url(' + this.props.items[2].src + ')',
                                 backgroundSize: 'cover',
                                 backgroundPosition: 'center',
                             }}
                  />
                  <div  className={this.props.items[2].textPosition} style={{color: this.props.items[2].textColor}}>
                      <QueueAnim name="QueueAnim" >
                        <h1 key="h1">{this.props.items[2].textHeader}</h1>
                        <p key="p">{this.props.items[2].textOne}</p>
                      </QueueAnim>
                      <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne2" >
                          {this.props.items[2].textTwo}
                      </TweenOne>
                  </div>
                </Element>
            );
            this.setState({
                children,
            });
        }, 2000);
    }





  /*old slider code start*/
  // 向前向后多少
  turn(n) {
    console.log();
    var _n = this.state.nowLocal + n;
    if(_n < 0) {
      _n = _n + this.props.items.length;
    }
    if(_n >= this.props.items.length) {
      _n = _n - this.props.items.length;
    }
    this.setState({nowLocal: _n});
  }
  // 开始自动轮播
  goPlay() {
    if(this.props.autoplay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1);
      }, this.props.delay * 1000);
    }
  }
  // 暂停自动轮播
  pausePlay() {
    clearInterval(this.autoPlayFlag);
  }
  componentDidMount() {
    if(this.props.animType =="Slider"){
        this.goPlay();
    }else{
        this.componentDidMount2();
    }

  }
  /*old slider code end*/

  render() {
    if(this.props.animType =="Slider"){
        let count = this.props.items.length;
        let nowLocal = this.state.nowLocal;

        let itemNodes = this.props.items.map((item, idx) => {
            return <BannerItem item={item} count={count}  nowLocal={nowLocal} key={'item' + idx} />;
        });

        let arrowsNode = <BannerArrows turn={this.turn.bind(this)}/>;

        let dotsNode = <BannerDots turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

        return (
            <div style={{ width:this.props.width, height:this.props.height,margin:'0 auto'}}>
              <div
                  className="slider"
                  onMouseOver={this.props.pause?this.pausePlay.bind(this):null} onMouseOut={this.props.pause?this.goPlay.bind(this):null}>
                <ul style={{
                    left: -100 * this.state.nowLocal + "%",
                    transitionDuration: this.props.speed + "s",
                    width: this.props.items.length * 100 + "%"
                }}>
                    {itemNodes}
                </ul>
                  {this.props.arrows?arrowsNode:null}
                  {this.props.dots?dotsNode:null}
              </div>
            </div>
        );
     }
    else{
        return (
            <div  style={{ width:this.props.width, height:this.props.height,margin:'0 auto'}}>
                <BannerAnim type={this.props.animType}>
                    {this.state.children}
                </BannerAnim>
            </div>
        );
    }
  }

}

Banner.defaultProps = {
    width:'1008px',
    height:'331px',
    speed: 1,
    delay: 2,
    pause: true,
    autoplay: true,
    dots: true,
    arrows: true,
    items: [],
    animType:"Slider"
};
Banner.autoPlayFlag = null;

