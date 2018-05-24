/**
 * here we gonna have all the popUps: auth modal, newJobModal
 * and the main navigator
 *
 */

import React, {Component} from 'react';
import {Alert, BackHandler, View, StatusBar} from 'react-native';
// mobx
import {inject, observer} from 'mobx-react/native';
import authStore from "../state-manager/mobx/authStore";
//navigation:
import NavigationStore from "../state-manager/mobx/navigationStore";
import {addNavigationHelpers, NavigationActions} from "react-navigation"
import AppNavigation from '../navigations';
// import NavigatorService from '../navigations/navigator';
// modals
import Modals from './modals'
// config
import {tryLogin} from "../generalFunc/tryLogin";
// google
import Geocoder from "react-native-geocoding";
// keys
import {Keys} from "../config/keys";
//components:
// Ramistesting
import LoadingPage from '../screens/modals/Loader/LoadingPage'

import {mainColor} from "../config/styles";

type Props = {};

@inject('notificationsStore')
@inject('proAuthStore')
@inject("modalsStore")
@inject("userDataStore")
@inject("authStore")
@observer
export default class ScreensBase extends Component<Props> {
    onBackPress = () => {
        // console.log('backHandler pressed')
        const {dispatch} = this.store;
        // console.log(this.store);
        const {navigationState} = this.store;
        // console.log('navigationState',navigationState.index);
        if (navigationState.index === 0) {
            // console.warn('exiting app');
            Alert.alert(
                'Exit App',
                'Exiting the application?', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }, {
                        text: 'OK',
                        onPress: () => BackHandler.exitApp()
                    },], {
                    cancelable: false
                }
            )
            return true;
            // return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
    getData = (lat, lan) => {
        Geocoder.setApiKey(Keys.google_maps_key);
        Geocoder.getFromLatLng(lat, lan).then(
            json => {
                var address_component = json.results[0].formatted_address;
                this.props.userDataStore.saveUserLocation({currentAddress: address_component, lat: lat, lon: lan});
                this.setState({userLocationFetch: false});

            }, error => {
                this.setState({userLocationFetch: false});
                alert(error);
            }
        );
    }

    constructor(props, context) {
        super(props, context);
        this.store = new NavigationStore();
        this.state = {
            tryLoginFetch: false,
            userLocationFetch: false,
            gettingUserType: false
        }
    }

    successLoginCallback() {
        this.setState({tryLoginFetch: false});
        let routeName = this.props.userDataStore.userType === 'pro' ? 'ProNavigator' : 'ConsumerNavigator';

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

    componentDidMount() {
        // in case the fetch for location takes too long we want the app to continue running
        setTimeout(() => {
            this.setState({userLocationFetch: false});
        }, 5000)


        // console.log('userData = ', this.props.userDataStore.userData)
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        this.props.userDataStore.setLoading(true);
        //try login fetch starts here
        this.setState({tryLoginFetch: true});
        tryLogin(this.props.notificationsStore, this.props.userDataStore, this.successLoginCallback.bind(this), this.tryLoginError.bind(this))
        //    get location and save to userDataStore fetch starts here
        this.setState({userLocationFetch: true});
        this.getUserLocationHandler()

    }

    tryLoginError(err) {
        this.setState({tryLoginFetch: false});
        console.log('err in try login:', err);
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
            , error => {
                console.warn(error);
                this.setState({userLocationFetch: false});
            }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    };

    render() {
        if (this.state.tryLoginFetch) {
            return (
                <LoadingPage/>
            )
        }
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor={mainColor}
                    barStyle="light-content"
                />
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

