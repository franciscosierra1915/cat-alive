import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

const Map = (props) => {
    return (
        <GoogleMap 
        defaultZoom={10}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}/>
    );
};

export default withScriptjs(
    withGoogleMap(
        Map
    )
)

    {/* <Map 
      googleMapURL={'https://maps.googleapis.com/maps/api/js?v3.exp&key=AIzaSyAhLNb9-FifzWU0NWbWJ21iUNrp7pM9yXo'}
      containerElement={<div style={{ height: '400px'}}/>}
      mapElement={<div style={{height: '100%'}}/>}
      loadingElement={<p>Cargando</p>}
      center={{ lat: catLat, lng: catLng}}/> */}