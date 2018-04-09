/**
 * most basic file in app,
 *
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ScreensBase from './screens';
import {Provider} from "mobx-react";
import AuthStore from './state-manager/mobx/authStore';


let authStore = new AuthStore()

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider authStore={authStore}>
                <ScreensBase/>
            </Provider>
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
