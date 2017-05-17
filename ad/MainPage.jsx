import React from 'react';
import { render } from 'react-dom';

import PopUp from './PopUp/PopUp';

const IMAGE_DATA = [
    {
        src: require('./assets/images/popup/size2(800.450)/1.jpg')
    }
];



var MainPage=React.createClass({
  render:function(){

    return(
        <PopUp
            items={IMAGE_DATA}
            width={'800px'}
            height={'450px'}
            link={"https://github.com"}
            position={"center"}
            distanceX={"20px"}
            distanceY={"30px"}
            mask={true}
        />
    );
  },
});
module.exports=MainPage;


