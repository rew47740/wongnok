import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nd2FjaGkiLCJhIjoiY2szMW9rcWVrMDNwYTNob3EyNnlwbm5zNiJ9.gts0eTXTavcqGxyA2I2wRA'

class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 98.310329,
            lat: 7.901541,
            zoom: 13
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        map.addControl(new mapboxgl.AttributionControl(), 'top-left');
        var marker = new mapboxgl.Marker()
            .setLngLat([98.310329, 7.901541])
            .addTo(map);
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} class="mapContainer" />
            </div>
        )
    }
}

export default MapBox
