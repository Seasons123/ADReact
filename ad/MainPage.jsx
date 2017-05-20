import React from 'react';
import { render } from 'react-dom';

import Scalable from './Scalable/scalable';

const IMAGE_DATA = [
    {
        src: require('./assets/images/scalable/topAndBottom/size1(800)/adSmall.jpg'),
        width:'800px',
        height:'80px',
    },
    {
        src: require('./assets/images/scalable/topAndBottom/size1(800)/adBig.jpg'),
        width:'800px',
        height:'380px',
    }
];



var MainPage=React.createClass({
  render:function(){

    return(
        <Scalable
            items={IMAGE_DATA}
            width={'800px'}
            link={"https://github.com"}
            position={"right"}
            autoDisappear={true}
            duration={1600}
            delay={2000}
            aotoNormalSize={true}
        />
    );
  },
});
module.exports=MainPage;


