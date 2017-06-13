import React from 'react';
import { render } from 'react-dom';

import Interactive from './Interactive/Interactive';

const IMAGE_DATA = [
    {
        src: require('./assets/svg/demo.svg')
    },
    {
        src: require('./assets/svg/reactLogo.svg')
    },

];

var MainPage=React.createClass({
    render:function(){

        return(
            <Interactive
                content={IMAGE_DATA}
                width='800px'
                height='500ox'
                type={'logoGather'}
            />
        );
    },
});
module.exports=MainPage;


