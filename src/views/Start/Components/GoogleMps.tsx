import * as React from "react";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";  
  
const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: -12.1347369, lng: -76.9882856 }}
    >
      <Marker
        position={{ lat: -12.1347369, lng: -76.9882856 }}
      />
    </GoogleMap>
  ));
export default MapWithAMarker;