import React from 'react';
import { render } from 'react-dom';

import Banner from './Banner/Banner';



const IMAGE_DATA = [
    {
        src: require('./images/size5(960.380)/1.jpg'),
        alt: 'images-1',
        textHeader:'Banner animation demo',
        textOne:'Today is not another day ,today I will create something beautiful ',
        textTwo:'Study hard , play harder',
        textColor:'#323232',
        textPosition:'upLeft'
    },
    {
        src: require('./images/size5(960.380)/2.jpg'),
        alt: 'images-2',
    },
    {
        src: require('./images/size5(960.380)/3.jpg'),
        alt: 'images-3',
        textHeader:'Banner animation demo picture 3',
        textOne:'Today is not another day ,today I will create something beautiful ',
        textTwo:'Study hard , play harder',
        textColor:'#323232',
        textPosition:'bottomRight'
    },
];

var MainPage=React.createClass({
  render:function(){

    return(
          <Banner
              items={IMAGE_DATA}
              width={'960px'}
              height={'380px'}
              delay={0}
              duration={450}
              autoPlaySpeed={5000}
              autoPlay={true}
              pause={false}
              arrow={false}

              dots={true}

              animType={"grid"}
          />
    );
  },
});
module.exports=MainPage;


