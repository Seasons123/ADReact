import React, { Component, PropTypes } from 'react';
import OneTween  from '../LowLevelAnim/OneTween/OneTween';

import './css/scalable.css';

export default class Scalable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayBig: "block",
            displaySmall: "block",
            closeDisplay:"block",
            heightBigImage:this.props.items[1].height,
            heightSmallImage:this.props.items[0].height,
            animation: [{ y: '-1000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }]

        };

    }

    handleCloseClick() {
        this.setState({displayBig: "none"});
        this.setState({closeDisplay: "none"});

    }
    // 开始计时自动消失
    autoDisappear() {
        if(this.props.autoDisappear) {
            setTimeout(() => {
                this.setState({heightBigImage: "0px"});
            }, this.props.delay *2);
        }
    }

    componentDidMount() {
        this.autoDisappear();
    }

    render() {
        let bigImage=(
            <OneTween animation={this.props.autoDisappear?this.state.animation:null}>
                <div className="adBig" >
                    <a href={this.props.link}
                       style={{backgroundImage:'url(' + this.props.items[1].src + ')',
                           width: this.props.items[1].width,
                           height:this.state.heightBigImage,
                           display:this.state.displayBig}}>
                    </a>
                    <a className="rightAd-close"
                       style={{display:this.state.closeDisplay}}
                       onClick={this.handleCloseClick.bind(this)}
                       href="#">X
                    </a>
                </div>
            </OneTween>
        );

        let smallImage=(
            <OneTween animation={[{ y: '-1000px' ,height:0, type: 'from', delay: this.props.delay *2 ,duration:this.props.duration }]}>
                <div  className="adSmall" style={{display:this.state.displaySmall}}>
                    <a href={this.props.link}
                       style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                           width: this.props.items[0].width,
                           height:this.state.heightSmallImage,
                           display:this.state.displayBig}}>
                    </a>
                </div>
            </OneTween>
        );
        if( this.props.position == "top" || this.props.position == "Top" )
            return(
                <div style={{ width:this.props.width,margin:'0 auto'}}>
                    {bigImage}
                    {this.props.aotoNormalSize?smallImage:null}
                </div>
        );

    }
}





