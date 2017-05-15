
import QueueAnim from '../../../../LowLevelAnim/QueueAnim/QueueAnim';
import BannerAnim from '../../BannerAnim/BannerAnim';
import React from 'react';

import '../../../css/assets/index.css';
import '../../../css/assets/bgParallax.css';
import '../../../css/assets/arrow.css';
import '../../../css/assets/thumb.css';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class VideoBg extends React.Component {
    render() {
        return (
            <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                <BannerAnim delay={this.props.data.delay}
                             duration={this.props.data.duration}
                             autoPlaySpeed={this.props.data.autoPlaySpeed}
                             autoPlay={this.props.data.autoPlay}
                             pause={this.props.data.pause}
                             arrow={this.props.data.arrow}
                             thumb={this.props.data.thumb}>
                    <Element key="aaa"
                             prefixCls="banner-user-elem"
                    >
                        <BgElement key="bg" className="bg">
                            <video loop autoPlay>
                                <source src={  this.props.data.items[3].src } type="video/mp4" />
                            </video>
                        </BgElement>
                        <div  className={this.props.data.items[0].textPosition} style={{color:this.props.data.items[0].textColor}}>
                            <QueueAnim name="QueueAnim">
                                <h1 key="h1">{this.props.data.items[0].textHeader}</h1>
                            </QueueAnim>
                            <QueueAnim name="QueueAnim" type="bottom">
                                <p key="p1">{this.props.data.items[0].textOne}</p>
                                <p key="p2">{this.props.data.items[0].textTwo}</p>
                            </QueueAnim>
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
                </BannerAnim>
            </div>
        );
    }
}

