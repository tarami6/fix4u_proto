/**
 * here we gonna have all the popUps: auth modal, newJobModal
 * and the main navigator
 *
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import authStore from "../state-manager/mobx/authStore";
import AppNavigation from '../navigations';
import Modals from './modals'

//screens
// import Intro from './intro'
// import ChooseUserType from './choose_user_type';
// import ChooseService from './addJob/addJobSteps/choose_service'
import Modal from "react-native-modal";

type Props = {};


@inject("authStore")
@observer
export default class ScreensBase extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <AppNavigation/>
                <Modals />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
