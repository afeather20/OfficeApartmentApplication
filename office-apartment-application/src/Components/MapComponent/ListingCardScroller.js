import React, {Component} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardDeck from 'react-bootstrap/CardDeck';


import ListingCard from './ListingCardWrapper';

class ListingCardScroller extends Component {
	constructor(props) {
		super(props);
		
	}

	render() {

		return (
			<Container className="listing-card-scroller" fluid>
				<Row>
					<Col>
						<CardDeck className="d-inline-flex flex-md-row flex-nowrap">
							{/* Need to make this a loop that's dynamically updated
								Also need to make whichever is selected be in focus */}
							<ListingCard title="Cozy Studio Appartment" />
							<ListingCard title="1 Quiet Office Space" />
							<ListingCard title="2 Quiet Office Space" />
							<ListingCard title="3 Quiet Office Space" />
							<ListingCard title="4 Quiet Office Space" />
							<ListingCard title="5 Quiet Office Space" />
							<ListingCard title="6 Quiet Office Space" />
							<ListingCard title="7 Quiet Office Space" />
							<ListingCard title="8 Quiet Office Space" />
							<ListingCard title="9 Quiet Office Space" />
							<ListingCard title="10 Quiet Office Space" />
						</CardDeck>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ListingCardScroller