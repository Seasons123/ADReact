import React, { Component, PropTypes } from 'react';
import './css/banner.css';
import './css/banner-anim.css';

import Slider from './Animation/SwitchAnim/Slider/Slider';
import Grid from './Animation/SwitchAnim/Grid/grid';
import GridBar from './Animation/SwitchAnim/GridBar/gridBar';
import Vertical from './Animation/SwitchAnim/Vertical/vertical';
import CustomArrow from './Animation/SwitchAnim/CustomArrow/customArrow';
import CustomThumb from './Animation/SwitchAnim/CustomThumb/customThumb';

export default class Banner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let DATA = {
            items:this.props.items,
            width:this.props.width,
            height:this.props.height,
            delay:this.props.delay,
            duration:this.props.duration,
            autoPlaySpeed:this.props.autoPlaySpeed,
            autoPlay:this.props.autoPlay,
            pause:this.props.pause,
            arrow:this.props.arrow,
            thumb:this.props.thumb
        };

        if(this.props.animType =="slider".toLowerCase() || this.props.animType =="slider".toUpperCase() || this.props.animType =="Slider"){
            return(
                <Slider data={ DATA }>
                </Slider>
            );
        }
        if(this.props.animType =="grid".toLowerCase() || this.props.animType =="grid".toUpperCase() || this.props.animType =="Grid"){
            return(
                <Grid  data={ DATA }>
                </Grid>
            );
        }
        if(this.props.animType =="gridBar" ||  this.props.animType =="GridBar"){
            return(
                <GridBar  data={ DATA }>
                </GridBar>
            );
        }
        if(this.props.animType =="vertical".toLowerCase() || this.props.animType =="vertical".toUpperCase() || this.props.animType =="Vertical"){
            return(
                <Vertical  data={ DATA }>
                </Vertical>
            );
        }
        if(this.props.animType =="customArrow" ||  this.props.animType =="CustomArrow"){
            return(
                <CustomArrow  data={ DATA }>
                </CustomArrow>
            );
        }
        if(this.props.animType =="customThumb" ||  this.props.animType =="CustomThumb"){
            return(
                <CustomThumb  data={ DATA }>
                </CustomThumb>
            );
        }
    }

}



