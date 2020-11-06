import React, {Component} from "react"

class MarkerWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {text: this.props.text}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		window.alert("It worked! "+ this.state.text);
	}

	// TODO- move styling somewhere else (probably its own css file)
	render() {
		return (
			<div onClick={this.handleClick} style={{background: 'pink'}}>
				<p>{this.state.text}</p>
			</div>
		);
	}
}

export default MarkerWrapper