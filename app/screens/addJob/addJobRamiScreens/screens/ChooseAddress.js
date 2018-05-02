import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HH, mainStyles, SH, SW} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";
import {inject, observer} from "mobx-react/native";
import {fetcher} from "../../../../generalFunc/fetcher";
import AutoComplete from '../../../../components/autoComplete'
import {Keys} from "../../../../config/keys";

import MapComponent from '../../../../components/mapComponent'
import LinierView from '../../../../components/linierView';
import Header from '../../../../components/headers/Header'

@inject("userDataStore")
@inject("addJobStore")
@inject("authStore")
@observer
export default class ChooseAddress extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        this.state = {
            text: 'כתובת',
            payment_type: 'cash',
            lat: 0,
            lon: 0,
            currentLatLng: {},
        };
    }

    handleSubmit() {

        if (this.state.place_id) {
            // if (this.state.details.address_components[0].long_name.length > 0) {
            //     Alert.alert('please fill in building number as well');
            // }
            // else {
            this.getCoordsAndSubmitData(this.state.place_id)

            // }
        }
        else {
            let {lat, lon, currentAddress} = this.props.userDataStore.userLocation;
            if (!lat || !lon || !currentAddress) {
                Alert.alert('המערכת לא זיהתה את המיקום שלך, אנא הכנס מיקום')
            }
            else {
                this.submitJob(lat, lon, currentAddress)
            }
            // console.warn(lat, lon, currentAddress);
            // Alert.alert('please choose proper address')
        }
        // this.props.navigation.navigate('ApplyBaseScreen');

    }

    submitJob(lat, lon, address = this.state.address) {

        let objToSave = {
            lat: lat,
            lon: lon,
            address: address,
            payment_type: this.state.payment_type,
            service_fee: '100'
        }
        this.props.addJobStore.editNewJobInfo(objToSave);
        let item = this.props.addJobStore.returnFetchObj();
        let headers = {};

        // this means we do nt send image
        if (item.service === this.props.addJobStore.newJobInfo.service) {
            headers = {
                'Accept': `application/json`,
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + this.props.userDataStore.userData.token
            };
        }
        //in case we do wanna send image
        else {
            headers = {
                'Accept': `application/json`,
                'content-type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
                'Authorization': 'JWT ' + this.props.userDataStore.userData.token
            };
            item = {
                type: 'formData',
                payload: item
            }
        }
        fetcher('api/posts/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), item, headers);

    }

    successCallback(response) {
        if (response.id) {
            this.props.userDataStore.addJob(response)
            this.props.userDataStore.focusConsumerJob(response);
            this.props.navigation.navigate('ApplyBaseScreen');
        }
        console.warn('success addJob!', response);
    }

    //autoCompleteHandling:

    errorCallback(response) {
        console.warn('error addJob');
        console.log('error in addJob:', response)
    }

    //get the lat and lon with the place_id
    getCoordsAndSubmitData(itemId) {
        // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJrTLr-GyuEmsRBfy61i59si0&key=YOUR_API_KEY
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${itemId}&key=${Keys.places_api_web_services}`)
            .then((response) => response.json())
            .then((responseJson) => {
                let lon = responseJson.result.geometry.location.lng;
                let lat = responseJson.result.geometry.location.lat;
                this.submitJob(lat, lon)

            })
    }

    getCoordsAndSaveToState(itemId) {
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${itemId}&key=${Keys.places_api_web_services}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn(responseJson.result.geometry);
                this.setState({
                    lat: responseJson.result.geometry.location.lat,
                    lon: responseJson.result.geometry.location.lng
                })

            })
    }

    handleLocationPress(data, details) {
        let address = data.description;
        let place_id = data.place_id;
        this.getCoordsAndSaveToState(place_id);
        this.setState({
            address: address,
            place_id: place_id,
            details: details
        })
    }


    render() {

        //here we check if the user wants to choose his current location or other
        let stateLocation = {
            lat: this.state.lat,
            lon: this.state.lon
        }
        let storeLocation = {
            lat: this.props.userDataStore.userLocation.lat,
            lon: this.props.userDataStore.userLocation.lon
        }
        let showLocation = this.state.lat === 0 ? storeLocation : stateLocation;

        let leftPaymentIcon = this.state.payment_type === 'cash' ? styles.activeChoiceStyle : {};
        let rightPaymentIcon = this.state.payment_type === 'cash' ? {} : styles.activeChoiceStyle;

        return (
            <View style={styles.container}>
                {/*Linear under header 0.8 flex*/}
                <LinierView>
                    <Header head={'AddJob'} previousPage={'ExplainTheJob'} props={this.props}/>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Image
                            source={require('../../../../../assets/addJob/icons/stepIndicatorConsumer3.png')}
                        />
                    </View>

                    <View style={styles.textInputView} pointerEvents="box-none">
                        <Text style={mainStyles.whiteTitle}>הכנס כתובת</Text>

                        <AutoComplete
                            currentAddress={this.props.userDataStore.userLocation.currentAddress}
                            handleLocationPress={this.handleLocationPress.bind(this)}
                        />
                        {/*<TextInput*/}
                        {/*multiline={true}*/}
                        {/*underlineColorAndroid={'transparent'}*/}
                        {/*style={styles.textInput}*/}
                        {/*onChangeText={(text) => this.setState({text})}*/}
                        {/*value={this.state.text}*/}
                        {/*/>*/}
                    </View>

                </LinierView>


                <View style={{flex: 2, backgroundColor: 'red'}}>
                    <View>
                        <MapComponent style={styles.map}
                                      userLocation={{
                                          latitude: showLocation.lat,
                                          longitude: showLocation.lon,
                                          latitudeDelta: 0.0622 * 0.1,
                                          longitudeDelta: 0.0421 * 0.1
                                      }}/>
                    </View>

                    <View style={{position: 'absolute', zIndex: 5, bottom: -50, flex: 1}}>
                        {/*Footer with payment method and button 0.8*/}
                        <View style={styles.footer}>
                            <View style={{flex: 1}}>
                                <View style={styles.paymentMethodView}>
                                    <TouchableOpacity onPress={() => this.setState({payment_type: 'cash'})}>
                                        <View style={[styles.iconViewLeft, leftPaymentIcon]}>
                                            <Image
                                                source={require('../../../../../assets/addJob/icons/CashPayIcon.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.borderViewMiddle}/>
                                    <TouchableOpacity onPress={() => this.setState({payment_type: 'credit_card'})}>
                                        <View style={[styles.iconViewRight, rightPaymentIcon]}>
                                            <Image
                                                source={require('../../../../../assets/addJob/icons/CreadiPayIcon.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/*Button*/}
                            {/*<View style={styles.container}>*/}
                            <View style={{alignItems: 'center', width: SW, marginBottom: 30}}>
                                {submitButton('המשך', 'consumer', this.handleSubmit.bind(this))}
                            </View>
                            {/*</View>*/}
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        height: SH - HH + 20,
        width: SW,
        flex: 1,
    },
    linear: {
        flex: 0.8
    },
    textInputView: {
        marginTop: SH / 15,
        height: HH * 4,
        zIndex: 3,
        alignItems: 'center',
    },
    textInput: {
        borderColor: '#ECECEC',
        borderWidth: 2,
        backgroundColor: '#fcfcfc',
        borderRadius: 5,
        width: SW / 1.16,
        textAlign: 'right',
        paddingRight: 10,
        color: '#9b9b9b'
    },
    // Footer
    footer: {
        flex: 1.2,
        justifyContent: 'center',
        backgroundColor: 'rgba(244, 244, 244, 0.8)',
        zIndex: 3,
        marginBottom: 50,
        height: SH / 4,
    },
    paymentMethodView: {
        height: SH / 12,
        marginTop: SW / 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconViewLeft: {
        alignSelf: 'center',
        marginRight: SW / 8,
    },
    borderViewMiddle: {
        height: SH / 15,
        width: 3,
        borderLeftWidth: 2,
        borderColor: '#979797',
        alignSelf: 'center',
    },
    iconViewRight: {
        alignSelf: 'center',
        marginLeft: SW / 8,
    },
    map: {
        position: 'absolute',
        bottom: 0,
    },
    activeChoiceStyle: {
        borderWidth: 0.3,
        borderColor: '#000',
    }
    // map: {
    //     width: 100,
    //     height: 100
    // }
})