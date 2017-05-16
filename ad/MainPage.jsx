import React from 'react';
import { render } from 'react-dom';

import PopUp from './PopUp/PopUp';

const IMAGE_DATA = [
    {
        src: require('./assets/images/size5(960.380)/1.jpg')
    }
];



var MainPage=React.createClass({
  render:function(){

    return(
        <PopUp
            items={IMAGE_DATA}
            width={'960px'}
            height={'380px'}
            link={"https://github.com/"}
            type={"topMask"}
        />
    );
  },
});
module.exports=MainPage;


