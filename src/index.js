import React from 'react';
import { render } from 'react-dom';

import Slider from './Slider/Slider';



const IMAGE_DATA = [
  {
    src: require('./images/fullScreen/1.jpg'),
    alt: 'images-1',
    /*size: 'fullScreen'*/
  },
  {
    src: require('./images/fullScreen/2.jpg'),
    alt: 'images-2',
    /*size: 'fullScreen'*/
  },
  {
    src: require('./images/fullScreen/3.jpg'),
    alt: 'images-3',
    /*size: 'fullScreen'*/
  },
];

render(
  <Slider
    items={IMAGE_DATA}
    size={"fullScreen"}
    speed={1.2}
    delay={2.1}
    pause={true}
    autoplay={true}
    dots={true}
    arrows={true}
  />,
  document.getElementById('root')
);
