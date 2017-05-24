import React, { Component, PropTypes } from 'react';

import LogoGather from './type/LogoGather/logoGather';


export default class Interactive extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        if( this.props.type== "1" )
            return(
                <LogoGather />
            );



    }

}



