import BannerAnim from '../../BannerAnim/BannerAnim';
import QueueAnim from '../../../../LowLevelAnim/QueueAnim/QueueAnim';
import OneTween from '../../../../LowLevelAnim/OneTween/OneTween';
import OneTweenGroup  from '../../../../LowLevelAnim/OneTween/OneTweenGroup';
import React from 'react';

import '../../../css/assets/index.css';
import '../../../css/assets/bgParallax.css';
import '../../../css/assets/arrow.css';
import '../../../css/assets/thumb.css';

const { Element, Arrow } = BannerAnim;
const BgElement = Element.BgElement;
export default class CustomArrow extends React.Component {
    constructor() {
        super(...arguments);
        this.imgArray = [
            this.props.data.items[0].src ,
            this.props.data.items[1].src ,
            this.props.data.items[2].src
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
                <BannerAnim onChange={this.onChange}
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
                    <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={OneTween}
                           onMouseEnter={this.prevEnter}
                           onMouseLeave={this.prevLeave}
                           animation={{ left: this.state.prevEnter ? 0 : -120 }}
                    >
                        <div className="arrow"></div>
                        <OneTweenGroup enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }}
                                       appear={false} className="img-wrapper" component="ul"
                        >
                            <li
                                style={{ backgroundImage: `url(${this.imgArray[intArray[0]]})` }}
                                key={intArray[0]}
                            />
                        </OneTweenGroup>
                    </Arrow>
                    <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={OneTween}
                           onMouseEnter={this.nextEnter}
                           onMouseLeave={this.nextLeave}
                           animation={{ right: this.state.nextEnter ? 0 : -120 }}
                    >
                        <div className="arrow"></div>
                        <OneTweenGroup enter={{ opacity: 0, type: 'from', delay: 200 }} leave={{ opacity: 0 }}
                                       className="img-wrapper" component="ul"
                        >
                            <li
                                style={{ backgroundImage: `url(${this.imgArray[intArray[1]]})` }}
                                key={intArray[1]}
                            />
                        </OneTweenGroup>
                    </Arrow>
                </BannerAnim>
            </div>
        );
    }
}

