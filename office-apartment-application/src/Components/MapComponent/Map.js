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
            isLoaded: false,
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
            console.log("point");
            // build element
            let el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '10px';
            el.style.height = '10px';
            el.style.background = 'blue';

            el.addEventListener('click', () => {
                window.alert("It worked! "+point.properties.label);
            });

            const options = { element: el };
            // add element to map
            new mapboxgl.Marker(options)
                .setLngLat(point.geometry.coordinates)
                .addTo(this.map);
        });
        

        this.setState({
            isLoaded: true
        });

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
            </div>
        );
    }

}


export default Map