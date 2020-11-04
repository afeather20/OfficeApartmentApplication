import React, {Component} from "react"
import "../../App.css"
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWZlYXRoZXIyMCIsImEiOiJjazhmaDlrYmEwNDg2M2dzMHRycG4wMXJzIn0._FYX6dOkYeSWZTCyQtZs0w';

class Map extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2,
            isLoaded: false
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
        this.setState({
            isLoaded: true
        });

    }

    render() {
        return (
            <div>
                <div id="geocoder" className="geocoder"></div>
                <div ref={el => this.mapContainer = el} className="mapContainer" > </div>
            </div>
        );
    }

}


export default Map