/**
 * here we gonna have all the popUps: auth modal, newJobModal
 * and the main navigator
 *
 */

import React, {Component} from 'react';
import {
    View,
    BackHandler,
} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import authStore from "../state-manager/mobx/authStore";

//navigation:
import NavigationStore from "../state-manager/mobx/navigationStore";
import {addNavigationHelpers, NavigationActions} from "react-navigation"
import AppNavigation from '../navigations';
// import NavigatorService from '../navigations/navigator';
import Modals from './modals'
import {tryLogin} from "../generalFunc/tryLogin";
import Geocoder from "react-native-geocoding";
import {Keys} from "../config/keys";
//components:
import LoadingComponent from '../components/LoadingComponent'


type Props = {};

@inject('proAuthStore')
@inject("modalsStore")
@inject("userDataStore")
@inject("authStore")
@observer
export default class ScreensBase extends Component<Props> {
    constructor(props, context) {
        super(props, context);
        this.store = new NavigationStore();
    }

    successLoginCallback() {
        let routeName = this.props.userDataStore.userType === 'pro'? 'ProNavigator': 'ConsumerNavigator';
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: routeName,
                })
            ],
        });
        this.props.userDataStore.setLoading(false);
        this.store.dispatch(actionToDispatch)

    }



    onBackPress = () => {
        // console.log('backHandler pressed')
        const {dispatch} = this.store;
        // console.log(this.store);
        const {navigationState} = this.store;
        // console.log('navigationState',navigationState.index);
        if (navigationState.index === 0) {
            console.warn('exiting app');
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    componentDidMount() {
        // console.log('userData = ', this.props.userDataStore.userData)
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.userDataStore.setLoading(true);
        tryLogin(this.props.authStore, this.props.userDataStore, this.props.proAuthStore,  this.successLoginCallback.bind(this))
    //    get location and save to userDataStore
        this.getUserLocationHandler()

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    getUserLocationHandler() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                        currentLatLng: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    },
                    () => {
                        this.getData(position.coords.latitude, position.coords.longitude)
                    }
                );

            }
            , error => console.warn(error), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    };
    getData = (lat, lan) => {
        Geocoder.setApiKey(Keys.google_maps_key);
        Geocoder.getFromLatLng(lat, lan).then(
            json => {
                var address_component = json.results[0].formatted_address;
                this.props.userDataStore.saveUserLocation({currentAddress: address_component, lat: lat, lon: lan});

            }, error => {
                alert(error);
            }
        );
    }

    render() {
        if(this.props.userDataStore.loading){
            return (
                <LoadingComponent/>
            )
        }
        return (
            <View style={{flex: 1}}>
                <AppNavigation
                    navigation={addNavigationHelpers({
                        dispatch: this.store.dispatch,
                        state: this.store.navigationState,
                        addListener: () => { /* left empty intentionally */
                        }
                    })}
                />

                <Modals/>
            </View>
        )
    }

}

