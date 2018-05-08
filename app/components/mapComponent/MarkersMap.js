import React from "react";
import {StyleSheet, View} from "react-native";
import MapView from "react-native-maps";
import {retroMap} from "../../config/mapStyles";
import {inject, observer} from "mobx-react/index";
// import Geocoder from 'react-native-geocoding';
// import MapViewDirections from 'react-native-maps-directions';
// import {DirectionsRenderer,GoogleMap, withGoogleMap} from 'react-google-maps';


@inject('openJobsStore')
@observer
export default class usersMap extends React.Component {
    constructor(props) {
        super(props);
        this.mapView = null;
    }



    render() {


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
                    style={styles.map}
                    customMapStyle={retroMap}
                    loadingEnabled={true}
                    ref={c => this.mapView = c}>
                    {this.userLocationMarker}
                    {this.props.openJobsStore.openJobsList.map((openJob, index) => {
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
                                 image={require('../../../assets/map_icon.png')}
                            />)
                    })}

                </MapView>
            </View>
        );
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