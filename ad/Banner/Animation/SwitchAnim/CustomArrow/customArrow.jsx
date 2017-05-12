import React, { Component, PropTypes } from 'react';
import '../../../css/banner.css';
import '../../../css/banner-anim.css';


import QueueAnim from '../../QueueAnim/QueueAnim';
import BannerAnim from '../../BannerAnim/BannerAnim';
const { Element } = BannerAnim;
const BgElement = Element.BgElement;

export default class CustomArrow extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
      'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
    ];
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
    };
    [
      'onChange',
      'prevEnter',
      'prevLeave',
      'nextEnter',
      'nextLeave',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onChange(type, int) {
    if (type === 'before') {
      this.setState({
        intShow: int,
      });
    }
  }

  getNextPrevNumber() {
    let nextInt = this.state.intShow + 1;
    let prevInt = this.state.intShow - 1;
    if (nextInt >= this.imgArray.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = this.imgArray.length - 1;
    }

    return [prevInt, nextInt];
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  prevLeave() {
    this.setState({
      prevEnter: false,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  nextLeave() {
    this.setState({
      nextEnter: false,
    });
  }

  render() {
    const intArray = this.getNextPrevNumber();
    return (
        <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
            <BannerAnim onChange={this.onChange}>
              <Element key="aaa"
                prefixCls="banner-user-elem"
              >
                <BgElement
                  key="bg"
                  className="bg"
                  style={{
                    backgroundImage: `url(${this.imgArray[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <QueueAnim key="1" name="QueueAnim">
                  <h1 key="h1">Ant Motion Demo</h1>
                  <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                </QueueAnim>

              </Element>
              <Element key="bbb"
                prefixCls="banner-user-elem"
              >
                <BgElement
                  key="bg"
                  className="bg"
                  style={{
                    backgroundImage: `url(${this.imgArray[1]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <QueueAnim key="1" name="QueueAnim">
                  <h1 key="h1">Ant Motion Demo</h1>
                  <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                </QueueAnim>

              </Element>
              <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={TweenOneAnim}
                onMouseEnter={this.prevEnter}
                onMouseLeave={this.prevLeave}
                animation={{ left: this.state.prevEnter ? 0 : -120 }}
              >
                <div className="arrow"></div>
                <TweenOneGroup enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }}
                  appear={false} className="img-wrapper" component="ul"
                >
                  <li
                    style={{ backgroundImage: `url(${this.imgArray[intArray[0]]})` }}
                    key={intArray[0]}
                  />
                </TweenOneGroup>
              </Arrow>
              <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={TweenOneAnim}
                onMouseEnter={this.nextEnter}
                onMouseLeave={this.nextLeave}
                animation={{ right: this.state.nextEnter ? 0 : -120 }}
              >
                <div className="arrow"></div>
                <TweenOneGroup enter={{ opacity: 0, type: 'from', delay: 200 }} leave={{ opacity: 0 }}
                  className="img-wrapper" component="ul"
                >
                  <li
                    style={{ backgroundImage: `url(${this.imgArray[intArray[1]]})` }}
                    key={intArray[1]}
                  />
                </TweenOneGroup>
              </Arrow>
            </BannerAnim>
        </div>
    );
  }
}

