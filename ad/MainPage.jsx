import React from 'react';
import { render } from 'react-dom';

import Scalable from './Scalable/scalable';

const IMAGE_DATA = [
    {
        src: require('./assets/images/scalable/topAndBottom/size2(1440)/adSmall.jpg'),
        width:'1440px',
        height:'80px',
    },
    {
        src: require('./assets/images/scalable/topAndBottom/size2(1440)/adBig.jpg'),
        width:'1440px',
        height:'380px',
    }
];



var MainPage=React.createClass({
  render:function(){

    return(
        <Scalable
            items={IMAGE_DATA}
            width={'1440px'}
            link={"https://github.com"}
            position={"top"}
            autoDisappear={true}
            duration={1600}
            delay={2000}
            aotoNormalSize={false}
        />
    );
  },
});
module.exports=MainPage;


