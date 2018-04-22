import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {Keys} from "../../config/keys";
import {SH, SW} from "../../config/styles";
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken(Keys.mapbox);

export default class MapboxBoilerplate extends Component<{}> {
    renderAnnotations () {
        return (
            <View>
            <Mapbox.PointAnnotation
                key='pointAnnotation'
                id='pointAnnotation'
                coordinate={[34.781768, 32.0873]}>

                <View style={styles.annotationContainer}>
                    <View style={styles.annotationFill} />
                </View>
                <Mapbox.Callout title='Look! An annotation!' />
            </Mapbox.PointAnnotation>
            </View>

        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Mapbox.MapView
                    styleURL={Mapbox.StyleURL.Dark}
                    zoomLevel={15}
                    centerCoordinate={[34.781768, 32.0853]}
                    style={styles.container}>
                    {this.renderAnnotations()}
                </Mapbox.MapView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        transform: [{ scale: 0.6 }],
    }
});