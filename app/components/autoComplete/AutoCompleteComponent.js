import React from 'react';
import { View, Image, Text, StyleSheet, Component, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './styles';
import Geocoder from 'react-native-geocoding';
import {SH, SW, HH} from "../../config/styles";

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };
const myApiKey = 'AIzaSyAUL3vQQOGHgl938e6RNuDMhqQpNpXA2Nw';

let firstEnter =0;

export default class AutoComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentaddress: '', currentLatlng: [] };
    };

    handleLocationPress(data, details){
        this.props.handleLocationPress(data, details)
    }

    componentWillMount() {
        this.getUserLocationHandler();
        this.getlatlng ();
    }

    render() {
        // console.warn('current adress : ' + this.state.currentaddress)
        // console.warn(this.state.currentLatlng[0] + " " + this.state.currentLatlng[1])
        return (
            <View style={styles}>
                {/* <Button onPress={console.warn("buutun pressed") }/> */}
                <GooglePlacesAutocomplete
                    placeholder={this.state.currentaddress}
                    minLength={2} //length of text
                    textInputProps={{
                        onChangeText: (text) => {
                            // this.props.onChangeAddress(text)
                            this.setState({ currentaddress: text })
                        },
                    }}
                    width={300}
                    minWidth={300}
                    //   autoFocus={true}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={(row) => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        this.handleLocationPress(data, details)
                        // this.props.onChooseAddress()
                    }}
                    getDefaultValue={() => {
                        return this.state.currentaddress; // text input default value
                    }}
                    query={{

                        key: 'AIzaSyC0phAdvvYdwAk1LChuwnHJgEN3c_2GZjg',
                        language: 'iw' + 'en',
                        components: 'country:il',

                    }}
                    styles={{
                        description: {
                            fontWeight: 'bold',
                            width: 300,
                            marginRight: 100,
                            height: SH,
                            zIndex: 5,
                        },

                        predefinedPlacesDescription: {
                            color: '#000',
                            width: 300
                        },

                        textInputContainer: {
                            backgroundColor: 'white',
                            height: 44,
                            width: 300,
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: '#ddd',
                            borderBottomWidth: 0,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 1,
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 10,
                        },
                        listView: {
                            backgroundColor: '#fff',
                            height: HH*3,
                            marginLeft: 5
                        }

                    }
                    }

                />
            </View>
        );
    }




    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                        currentLatlng: [
                            latitude= position.coords.latitude,
                            longitude= position.coords.longitude],
                    },
                    () => this.getData( position.coords.latitude,  position.coords.longitude)
                );

            }
            , error => console.warn(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    };

    getData = (lat, lan) => {
        Geocoder.setApiKey(myApiKey);
        Geocoder.getFromLatLng(lat, lan).then(
            json => {
                var address_component = json.results[0].formatted_address;

                this.setState({ currentaddress: address_component });

            }, error => { alert(error); }
        );
    }


    getlatlng =() => {
        Geocoder.setApiKey('AIzaSyC0phAdvvYdwAk1LChuwnHJgEN3c_2GZjg');
        Geocoder.getFromLocation("new york").then(res => {

            this.setState({
                currentLatlng: {
                    latitude: res.results[0].geometry.location.lat,
                    longitude: res.results[0].geometry.location.lng,
                }
            })

        })
            .catch(err => console.warn('get latlng erorr' + err))
    }

}