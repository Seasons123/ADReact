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
            widthBigImage:this.props.items[1].width,
            heightBigImage:this.props.items[1].height,
            duration:1600,
            animationTop: [{ y: '-1000px',opacity: 1, type: 'to', delay: this.props.delay,duration:1600}],
            animationLeft: [{ x: '-2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:1600 }],
            animationRight: [{ x: '2000px',opacity: 1, type: 'to', delay: this.props.delay,duration:1600 }],
            animationBottom:[{ y: '1000px',opacity: 1, type: 'to', delay: this.props.delay,duration:1600*2 }],
        };

    }

    handleCloseClick() {
        this.setState({displayBig: "none"});
        this.setState({closeDisplay: "none"});

    }
    // 开始计时自动消失
    autoDisappear() {
        if(this.props.autoDisappear) {
            if(this.props.position == "top" || this.props.position == "Top") {
                setTimeout(() => {
                    // 开始循环定时器
                    let timer = setInterval(() => {
                        // 获取元素总高度
                        let totalHeight = parseInt(this.state.heightBigImage);
                        // 定义一个变量保存元素当前高度
                        let currentHeight = totalHeight;
                        // 计算每次减去的值
                        let decrement = totalHeight / (this.state.duration / 10);
                        // 减去当前高度的一部分
                        currentHeight = currentHeight - decrement;
                        // 把当前高度赋值给height属性
                        this.setState({heightBigImage: currentHeight + "px"});
                        // 如果当前高度小于等于0，就关闭定时器
                        if (currentHeight <= 0) {
                            // 关闭定时器
                            clearInterval(timer);
                        }
                    }, 10);

            }, this.props.delay );
           }else{
                setTimeout(()=>{
                    this.setState({heightBigImage: "0px"});
                    this.setState({displaySmallBottom: "block"});
                }, this.props.delay *2)
            }
        }
    }

    componentDidMount() {
        this.autoDisappear();
    }

    render() {

        let smallImageTop=(
            <OneTween animation={[{ y: '-1000px' ,height:0, type: 'from', delay: this.props.delay *2,duration:this.state.duration }]}>
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
            <OneTween animation={[{ y: '1000px' , type: 'from', delay: this.props.delay *1.5,duration:this.state.duration }]}>
                <div  className="adSmallBottom" style={{display:this.state.displaySmallBottom}}>
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
                <OneTween animation={[{ x: '-100px' , type: 'from', delay: this.props.delay *2, duration:this.state.duration }]}>
                    <div  className="adSmallLeft" style={{display:this.state.displaySmall}}>
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
        let smallImageRight=(
            <div style={{ margin:'0 0',float:'right'}}>
                <OneTween animation={[{ x: '2000' , type: 'from', delay: this.props.delay *2 ,duration:this.state.duration }]}>
                    <div  className="adSmallRight" style={{display:this.state.displaySmall}}>
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
                <div className="bigADTop" style={{ width:this.props.width,margin:'0 auto'}}>
                    <OneTween >
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
                <div className="bigADLeft" >
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
                <div className="bigADRight" >
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
                <div className="bigADBottom"  style={{ width:this.props.width,margin:'0 auto',position:'fixed',bottom:'0', left:'0', right:'0' ,zIndex:'1000'}}>
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
Scalable.propTypes = {
    items:PropTypes.object,
    width: PropTypes.string,
    link:PropTypes.string,
    position:PropTypes.string,
    autoDisappear:PropTypes.bool,
    delay:PropTypes.number,
    aotoNormalSize:PropTypes.bool,
};
Scalable.defaultProps={
    items:[],
    width:'800px',
    link:"https://github.com",
    position:"right",
    autoDisappear:true,
    delay:1600,
    aotoNormalSize:true
};



