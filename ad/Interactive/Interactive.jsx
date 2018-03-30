import React, { Component, PropTypes } from 'react';

import GraphFocus from './type/GraphFocus/graphFocus';
import ForceDirectedGraph from './type/ForceDirectedGraph/ForceDirectedGraph';


export default class Interactive extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        /*the first kind ，GraphFocus*/
        if( this.props.type== "graphFocus" || this.props.type== "GraphFocus" )
            return(
                <GraphFocus items={this.props.content}
                />
            );
        /*the secend kind ，ForceDirectedGraph*/
        if( this.props.type== "forceDirectedGraph" || this.props.type== "ForceDirectedGraph" )
            return(
                <ForceDirectedGraph items={this.props.content}
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

