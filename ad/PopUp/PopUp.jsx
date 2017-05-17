import React, { Component, PropTypes } from 'react';

import './css/popup.css';

export default class PopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            position: "fixed"
        };
    }
    handleCloseClick() {
        this.setState({display: "none"});
        this.setState({position: ""});
    }

    render() {


       if( this.props.position == "bottomRight" || this.props.position == "BottomRight")
            return(
                <div  className="item"
                      style={{width: this.props.width,
                             marginRight:this.props.distanceX,
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
            );

    }

}



