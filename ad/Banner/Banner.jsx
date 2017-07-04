import React, { Component, PropTypes } from 'react';
import './css/banner.css';
import './css/banner-anim.css';

import Default from './Animation/SwitchAnim/Default/default';
import Slider from './Animation/SwitchAnim/Slider/Slider';
import Across from './Animation/SwitchAnim/Across/across';
import AcrossOverlay from './Animation/SwitchAnim/AcrossOverlay/acrossOverlay';
import Grid from './Animation/SwitchAnim/Grid/grid';
import GridBar from './Animation/SwitchAnim/GridBar/gridBar';
import Vertical from './Animation/SwitchAnim/Vertical/vertical';
import VerticalOverlay from './Animation/SwitchAnim/VerticalOverlay/verticalOverlay';
import CustomArrow from './Animation/SwitchAnim/CustomArrow/customArrow';
import CustomThumb from './Animation/SwitchAnim/CustomThumb/customThumb';
import FollowMouse from './Animation/SwitchAnim/FollowMouse/followMouse';
import VideoBg from './Animation/SwitchAnim/VideoBg/videoBg';
import FullScreenAnim from './Animation/FullScreenAnim/fullScreenAnim';

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
            arrowDefault:this.props.arrowDefault,
            thumb:this.props.thumb
        };

        /*The default mode*/
        if(this.props.animType ==" " || this.props.animType == null ){
            return(
                <Default data={ DATA }>
                </Default>
            );
        }
        if(this.props.animType =="slider".toLowerCase() || this.props.animType =="slider".toUpperCase() || this.props.animType =="Slider"){
            return(
                <Slider data={ DATA }>
                </Slider>
            );
        }
        /*The default mode*/
        if(this.props.animType =="across".toLowerCase() || this.props.animType =="across".toUpperCase() || this.props.animType =="Across" ){
            return(
                <Across data={ DATA }>
                </Across>
            );
        }
        if(this.props.animType =="AcrossOverlay".toLowerCase() || this.props.animType =="acrossOverlay"){
            return(
                <AcrossOverlay data={ DATA }>
                </AcrossOverlay>
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
        if(this.props.animType =="VerticalOverlay" || this.props.animType =="verticalOverlay"){
            return(
                <VerticalOverlay  data={ DATA }>
                </VerticalOverlay>
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
        if(this.props.animType =="followMouse" ||  this.props.animType =="FollowMouse"){
            return(
                <FollowMouse  data={ DATA }>
                </FollowMouse>
            );
        }
        if(this.props.animType =="videoBg" ||  this.props.animType =="VideoBg"){
            return(
                <VideoBg  data={ DATA }>
                </VideoBg>
            );
        }
        if(this.props.animType =="fullScreenAnim" ||  this.props.animType =="FullScreenAnim"){
            return(
                <FullScreenAnim  data={ DATA }>
                </FullScreenAnim>
            );
        }
    }

}



