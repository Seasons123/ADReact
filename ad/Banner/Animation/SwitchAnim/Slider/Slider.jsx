import React, { Component } from 'react';
import '../../../css/banner.css';
import '../../../css/banner-anim.css';

import BannerItem from './BannerItem';
import Bannerthumb from './Bannerthumb';
import BannerArrow from './BannerArrow';

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
            _n = _n + this.props.data.items.length;
        }
        if(_n >= this.props.data.items.length) {
            _n = _n - this.props.data.items.length;
        }
        this.setState({nowLocal: _n});
    }

    // 开始自动轮播
    goPlay() {
        if(this.props.data.autoPlay) {
            this.autoPlayFlag = setInterval(() => {
                this.turn(1);
            }, this.props.data.autoPlaySpeed);
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
        let count = this.props.data.items.length;
        let nowLocal = this.state.nowLocal;

        let itemNodes = this.props.data.items.map((item, idx) => {
            return <BannerItem item={item} count={count}  nowLocal={nowLocal} key={'item' + idx} />;
        });

        let arrowNode = <BannerArrow turn={this.turn.bind(this)}/>;

        let thumbNode = <Bannerthumb turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;

        return (
            <div style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                <div
                    className="slider"
                    onMouseOver={this.props.data.pause?this.pausePlay.bind(this):null} onMouseOut={this.props.data.pause?this.goPlay.bind(this):null}>
                    <ul style={{
                        left: -100 * this.state.nowLocal + "%",
                        transitionDuration: this.props.data.duration + "ms",
                        width: this.props.data.items.length * 100 + "%"
                    }}>
                        {itemNodes}
                    </ul>
                    {this.props.data.arrow?arrowNode:null}
                    {this.props.data.thumb?thumbNode:null}
                </div>
            </div>
        );
    }
}

