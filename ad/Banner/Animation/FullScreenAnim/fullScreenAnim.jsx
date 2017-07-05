import React, { Component, PropTypes } from 'react';
/*import  enquire from 'enquire';*/
import '../../css/banner.css';
import '../../css/banner-anim.css';
import '../../css/fullScreenAnim/antMotion_style.css';

import QueueAnim from '../../../LowLevelAnim/QueueAnim/QueueAnim';
import OneTween from '../../../LowLevelAnim/OneTween/OneTween';
import BannerAnim from '../BannerAnim/BannerAnim';
import TopNav from '../../../modules/TopNav/TopNav';
const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class FullScreenAnim extends React.Component {
   constructor() {
    super(...arguments);
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;
    const animType = {
          queue: isMode ? 'bottom' : 'right',
          one: isMode ? { y: '+=30', opacity: 0, type: 'from' }
              : { x: '-=30', opacity: 0, type: 'from' },
          two: isMode ? { y: '-=30', opacity: 0, type: 'from' }
            : { x: '+=30', opacity: 0, type: 'from' },
      };
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
              <div id="content_0_0" className="banner0">
                      <QueueAnim
                          type={['bottom', 'top']}
                          delay={200}
                          className="banner0-wrapper"
                          key="text"
                          id="content_0_0-wrapper"
                      >
                          <span
                              className="title"
                              key="title"
                              id="content_0_0-title"
                          >
                            <img width="100%" src={this.props.data.items[5].src} />
                          </span>
                          <p key="content" id="content_0_0-content">
                              这个夏天 加入我们吧！
                          </p>
                          <p key="p_0_1" id="content_0_1-content" style={{color:'#666',fontSize:'14px'}}>
                              运动热体育携手山东体育学院举行 “羽毛球夏令营” ，让孩子们感受到大学校园的氛围是我们的初衷，让孩子们快速的提高羽毛球技战术水平是我们的目标，让孩子们学会独立、学会拼搏是我们的希望！
                          </p>

                      </QueueAnim>
                      <OneTween
                          animation={{ y: '-=20', yoyo: true, repeat: -1, duration: 1000 }}
                          className="banner0-icon"
                          key="icon"
                      >
                          <span  key="button" id="content_0_0-button" style={{color:'#1dc282'}}>
                              报名
                          </span>
                      </OneTween>
              </div>
          </Element>,
          <Element key="element3" prefixCls="banner-user-elem" >
              <BgElement key="bg3" className="bg "
                         style={{
                             backgroundImage:'url(' + this.props.data.items[2].src + ')',
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                         }}
              />
              <div id="content_2_0" className="content-template-wrapper content-half-wrapper content0-wrapper">
                  <div className="content-template content0">
                      <OneTween
                          key="img0"
                          animation={animType.one}
                          className="content0-img"
                          id="content_2_0-imgWrapper"
                          resetStyleBool
                      >
                         <span id="content_2_0-img" style={{marginTop:'15%'}}>
                            <img width="100%"  src={this.props.data.items[3].src} />
                         </span>
                      </OneTween>
                      <QueueAnim
                          className="content0-text"
                          type={animType.queue}
                          key="text0"
                          leaveReverse
                          ease={['easeOutCubic', 'easeInCubic']}
                          id="content_2_0-textWrapper"
                      >
                          <h1 key="h_2_0" id="content_2_0-title" style={{color:'#333',fontSize:'18px'}}>
                              夏令营时间
                          </h1>
                          <p key="p_2_0" id="content_2_0-content" style={{color:'#666',fontSize:'14px'}}>
                              第一期：7月03日—7月12日（已报满）
                          </p>
                          <p key="p_2_1" id="content_2_1-content" style={{color:'#666',fontSize:'14px'}}>
                              第二期：7月17日—7月26日（招生中……）
                          </p>
                          <p key="p_2_2" id="content_2_2-content" style={{color:'#666',fontSize:'14px'}}>
                              第三期：7月31日—8月09日（招生中……）
                          </p>
                          <p key="p_2_3" id="content_2_3-content" style={{color:'#666',fontSize:'14px'}}>
                              第四期：8月14日—8月23日（招生中……）
                          </p>
                          <p key="p_2_4" id="content_2_4-content" style={{color:'#666',fontSize:'14px'}}>
                              7:00-8:00早饭
                          </p>
                          <p key="p_2_5" id="content_2_5-content" style={{color:'#666',fontSize:'14px'}}>
                              8:40-11:40训练馆训练
                          </p>
                          <OneTween
                              animation={{ x: '+=20', yoyo: true, repeat: -1, duration: 1000 }}
                              className="banner1-icon"
                              key="icon1"
                          >
                              <a href="https://github.com" key="button1" id="content_0_1-button" style={{ cursor:'pointer',color:'#333',fontSize:'18px',fontWeight:'wight',textDecoration:'none'}}>点击报名</a>
                          </OneTween>
                      </QueueAnim>

                  </div>
              </div>
              <div id="content_3_0" className="content-template-wrapper content-half-wrapper content1-wrapper">
                  <div className="content-template content1">
                      <QueueAnim
                          className="content1-text"
                          type={animType.queue}
                          key="text1"
                          leaveReverse
                          ease={['easeOutCubic', 'easeInCubic']}
                          id="content_3_0-textWrapper"
                      >
                          <h1 key="h_3_0" id="content_3_0-title" style={{color:'#333',fontSize:'18px'}}>
                              暑假期课
                          </h1>
                          <p key="p_3_0" id="content_3_0-content" style={{color:'#666',fontSize:'14px'}}>
                              时间：2017年7月13日-2017年8月25日期间
                          </p>
                          <p key="p_3_1" id="content_3_1-content" style={{color:'#666',fontSize:'14px'}}>
                              共计20课时，周一到周五，周末休息。
                          </p>
                          <p key="p_3_2" id="content_3_2-content" style={{color:'#666',fontSize:'14px'}}>
                              上午8:30—10:30    下午15:00—17:00
                          </p>
                          <p key="p_3_3" id="content_3_4-content" style={{color:'#666',fontSize:'14px'}}>
                              学生自由选择时间，随到随学，学满20课时为准。
                          </p>
                          <p key="p_3_4" id="content_3_5-content" style={{color:'#666',fontSize:'14px'}}>
                              送一套训练服。价格：1350元
                          </p>
                          <OneTween
                              animation={{ x: '+=20', yoyo: true, repeat: -1, duration: 1000 }}
                              className="banner2-icon"
                              key="icon2"
                          >
                              <a href="https://github.com" key="button2" id="content_0_2-button" style={{ cursor:'pointer',color:'#333',fontSize:'18px',fontWeight:'wight',textDecoration:'none'}}>点击报名</a>
                          </OneTween>
                      </QueueAnim>
                      <OneTween
                          key="img1"
                          animation={animType.two}
                          className="content1-img"
                          id="content_3_0-imgWrapper"
                          resetStyleBool
                      >
                         <span id="content_3_0-img" style={{marginTop:'30px'}}>
                            <img width="100%"  src={this.props.data.items[4].src} />
                         </span>
                      </OneTween>

                  </div>
              </div>
          </Element>,
        ]
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    this.enquireScreen((isMode) => {
      this.setState({ isMode });
    });
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
                <BannerAnim type="grid"
                            delay={this.props.data.delay}
                            duration={this.props.data.duration}
                            autoPlaySpeed={this.props.data.autoPlaySpeed}
                            autoPlay={this.props.data.autoPlay}
                            pause={this.props.data.pause}
                            arrow={this.props.data.arrow}
                            arrowDefault={this.props.data.arrowDefault}
                            thumb={this.props.data.thumb}>
                    {this.state.children}

                </BannerAnim>

              </div>
          </div>
      );
  }
}
