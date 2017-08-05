import BannerAnim from '../../BannerAnim/BannerAnim';
import QueueAnim from '../../../../LowLevelAnim/QueueAnim/QueueAnim';
import OneTween from '../../../../LowLevelAnim/OneTween/OneTween';
import React from 'react';

import '../../../css/banner.css';
import '../../../css/banner-anim.css';

const { Element, Thumb } = BannerAnim;
const BgElement = Element.BgElement;
export default class CustomThumb extends React.Component {
    constructor() {
        super(...arguments);
        this.imgArray = [
            this.props.data.items[0].src ,
            this.props.data.items[1].src ,
            this.props.data.items[2].src
        ];
        this.state = {
            enter: false,
        };
        [
            'onMouseEnter',
            'onMouseLeave',
        ].forEach((method) => this[method] = this[method].bind(this));
    }

    onMouseEnter() {
        this.setState({
            enter: true,
        });
    }

    onMouseLeave() {
        this.setState({
            enter: false,
        });
    }

    render() {
        const thumbChildren = this.imgArray.map((img, i) =>
            <span key={i}><i style={{ backgroundImage: `url(${img})` }} /></span>
        );
        return (
            <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                <BannerAnim onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
                             onChange={this.onChange}
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
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage: `url(${this.imgArray[2]})`,
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
                    <Thumb prefixCls="user-thumb" key="thumb" component={OneTween}
                           animation={{ bottom: this.state.enter ? 0 : -70 }}
                    >
                        {thumbChildren}
                    </Thumb>
                </BannerAnim>
            </div>
        );
    }
}

