import React from 'react';
import { render } from 'react-dom';

import Interactive from './Interactive/Interactive';



var MainPage=React.createClass({
  render:function(){

    return(
        <Interactive
            type={'logoGather'}
        />
    );
  },
});
module.exports=MainPage;


