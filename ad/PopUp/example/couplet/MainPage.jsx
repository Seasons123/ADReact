import React from 'react';
import { render } from 'react-dom';

import PopUp from './PopUp/PopUp';

const IMAGE_DATA = [
    {
        src: require('./assets/images/popup/size2(1440)(800.450)/demo1.jpg')
    },
    {
        src: require('./assets/images/popup/couplet/couplet1.jpg')
    },
    {
        src: require('./assets/images/popup/couplet/couplet2.jpg')
    }
];



var MainPage=React.createClass({
  render:function(){

    return(
        <PopUp
            items={IMAGE_DATA}
            width={'100px'}
            height={'360px'}
            link={"https://github.com"}
            position={"couplet"}
            distanceX={"60px"}
            distanceY={"110px"}
            mask={false}
        />
    );
  },
});
module.exports=MainPage;


