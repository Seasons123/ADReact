import BannerAnim from '../../BannerAnim/BannerAnim';
import QueueAnim from '../../QueueAnim/QueueAnim';
import TweenOneAnim from '../../TweenOneAnim/TweenOneAnim';

import React, { Component }  from 'react';

import '../../../css/banner.css';
import '../../../css/banner-anim.css';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class Vertical extends React.Component {
    render() {
        return (
            <BannerAnim type="vertical">
                <Element key="aaa"
                         prefixCls="banner-user-elem"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <QueueAnim name="QueueAnim">
                        <h1 key="h1">Ant Motion Demo</h1>
                        <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                    </QueueAnim>
                    <TweenOneAnim animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
                        Ant Motion Demo.Ant Motion Demo
                    </TweenOneAnim>
                </Element>
                <Element key="bbb"
                         prefixCls="banner-user-elem"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url(https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <QueueAnim name="QueueAnim">
                        <h1 key="h1">Ant Motion Demo</h1>
                        <p key="p">Ant Motion Demo.Ant Motion Demo.Ant Motion Demo.Ant Motion Demo</p>
                    </QueueAnim>
                    <TweenOneAnim animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
                        Ant Motion Demo.Ant Motion Demo
                    </TweenOneAnim>
                </Element>
            </BannerAnim>
        );
    }
}

/*
const { Element } = BannerAnim;
const BgElement = Element.BgElement;



export default class Vertical extends React.Component {
    render() {
        return (
            <BannerAnim type="vertical">
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
                        </QueueAnim>
                        <QueueAnim name="QueueAnim" type="bottom">
                            <p key="p1">{this.props.items[0].textOne}</p>
                            <p key="p2">{this.props.items[0].textTwo}</p>
                        </QueueAnim>
                    </div>
                </Element>
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
                        </QueueAnim>
                        <QueueAnim name="QueueAnim" type="bottom">
                            <p key="p1">{this.props.items[1].textOne}</p>
                            <p key="p2">{this.props.items[1].textTwo}</p>
                        </QueueAnim>
                    </div>
                </Element>
                <Element key="element3" prefixCls="banner-user-elem" >
                    <BgElement key="bg" className="bg"
                               style={{
                                   backgroundImage: 'url(' + this.props.items[2].src + ')',
                                   backgroundSize: 'cover',
                                   backgroundPosition: 'center',
                               }}
                    />
                    <div  className={this.props.items[2].textPosition} style={{color: this.props.items[2].textColor}}>
                        <QueueAnim name="QueueAnim">
                            <h1 key="h1">{this.props.items[2].textHeader}</h1>
                        </QueueAnim>
                        <QueueAnim name="QueueAnim" type="bottom">
                            <p key="p1">{this.props.items[2].textOne}</p>
                            <p key="p2">{this.props.items[2].textTwo}</p>
                        </QueueAnim>
                    </div>
                </Element>
            </BannerAnim>
        );
    }
}
*/

