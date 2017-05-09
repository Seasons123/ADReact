import React, { Component } from 'react';
import '../../../css/banner.css';
import '../../../css/banner-anim.css';

import BannerItem from './BannerItem';
import BannerDots from './BannerDots';
import BannerArrows from './BannerArrows';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowLocal: 0,
        };
    }

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
        if(this.props.autoPlay) {
            this.autoPlayFlag = setInterval(() => {
                this.turn(1);
            }, this.props.autoPlaySpeed);
        }
    }

    // 暂停自动轮播
    pausePlay() {
        clearInterval(this.autoPlayFlag);
    }

    componentDidMount() {
        this.goPlay();
    }

    render() {
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
                        transitionDuration: this.props.duration + "ms",
                        width: this.props.items.length * 100 + "%"
                    }}>
                        {itemNodes}
                    </ul>
                    {this.props.arrow?arrowsNode:null}
                    {this.props.dots?dotsNode:null}
                </div>
            </div>
        );
    }
}

