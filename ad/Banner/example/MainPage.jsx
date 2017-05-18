import React from 'react';
import { render } from 'react-dom';

import Banner from './Banner/Banner';



const IMAGE_DATA = [
    {
        src: require('./assets/images/size5(960.380)/couplet1.jpg'),
        alt: 'images-1',
        textHeader:'Banner animation demo',
        textOne:'Today is not another day ,today I will create something beautiful ',
        textTwo:'Study hard , play harder',
        textColor:'#323232',
        textPosition:'upLeft'
    },
    {
        src: require('./assets/images/size5(960.380)/couplet2.jpg'),
        alt: 'images-2',
    },
    {
        src: require('./assets/images/size5(960.380)/3.jpg'),
        alt: 'images-3',
        textHeader:'Banner animation demo picture 3',
        textOne:'Today is not another day ,today I will create something beautiful ',
        textTwo:'Study hard , play harder',
        textColor:'#323232',
        textPosition:'upRight'
    },
    {
        src: require('./assets/video/YUNDI.mp4'),
    }
];

var MainPage=React.createClass({
  render:function(){

    return(
          <Banner
              items={IMAGE_DATA}
              width={'960px'}
              height={'380px'}
              delay={0}
              duration={1450}
              autoPlaySpeed={5000}
              autoPlay={true}
              pause={false}
              arrow={true}
              thumb={true}
              animType={"videoBg"}
          />
    );
  },
});
module.exports=MainPage;


