import React from 'react';
import { render } from 'react-dom';

import Interactive from './Interactive/Interactive';



var MainPage=React.createClass({
  render:function(){

    return(
        <Interactive
            type={'1'}
            text={ 'After all , tomorrow is another day '}
            fontSize={'20px'}
            fontColor={'#323232'}
            fontFamily={'Microsoft YaHei'}
            link={"https://github.com"}
            autoRoll={true}
            rollCount={2}
            interval={20}
            timingFunction={'linear'}
            direction={'left'}
        />
    );
  },
});
module.exports=MainPage;


