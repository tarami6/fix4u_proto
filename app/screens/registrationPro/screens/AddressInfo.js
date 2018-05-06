import React from 'react';
import {View, Text, Image, TextInput, StyleSheet, Alert} from 'react-native';
import CustomHeaderRegPro from '../components/CustomHeaderRegPro'
import LinearViewBelowHeaderPro from '../components/LinearViewBelowHeaderPro';
import {submitButton} from "../../../components/modalSubmitButton";
import {SH, SW, HH} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import AutoComplete from '../../../components/autoComplete'
import {Keys} from "../../../config/keys";
import MapComponent from '../../../components/mapComponent'
import Header from '../../../components/headers/Header'

@inject("userDataStore")
@inject("proAuthStore")
@observer
export default class AddressInfo extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            company_address: '',
            text: 'כתובת',
            lat: 0,
            lon: 0,

        };
    }

    handleSubmit() {
        if (this.state.company_address) {
            this.props.proAuthStore.updatePro(this.state);
            this.props.navigation.navigate('ChoosingService')
        }
        else {
            this.props.proAuthStore.updatePro({company_address: this.props.userDataStore.userLocation.currentAddress});
            this.props.navigation.navigate('ChoosingService')

            // Alert.alert('please fill in company_address to continue')
        }
    }


    handleLocationPress(data, details) {
        let company_address = data.description;
        let place_id = data.place_id;
        this.getCoordsAndSaveToState(place_id);
        this.setState({
            company_address: company_address,
            place_id: place_id,
            details: details
        })
    }

    getCoordsAndSaveToState(itemId) {
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${itemId}&key=${Keys.places_api_web_services}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    lat: responseJson.result.geometry.location.lat,
                    lon: responseJson.result.geometry.location.lng
                })

            })
    }

    render() {
        let stateLocation = {
            lat: this.state.lat,
            lon: this.state.lon
        }
        let storeLocation = {
            lat: this.props.userDataStore.userLocation.lat,
            lon: this.props.userDataStore.userLocation.lon
        }
        let showLocation = this.state.lat === 0 ? storeLocation : stateLocation;
        return (
            <View style={styles.container}>
                <View style={styles.linear}>
                    <LinearViewBelowHeaderPro>
                        <Header head={'AddJob'} previousPage={'PersonalInfo'} props={this.props}/>
                        {/*step indicator*/}
                        <View>
                            <Image
                                source={require('../../../../assets/registration/icons/proStepImdicator2.png')}
                            />
                        </View>
                        <View style={styles.titles}>
                            <Text style={styles.locationText}>
                                מיקום העסק
                            </Text>
                            <Text style={styles.noteText}>
                                נא לציין כפי שרשום ברשויות
                            </Text>
                        </View>
                        <View style={styles.textInputView} pointerEvents="box-none">
                            <AutoComplete
                                currentAddress={this.props.userDataStore.userLocation.currentAddress}
                                handleLocationPress={this.handleLocationPress.bind(this)}
                            />
                        </View>
                    </LinearViewBelowHeaderPro>
                </View>
                <View style={styles.mapContainer}>
                    <MapComponent style={styles.map}
                                  userLocation={{
                                      latitude: showLocation.lat,
                                      longitude: showLocation.lon,
                                      latitudeDelta: 0.0622 * 0.1,
                                      longitudeDelta: 0.0421 * 0.1
                                  }}/>
                </View>

                <View style={[styles.footer, {alignItems: 'center'}]}>
                    {submitButton('המשך', 'consumer', () => {
                        this.handleSubmit()
                    })}
                </View>

            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    linear: {
        flex: 1
        // height: (SH - HH) / 3.5,
    },
    titles: {
        marginTop: SH / 60,
        alignItems: 'center'
    },
    locationText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    noteText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: SW / 80
    },
    textInput: {
        marginTop: SW / 30,
        borderColor: '#ECECEC',
        borderWidth: 2,
        backgroundColor: '#fcfcfc',
        borderRadius: 10,
        width: SW / 1.2,
        textAlign: 'right',
        paddingRight: 10,
        color: '#9b9b9b'
    },
    mapContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    footer: {
        height: SH /5,
        justifyContent: 'center',
        width: SW,
        position: 'absolute',
        bottom: 0,
        zIndex: 3,
        alignItems: 'center',
        backgroundColor: 'rgba(246, 246, 246, 0.5)'
    },
    textInputView: {
        // bottom: 10,
        height: HH * 4,
        zIndex: 3,
        overflow: 'visible'
    },

})