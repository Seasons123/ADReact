import BannerAnim from '../../BannerAnim/BannerAnim';
import QueueAnim from '../../../../LowLevelAnim/QueueAnim/QueueAnim';
import OneTween from '../../../../LowLevelAnim/OneTween/OneTween';
import React from 'react';

import '../../../css/banner.css';
import '../../../css/banner-anim.css';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class FollowMouse extends React.Component {
    render() {
        return (
            <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                <BannerAnim type="across">
                    <Element key="aaa"
                             prefixCls="banner-user-elem"
                             followParallax={{
                                 delay: 1000,
                                 data: [
                                     { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                                     { id: 'title', value: -20, type: 'x' },
                                     { id: 'queue', value: 50, type: 'x' },
                                     { id: 'JText', value: -30, type: 'x' },
                                 ],
                             }}
                    >
                        <BgElement
                            id="bg"
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage:'url(' + this.props.data.items[0].src + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div  className={this.props.data.items[0].textPosition} style={{color:this.props.data.items[0].textColor}}>
                            <QueueAnim id="queue" key="queue">
                                <h1 key="h1" id="title">{this.props.data.items[0].textHeader}</h1>
                            </QueueAnim>
                            <OneTween animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} id="JText">
                                <p key="p1">{this.props.data.items[0].textOne}</p>
                                <p key="p2">{this.props.data.items[0].textTwo}</p>
                            </OneTween>
                        </div>
                    </Element>
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
                    </Element>
                    <Element key="ccc"
                             prefixCls="banner-user-elem"
                             followParallax={{
                                 delay: 1000,
                                 data: [
                                     { id: 'bg2', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                                     { id: 'title2', value: -20, type: 'x' },
                                     { id: 'queue2', value: 50, type: 'x' },
                                     { id: 'JText2', value: -30, type: 'x' },
                                 ],
                             }}
                    >
                        <BgElement
                            id="bg2"
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage:'url(' + this.props.data.items[2].src + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div  className={this.props.data.items[2].textPosition} style={{color:this.props.data.items[2].textColor}}>
                            <QueueAnim id="queue2" key="queue">
                                <h1 key="h1" id="title2">{this.props.data.items[2].textHeader}</h1>
                            </QueueAnim>
                            <OneTween animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} id="JText2">
                                <p key="p1">{this.props.data.items[2].textOne}</p>
                                <p key="p2">{this.props.data.items[2].textTwo}</p>
                            </OneTween>
                        </div>
                    </Element>
                </BannerAnim>
            </div>
        );
    }
}

