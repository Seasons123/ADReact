import React, { Component, PropTypes } from 'react';
import './css/banner.css';
import './css/banner-anim.css';

import Slider from './Animation/SwitchAnim/Slider/Slider';
import Grid from './Animation/SwitchAnim/Grid/Grid';

export default class Banner extends Component {

    render() {
        if(this.props.animType =="Slider"){
            return(
                <Slider animType={this.props.animType}
                         items={this.props.items}
                         width={this.props.width}
                         height={this.props.height}
                         delay={this.props.delay}
                         duration={this.props.duration}
                         autoPlaySpeed={this.props.autoPlaySpeed}
                         autoPlay={this.props.autoPlay}
                         pause={this.props.pause}

                         dots={this.props.dots}
                         arrow={this.props.arrow}
                         >
                </Slider>
            );
        }
        else{
            return (
                <Grid  animType={this.props.animType}
                        items={this.props.items}
                        width={this.props.width}
                        height={this.props.height}
                        delay={this.props.delay}
                        duration={this.props.duration}
                        autoPlaySpeed={this.props.autoPlaySpeed}
                        autoPlay={this.props.autoPlay}
                        pause={this.props.pause}
                        arrow={this.props.arrow}>
                </Grid>
            );
        }
    }

}


/*
* BannerAnim.defaultProps = {
 component: 'div',
 className: 'banner-anim',
 initShow: 0,
 duration: 450,
 delay: 0,
 ease: 'easeInOutQuad',
 arrow: true,
 thumb: true,
 autoPlaySpeed: 5000,
 dragPlay: true,
 onChange: () => {
 },
 onMouseEnter: () => {
 },
 onMouseLeave: () => {
 },
 };*/


