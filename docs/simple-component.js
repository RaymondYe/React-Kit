import React from 'react';
import PropTypes from 'prop-types';

class Person extends React.Component {
	constructor (props) {
		super(props);
		this.state = { smiling: false };
	}

	static PropTypes = {
		gender: PropTypes.string
	};

	static defaultProps = {
		gender: 'unknown'
	};

	componentWillMount () {
		// add event listeners (Flux Store, WebSocket, document, etc.)
	}

	componentDidMount () {
		// React.getDOMNode()
	}

	componentWillUnmount () {
		// remove event listeners (Flux Store, WebSocket, document, etc.)
	}

	get smilingMessage () {
		return (this.state.smiling) ? "is smiling" : "";
	}

	handleClick = () => {
		this.setState({smiling: !this.state.smiling});
	};

	render () {
		return (
			<div onClick={this.handleClick}>
				{this.props.name} {this.smilingMessage}
			</div>
		);
	}
}

export default Person;
