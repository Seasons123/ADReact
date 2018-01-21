import BannerAnim from '../../BannerAnim/BannerAnim';
import MultiAnim from '../../../../LowLevelAnim/MultiAnim/MultiAnim';
import SingleAnim from '../../../../LowLevelAnim/SingleAnim/SingleAnim';
import React from 'react';

import '../../../css/banner.css';
import '../../../css/banner-anim.css';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;
export default class FollowMouse extends React.Component {
    render() {
        return (
            <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                <BannerAnim type="across"
                            delay={this.props.data.delay}
                            duration={this.props.data.duration}
                            autoPlaySpeed={this.props.data.autoPlaySpeed}
                            autoPlay={this.props.data.autoPlay}
                            pause={this.props.data.pause}
                            arrow={this.props.data.arrow}
                            arrowDefault={this.props.data.arrowDefault}
                            thumb={this.props.data.thumb}>
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
                            <MultiAnim id="queue" key="queue">
                                <h1 key="h1" id="title">{this.props.data.items[0].textHeader}</h1>
                            </MultiAnim>
                            <SingleAnim animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} id="JText">
                                <p key="p1">{this.props.data.items[0].textOne}</p>
                                <p key="p2">{this.props.data.items[0].textTwo}</p>
                            </SingleAnim>
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
                            <MultiAnim name="Queue">
                                <h1 key="h1">{this.props.data.items[1].textHeader}</h1>
                            </MultiAnim>
                            <MultiAnim name="Queue" type="bottom">
                                <p key="p1">{this.props.data.items[1].textOne}</p>
                                <p key="p2">{this.props.data.items[1].textTwo}</p>
                            </MultiAnim>
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
                            <MultiAnim id="queue2" key="queue">
                                <h1 key="h1" id="title2">{this.props.data.items[2].textHeader}</h1>
                            </MultiAnim>
                            <SingleAnim animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} id="JText2">
                                <p key="p1">{this.props.data.items[2].textOne}</p>
                                <p key="p2">{this.props.data.items[2].textTwo}</p>
                            </SingleAnim>
                        </div>
                    </Element>
                </BannerAnim>
            </div>
        );
    }
}

