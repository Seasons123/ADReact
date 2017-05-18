import React from 'react';
import { render } from 'react-dom';

import PopUp from './PopUp/PopUp';

const IMAGE_DATA = [
    {
        src: require('./assets/images/popup/size2(800.450)/demo1.jpg')
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
            width={'135px'}
            height={'180px'}
            link={"https://github.com"}
            position={"bottomRight"}
            distanceX={"20px"}
            distanceY={"30px"}
            mask={false}
            autoDisappear={false}
        />
    );
  },
});
module.exports=MainPage;


