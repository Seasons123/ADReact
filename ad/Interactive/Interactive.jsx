import React, { Component, PropTypes } from 'react';

import LogoGather from './type/LogoGather/logoGather';


export default class Interactive extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        /*the first kind ，logoGather*/
        if( this.props.type== "logoGather" || this.props.type== "LogoGather" )
            return(
                <LogoGather />
            );



    }

}



