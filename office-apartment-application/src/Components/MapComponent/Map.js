import React, {Component} from "react";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import MarkerWrapper from './MarkerWrapper'
import ListingCardScroller from './ListingCardScroller'

import "../../App.css"

mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';

class Map extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lng: -98,
			lat: 39,
			zoom: 4,
			isLoaded: false,
			currentSelection: null,
		};
	}

	componentDidMount() {
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});

		let geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		});

		// Add geolocate control to the map.
		this.map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true
			})
		);

		document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
		
		const mapPointJson = this.getMapPointData();
		mapPointJson.features.forEach((point) => {
			// build element
			const el = document.createElement('div');
			ReactDOM.render(<MarkerWrapper text={point.properties.label} />, el);

			// add element to map
			const options = { element: el };
			new mapboxgl.Marker(options)
				.setLngLat(point.geometry.coordinates)
				.addTo(this.map);
		});

		this.setState({
			isLoaded: true
		});

		this.map.on('move', () => {
			this.setState({
				lng: this.map.getCenter().lng.toFixed(4),
				lat: this.map.getCenter().lat.toFixed(4),
				zoom: this.map.getZoom().toFixed(2)
			});
		})

	}

	// TODO- this is just for some test data, but we'll probably want some type of structure like this
	getMapPointData() {
		return {
			'type': 'Feature',
			'features': [
				{
					'properties': {
						'id': 1,
						'label': 'House 1',
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [-78.836754, 40.242299], // Note: long, lat
					}
				},
				{
					'properties': {
						'id': 2,
						'label': 'Building 2',
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [-78.828488, 40.229427], // Note: long, lat
					}
				},
			]
		};
	}

	render() {
		return (
			<div>
				<div id="geocoder" className="geocoder"></div>
				<div ref={el => this.mapContainer = el} className="mapContainer" > </div>

				{/* Listing Data will be passed to this object, as well as which listing is currently selected */}
				<ListingCardScroller />
			</div>
		);
	}

}


export default Map