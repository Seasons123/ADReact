import React, { Component, PropTypes } from 'react';

import './css/popup.css';

export default class PopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            position: "fixed",
            mask:this.props.mask
        };
    }
    handleCloseClick() {
        this.setState({display: "none"});
        this.setState({position: ""});
        this.setState({mask: false});
    }

    // 开始计时自动消失
    autoDisappear() {
        if(this.props.autoDisappear) {
            setTimeout(() => {
                this.setState({display: "none"});
            }, this.props.duration);
        }
    }


    componentDidMount() {
        this.autoDisappear();
    }

    render() {

       if( this.props.position == "bottomRight" || this.props.position == "BottomRight")
            return(
                <div>
                    <div  className="itemBottomRight"
                          style={{width: this.props.width,
                                 marginRight:this.props.distanceX,
                                 marginBottom:this.props.distanceY,
                                 display:this.state.display,
                                 position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close"
                                  onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a   style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                                      width: this.props.width,
                                      height:this.props.height,
                                      display:this.state.display}}
                              href={this.props.link}>
                        </a>
                    </div>
                    <div className={this.state.mask?"cover":null} style={{backgroundColor:this.props.maskColor}}></div>
                </div>
            );

        if( this.props.position == "bottomLeft" || this.props.position == "BottomLeft")
            return(
                <div>
                    <div  className="itemBottomLeft"
                          style={{width: this.props.width,
                              marginLeft:this.props.distanceX,
                              marginBottom:this.props.distanceY,
                              display:this.state.display,
                              position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close"
                                  onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a    className={this.props.position}
                              style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                                  width: this.props.width,
                                  height:this.props.height,
                                  display:this.state.display}}
                              href={this.props.link}>
                        </a>
                    </div>
                    <div className={this.state.mask?"cover":null} style={{backgroundColor:this.props.maskColor}}></div>
                </div>
            );

        if( this.props.position == "upRight" || this.props.position == "UpRight")
            return(
                <div>
                    <div  className="itemUpRight"
                          style={{width: this.props.width,
                              marginRight:this.props.distanceX,
                              marginTop:this.props.distanceY,
                              display:this.state.display,
                              position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close"
                                  onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a  style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                                  width: this.props.width,
                                  height:this.props.height,
                                  display:this.state.display}}
                              href={this.props.link}>
                        </a>
                    </div>
                    <div className={this.state.mask?"cover":null} style={{backgroundColor:this.props.maskColor}}></div>
                </div>
            );

        if( this.props.position == "upLeft" || this.props.position == "UpLeft")
            return(
                <div>
                    <div  className="itemUpLeft"
                          style={{width: this.props.width,
                              marginLeft:this.props.distanceX,
                              marginTop:this.props.distanceY,
                              display:this.state.display,
                              position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close"
                                  onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a   style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                                  width: this.props.width,
                                  height:this.props.height,
                                  display:this.state.display}}
                              href={this.props.link}>
                        </a>
                    </div>
                    <div className={this.state.mask?"cover":null} style={{backgroundColor:this.props.maskColor}}></div>
                </div>
            );

        if( this.props.position == "center" || this.props.position == "Center")
            return(
                <div>
                    <div  className="itemCenter"
                          style={{width: this.props.width,
                              marginLeft:- parseInt(this.props.width)/2 + "px",
                              marginTop:- parseInt(this.props.height)/2 + "px",
                              display:this.state.display,
                              position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close"
                                  onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a  style={{backgroundImage:'url(' + this.props.items[0].src + ')',
                                  width: this.props.width,
                                  height:this.props.height,
                                  display:this.state.display}}
                              href={this.props.link}>
                        </a>
                    </div>
                    <div className={this.state.mask?"cover":null} style={{backgroundColor:this.props.maskColor}}></div>
                </div>
            );
        if( this.props.position == "couplet" || this.props.position == "Couplet"){
            return (
                <div>
                    <div className="leftCouplet"
                         style={{width: this.props.width,
                                 marginLeft:this.props.distanceX,
                                 marginTop:this.props.distanceY,
                                 display:this.state.display,
                                 position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close" onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a   style={{backgroundImage:'url(' + this.props.items[1].src + ')',
                                     width: this.props.width,
                                     height:this.props.height,
                                     display:this.state.display}}
                              href={this.props.link}>
                        </a>
                    </div>
                    <div className="rightCouplet"
                         style={{width: this.props.width,
                             marginRight:this.props.distanceX,
                             marginTop:this.props.distanceY,
                             display:this.state.display,
                             position:this.state.position}}>
                        <div className="firstLine" style={{width: this.props.width}}>
                            <span className="close" onClick={this.handleCloseClick.bind(this)}>X</span>
                        </div>
                        <a   style={{backgroundImage:'url(' + this.props.items[2].src + ')',
                            width: this.props.width,
                            height:this.props.height,
                            display:this.state.display}}
                             href={this.props.link}>
                        </a>
                    </div>
                    <div className={this.state.mask?"cover":null} style={{backgroundColor:this.props.maskColor}}></div>
                </div>
            );
        }
    }

}

PopUp.propTypes = {
    items:PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    link: PropTypes.string,
    position: PropTypes.string,
    distanceX: PropTypes.string,
    distanceY: PropTypes.string,
    mask:PropTypes.bool,
    maskColor:PropTypes.string,
    autoDisappear:PropTypes.bool,
    duration:PropTypes.number,
};

PopUp.defaultProps = {
    items:[],
    width:'135px',
    height:'180px',
    link:"",
    position:"bottomRight",
    distanceX:"20px",
    distanceY:"30px",
    mask:false,
    maskColor:'rgba(0,0,0,0.3)',
    autoDisappear:false,
    duration:1000
};

