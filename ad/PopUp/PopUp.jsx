import React, { Component, PropTypes } from 'react';

import './css/popup.css';


import TopMask from './Animation/Type/TopMask/topMask';


export default class PopUp extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let DATA = {
            items:this.props.items,
            width:this.props.width,
            height:this.props.height,
            link:this.props.link,
            type:this.props.type
        };


        if(this.props.type =="topMask" || this.props.type =="TopMask"){
            return(
                <TopMask data={ DATA }>
                </TopMask>
            );
        }
    }

}



