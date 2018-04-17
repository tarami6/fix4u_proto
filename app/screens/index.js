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
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'DrawerNavigation',
                    action: NavigationActions.navigate({routeName: 'Home'}),
                })
            ],
        });
        this.store.dispatch(actionToDispatch)

    }

    onBackPress = () => {
        console.log('backHandler pressed')
        const {dispatch} = this.store;
        console.log(this.store);
        const {navigationState} = this.store;
        console.log('navigationState',navigationState.index);
        if (navigationState.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        tryLogin(this.props.authStore, this.props.userDataStore, this.props.proAuthStore,  this.successLoginCallback.bind(this))

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    render() {
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

