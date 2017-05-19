import React from 'react';
import { render } from 'react-dom';

import Scalable from './Scalable/scalable';

const IMAGE_DATA = [
    {
        src: require('./assets/images/scalable/demoSmall.gif'),
        width:'960px',
        height:'80px',
    },
    {
        src: require('./assets/images/scalable/demoBig.jpg'),
        width:'960px',
        height:'450px',
    }
];



var MainPage=React.createClass({
  render:function(){

    return(
        <Scalable
            items={IMAGE_DATA}
            width={'800px'}
            link={"https://github.com"}
            position={"top"}
            autoDisappear={true}
            duration={1600}
            delay={2000}
        />
    );
  },
});
module.exports=MainPage;


