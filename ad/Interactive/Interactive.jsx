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
                <LogoGather items={this.props.content}
                />
            );



    }

}
const stringOrArray = PropTypes.oneOfType([PropTypes.array, PropTypes.string]);
Interactive.propTypes = {
    content:stringOrArray,
    width: PropTypes.string,
    height:PropTypes.string,
    type:PropTypes.string,
};
Interactive.defaultProps={
    content:[],
    width:'800px',
    height:'600ox',
    type:"logoGather",
};

