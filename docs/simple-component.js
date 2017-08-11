import React from 'react';

class Person extends React.Component {
	constructor (props) {
		super(props);

		this.state = { smiling: false };

		this.handleClick = () => {
			this.setState({smiling: !this.state.smiling});
		};
	}

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

	render () {
		return (
			<div onClick={this.handleClick}>
				{this.props.name} {this.smilingMessage}
			</div>
		);
	}
}

Person.defaultProps = {
	name: 'Guest'
};

Person.propTypes = {
	name: React.PropTypes.string
};

export default Person;