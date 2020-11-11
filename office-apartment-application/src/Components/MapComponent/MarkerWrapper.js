import React, {Component} from "react";

class MarkerWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text || '',
			isSelected: this.props.isSelected || false,
		};

		// bind 'this' so it's usable in these functions
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		window.alert("It worked! "+ this.state.text);
		// TODO remove this, it's just a proof of concept to show how a marker can be 'selected'
		this.setState({
			isSelected: !this.state.isSelected,
		});
	}

	// TODO- will probably want to move styling somewhere else?
	render() {
		const styles = {};
		styles.background = this.state.isSelected ? 'deeppink' : 'pink';

		return (
			<div onClick={this.handleClick} style={styles}>
				<p>{this.state.text}</p>
			</div>
		);
	}
}

export default MarkerWrapper