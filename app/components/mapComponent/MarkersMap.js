import React from "react";
import {StyleSheet, View} from "react-native";
    import MapView from "react-native-maps";
import {retroMap} from "../../config/mapStyles";
// import Geocoder from 'react-native-geocoding';
// import MapViewDirections from 'react-native-maps-directions';
// import {DirectionsRenderer,GoogleMap, withGoogleMap} from 'react-google-maps';


export default class usersMap extends React.Component {
    constructor(props) {
        super(props);
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
    }

    // onMarkerPress(yo='yo'){
    //     console.warn(yo)
    //     this.props.press(yo)
    // }

//   const origin = {latitude: 37.3318456, longitude: -122.0296002};
// const destination = {latitude: 37.771707, longitude: -122.4053769};
//     GOOGLE_MAPS_APIKEY = 'AIzaSyAUL3vQQOGHgl938e6RNuDMhqQpNpXA2Nw';
    componentWillMount() {
        if (this.props.userLocation) {
            this.userLocationMarker = <MapView.Marker onPress={this.props.onPress} pinColor={'green'}
                                                      coordinate={this.props.userLocation}
                                                      identifier={"current location"}/>;
        }
    }


    render() {
        this.usersMarkers = this.props.usersPlaces.map((openJob, index) => {
            //here we arrange the data from the db to sync with google maps:
            let coordinates = {
                latitude: openJob.lat,
                longitude: openJob.lon

            }
            return (
                <MapView.Marker
                    coordinate={coordinates}
                    key={openJob.id}
                    pinColor={'#FF5500'}
                    style={{width: 1, height: 1}}
                    onPress={() => this.props.onMarkerPress(openJob, index)}

                    // identifier={1++}
                    //             onPress={(yo) => {
                    //                 console.log('marker:', yo);
                    //             }}
                    //  image={require('../../../assets/images/map/18672972_1766504230032438_2439149980771512775_o.jpg')}
                />)
        });

        return (
            <View style={styles.mapContainer}>
                <MapView
                    initialRegion={{
                        latitude: 32.7917735,
                        longitude: 34.9829165,
                        latitudeDelta: 0.0622 * 0.2,
                        longitudeDelta: 0.0421 * 0.2
                    }}
                    region={this.props.userLocation}
                    onRegionChange={this._handleMapRegionChange}
                    showsUserLocation={true}
                    style={styles.map}
                    customMapStyle={retroMap}
                    loadingEnabled={true}
                    ref={c => this.mapView = c}>
                    {this.userLocationMarker}
                    {this.usersMarkers}

                    {/*<MapView.Polyline*/}
                    {/*coordinates={props.coords}*/}
                    {/*strokeWidth={4}*/}
                    {/*strokeColor="blue"/>*/}


                </MapView>
            </View>
        )
            ;
    }
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

// export default usersMap;