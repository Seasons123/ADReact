import React from 'react';
import { render } from 'react-dom';

import Banner from './Banner/Banner';



const IMAGE_DATA = [
    {
        src: require('./assets/images/banner/fullScreen/size2(1920.1047)/page1.png'),
        alt: 'images-1',

    },
    {
        src: require('./assets/images/banner/fullScreen/size2(1920.1047)/page2.jpg'),
        alt: 'images-2',
        textHeader:'Banner animation demo',
        textOne:'Today is not another day ,today I will create something beautiful ',
        textTwo:'Study hard , play harder',
        textColor:'#323232',
        textPosition:'bottomLeft'
    },
    {
        src: require('./assets/images/banner/fullScreen/size2(1920.1047)/page3.jpg'),
        alt: 'images-3',
        textHeader:'Banner animation demo picture 3',
        textOne:'Today is not another day ,today I will create something beautiful ',
        textTwo:'Study hard , play harder',
        textColor:'#323232',
        textPosition:'upRight'
    }
];

var MainPage=React.createClass({
    render:function(){

        return(
            <Banner
                items={IMAGE_DATA}
                width={'100%'}
                height={'100%'}
                delay={0}
                duration={1450}
                autoPlaySpeed={5000}
                autoPlay={false}
                pause={false}
                arrow={true}
                thumb={false}
                animType={"fullScreenAnim"}
            />
        );
    },
});
module.exports=MainPage;


