import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
// import Geocoder from 'react-native-geocoding';
// import MapViewDirections from 'react-native-maps-directions';
// import {DirectionsRenderer,GoogleMap, withGoogleMap} from 'react-google-maps';

let usersMap = props => {
    let userLocationMarker = null;
    this.mapView = null;
    this.state = {
        coordinates: [
            {
                latitude: 33.3317876,
                longitude: -122.0054812,
            },
            {
                latitude: 33.771707,
                longitude: -122.4053769,
            },
        ],
    };

//   const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAUL3vQQOGHgl938e6RNuDMhqQpNpXA2Nw';

    if (props.userLocation) {
        userLocationMarker = <MapView.Marker onPress={ props.press} pinColor={'green'}
                                             coordinate={props.userLocation}
                                             identifier={"current location"}
                                             image={require('../../../assets/map_image3.png')}/>;
    }

    //markers:







    return (
        <View style={styles.mapContainer}>
            <MapView
                initialRegion={{
                    latitude: 35.0853,
                    longitude: 34.781768,
                    latitudeDelta: 0.0622*0.2,
                    longitudeDelta: 0.0421*0.2}}
                region={props.userLocation}
                // onRegionChange={this._handleMapRegionChange}
                // showsUserLocation = {true}
                style={styles.map}
                ref={c => this.mapView = c} >
                {userLocationMarker}
                {/*<MapView.Polyline*/}
                    {/*coordinates={props.coords}*/}
                    {/*strokeWidth={4}*/}
                    {/*strokeColor="blue"/>*/}

            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: "100%",
        height: "100%",
    },
    map: {
        width: "100%",
        height: "100%"
    }
});

export default usersMap;