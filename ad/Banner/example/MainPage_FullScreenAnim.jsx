import React from 'react';
import { render } from 'react-dom';

import Banner from './Banner/Banner';



const IMAGE_DATA = [
    {
        src: require('./assets/images/banner/fullScreen/size2(1920.1047)/page1another.jpg'),

    },
    {
        src: require('./assets/images/banner/fullScreen/size2(1920.1047)/page2.jpg'),
    },
    {
        src: require('./assets/images/banner/fullScreen/size2(1920.1047)/page2another.jpg'),
    },
    {
        src: require('./assets/images/banner/fullScreen/page3/pageOneLeft.png'),
    },
    {
        src: require('./assets/images/banner/fullScreen/page3/pageOneRight.png'),
    },
    {
        src: require('./assets/images/banner/fullScreen/page1/pageOneMainPicture.png'),
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
                arrowDefault={false}
                thumb={false}
                animType={"fullScreenAnim"}
            />
        );
    },
});
module.exports=MainPage;


