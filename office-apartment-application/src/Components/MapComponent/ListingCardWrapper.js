import React, {Component} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ListingCardWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.title || '',
			isSelected: this.props.isSelected || false,
		};
	}

	render() {
		return (
			<div>
				<Card style={{ width: '20rem' }}>
					<Card.Body>
						<Card.Title>{this.state.title}</Card.Title>
						<Card.Text>
							<i>insert data here...</i>
						</Card.Text>
						<Button variant="primary">View Listing</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default ListingCardWrapper