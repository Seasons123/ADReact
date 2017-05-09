import React, { Component, PropTypes } from 'react';
import './css/banner.css';
import './css/banner-anim.css';

import Slider from './Animation/SwitchAnim/Slider/Slider';
import Grid from './Animation/SwitchAnim/Grid/Grid';

export default class Banner extends Component {

    render() {
        if(this.props.animType =="Slider"){
            return(
                <Slider items={this.props.items}
                         width={this.props.width}
                         height={this.props.height}
                         speed={this.props.speed}
                         delay={this.props.delay}
                         pause={this.props.pause}
                         autoplay={this.props.autoPlay}
                         dots={this.props.dots}
                         arrows={this.props.arrows}
                         animType={this.props.animType}>
                </Slider>
            );
        }
        else{
            return (
                <Grid  items={this.props.items}
                        width={this.props.width}
                        height={this.props.height}
                        animType={this.props.animType}
                        autoPlay={this.props.autoPlay}>
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


