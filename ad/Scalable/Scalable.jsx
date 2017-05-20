import React, { Component, PropTypes } from 'react';
import OneTween  from '../LowLevelAnim/OneTween/OneTween';

import './css/scalable.css';

export default class Scalable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayBig: "block",
            displaySmall: "block",
            displaySmallBottom:"none",
            closeDisplay:"block",
            heightBigImage:this.props.items[1].height,
            widthBigImage:this.props.items[1].width,
            animationTop: [{ y: '-1000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],
            animationLeft: [{ x: '-2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],
            animationRight: [{ x: '2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],
            animationBottom:[{ y: '2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:this.props.duration }],
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
                this.setState({displaySmallBottom: "block"});
            }, this.props.delay *2);
        }
    }

    componentDidMount() {
        this.autoDisappear();
    }

    render() {

        let smallImageTop=(
            <OneTween animation={[{ y: '-1000px' ,height:0, type: 'from', delay: this.props.delay *2,duration:this.props.duration }]}>
                <div  className="adSmall" style={{display:this.state.displaySmall}}>
                    <a href={this.props.link}
                       style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                           width: this.props.items[0].width,
                           height:this.props.items[0].height,
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
        let smallImageBottom=(
            <OneTween animation={[{ y: '1000px' , type: 'from', delay: this.props.delay *1.5,duration:this.props.duration }]}>
                <div  className="adSmall" style={{display:this.state.displaySmallBottom}}>
                    <a href={this.props.link}
                       style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                           width: this.props.items[0].width,
                           height:this.props.items[0].height,
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
        let smallImageLeft=(
            <div style={{ margin:'0 0'}}>
                <OneTween animation={[{ x: '-100px' , type: 'from', delay: this.props.delay *2, duration:this.props.duration }]}>
                    <div  className="adSmall" style={{display:this.state.displaySmall}}>
                        <a href={this.props.link}
                           style={{backgroundImage:'url(' + this.props.items[2].src + ')',
                               width: this.props.items[2].width,
                               height:this.props.items[2].height,
                               display:this.state.displayBig}}>
                        </a>
                        <a className="rightAd-close-smallImageLeft"
                           style={{display:this.state.closeDisplay}}
                           onClick={this.handleCloseClick.bind(this)}
                           href="#">X
                        </a>
                    </div>
                </OneTween>
            </div>
        );
        let smallImageRight=(
            <div style={{ margin:'0 0',float:'right'}}>
                <OneTween animation={[{ x: '2000' , type: 'from', delay: this.props.delay *2 ,duration:this.props.duration }]}>
                    <div  className="adSmall" style={{display:this.state.displaySmall}}>
                        <a href={this.props.link}
                           style={{backgroundImage:'url(' + this.props.items[2].src + ')',
                               width: this.props.items[2].width,
                               height:this.props.items[2].height,
                               display:this.state.displayBig}}>
                        </a>
                        <a className="rightAd-close-smallImageLeftRight"
                           style={{display:this.state.closeDisplay}}
                           onClick={this.handleCloseClick.bind(this)}
                           href="#">X
                        </a>
                    </div>
                </OneTween>
            </div>
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
                    {this.props.aotoNormalSize?smallImageTop:null}
                </div>
        );
        if( this.props.position == "left" || this.props.position == "Left" )
            return(
                <div>
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
                    </div>
                    {this.props.aotoNormalSize?smallImageLeft:null}
                </div>

            );
        if( this.props.position == "right" || this.props.position == "Right" )
            return(
                <div>
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
                    </div>
                    {this.props.aotoNormalSize?smallImageRight:null}
                </div>
            );
        if( this.props.position == "bottom" || this.props.position == "Bottom" )
            return(
                <div style={{ width:this.props.width,margin:'0 auto',position:'fixed',bottom:'0', left:'0', right:'0' ,zIndex:'1000'}}>
                    <div className="clear"></div>
                    <OneTween animation={this.props.autoDisappear?this.state.animationBottom:null}>
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
                    {this.props.aotoNormalSize?smallImageBottom:null}
                </div>
            );

    }
}





