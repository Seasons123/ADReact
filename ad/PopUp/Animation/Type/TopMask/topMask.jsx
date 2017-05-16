import React from 'react';
import { render } from 'react-dom';
import  PopUpAnim from '../../PopUpAnim/index';

export default class TopMask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.data.defaultValue
        };

    }


    render() {
        return (
            <div  style={{ width:this.props.data.width, height:this.props.data.height,margin:'0 auto'}}>
                hello kitty
            </div>
        );
    }

}
