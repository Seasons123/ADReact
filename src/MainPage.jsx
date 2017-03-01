import React from 'react';
import { render } from 'react-dom';

import Slider from './Slider/Slider';



const IMAGE_DATA = [
    {
        src: require('./images/size7(1008.331)/1.jpg'),
        alt: 'images-1',
    },
    {
        src: require('./images/size7(1008.331)/2.jpg'),
        alt: 'images-2',
    },
    {
        src: require('./images/size7(1008.331)/1.jpg'),
        alt: 'images-3',
    },
];

var MainPage=React.createClass({
  render:function(){

    return(
          <Slider
              items={IMAGE_DATA}
              size={"size7"}
              speed={0.4}
              delay={2.1}
              pause={true}
              autoplay={true}
              dots={true}
              arrows={true}
          />
    );
  },
});
module.exports=MainPage;