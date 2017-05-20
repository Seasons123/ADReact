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
            widthBigImage:this.props.items[1].width,
            heightSmallImage:this.props.items[0].height,
            animationTop: [{ y: '-1000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],
            animationLeft: [{ x: '-2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],
            animationRight: [{ x: '2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],

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
                /*this.setState({widthBigImage: "0px"});*/
                /*this.setState({closeDisplay: "none"});*/
            }, this.props.delay *2);
        }
    }

    componentDidMount() {
        this.autoDisappear();
    }

    render() {

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
                    <OneTween animation={this.props.autoDisappear?this.state.animationTop:null}>
                        <div className="adBig" >
                            <a href={this.props.link}
                               style={{backgroundImage:'url(' + this.props.items[1].src + ')',
                                   width: this.state.widthBigImage,
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
                    {this.props.aotoNormalSize?smallImage:null}
                </div>
        );
        if( this.props.position == "left" || this.props.position == "Left" )
            return(
                <div style={{ width:this.props.width,margin:'0 auto'}}>
                    <OneTween animation={this.props.autoDisappear?this.state.animationLeft:null}>
                        <div className="adBig" style={{width: this.props.width}}>
                            <a href={this.props.link}
                               style={{backgroundImage:'url(' + this.props.items[1].src + ')',
                                   width: this.state.widthBigImage,
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
                    {this.props.aotoNormalSize?smallImage:null}
                </div>
            );
        if( this.props.position == "right" || this.props.position == "Right" )
            return(
                <div style={{ width:this.props.width,margin:'0 auto'}}>
                    <OneTween animation={this.props.autoDisappear?this.state.animationRight:null}>
                        <div className="adBig" >
                            <a href={this.props.link}
                               style={{backgroundImage:'url(' + this.props.items[1].src + ')',
                                   width: this.state.widthBigImage,
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
                    {this.props.aotoNormalSize?smallImage:null}
                </div>
            );

    }
}





