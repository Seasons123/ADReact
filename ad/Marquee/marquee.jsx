import React, { Component } from 'react';
import './css/marquee.css';

class Marquee extends Component {

	constructor(props) {
		super(props);

		this.state = {
			scrollingStatus: 'running'
		}
	}

	onMarqueeMouseMove() {
		this.setState({scrollingStatus: 'paused'});
	}

	onMarqueeMouseOut() {
		this.setState({scrollingStatus: 'running'});
	}

	render() {
		const direction = this.props.direction ;
		const interval = this.props.interval;
		const timingFunction = this.props.timingFunction;
		const className = 'marquee_' + direction;
        const circleCount = this.props.autoRoll? ' infinite ': this.props.rollCount;
		const animationStyle = className + ' ' + interval + 's ' + timingFunction + ' ' + circleCount + ' ' + this.state.scrollingStatus;

		return (
			<div style={{width: '80%', margin: '6px auto'}}>
				<div className={className}>
					<div style={{animation: animationStyle}} onMouseMove={this.onMarqueeMouseMove.bind(this)} onMouseOut={this.onMarqueeMouseOut.bind(this)}>
						<a href={this.props.link}
						   style={{fontSize:this.props.fontSize,
							   color: this.props.fontColor,
							   fontFamily:this.props.fontFamily,
							   textDecoration:'none'}}>
							{this.props.text}
						</a>
					</div>
				</div>
			</div>
		);
	}
}

Marquee.propsTypes = {
	text: React.PropTypes.string.isRequired,
	direction: React.PropTypes.string.isRequired,
	interval: React.PropTypes.number.isRequired,
	timingFunction: React.PropTypes.string.isRequired,
	link:React.PropTypes.string
};
Marquee.propTypes = {
    text: PropTypes.string,
    fontSize:PropTypes.string,
    fontColor:PropTypes.string,
    fontFamily:PropTypes.string,
    link:PropTypes.string,
    autoRoll:PropTypes.bool,
    rollCount:PropTypes.number,
    interval:PropTypes.number,
    timingFunction:PropTypes.string,
    direction:PropTypes.string,
};
Marquee.defaultProps={
    text: 'After all , tomorrow is another day ',
    fontSize:'20px',
    fontColor:'#323232',
    fontFamily:'Microsoft YaHei',
    link:"https://github.com/Seasons123",
    autoRoll:true,
    rollCount:2,
    interval:20,
    timingFunction:'linear',
    direction:'left'
};

export default Marquee;