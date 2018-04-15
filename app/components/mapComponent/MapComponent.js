import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
// import Geocoder from 'react-native-geocoding';
// import MapViewDirections from 'react-native-maps-directions';
// import {DirectionsRenderer,GoogleMap, withGoogleMap} from 'react-google-maps';

const usersMap = props => {
    let userLocationMarker = null;
    this.mapView = null;
    this.state = {
        coordinates: [
            {
                latitude: 37.3317876,
                longitude: -122.0054812,
            },
            {
                latitude: 37.771707,
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
                                             identifier={"current location"} />;
    }

    // const usersMarkers = props.usersPlaces.map(userPlace => (
    //     <MapView.Marker coordinate={userPlace} key={userPlace.id++} pinColor={'#FF5500'} style={{ width:1, height: 1 }}
    //         // identifier={1++}
    //                     onPress={props.press}
    //         //  image={require('../assets/images/map/icon1.png')}
    //     />));



    return (
        <View style={styles.mapContainer}>
            <MapView
                initialRegion={{
                    latitude: 32.0853,
                    longitude: 34.781768,
                    latitudeDelta: 0.0622*0.2,
                    longitudeDelta: 0.0421*0.2}}
                region={props.userLocation}
                onRegionChange={this._handleMapRegionChange}
                showsUserLocation = {true}
                style={styles.map}
                ref={c => this.mapView = c} >
                {userLocationMarker}
                {/*{ usersMarkers}*/}

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
        marginTop: 20
    },
    map: {
        width: "100%",
        height: "100%"
    }
});

export default usersMap;