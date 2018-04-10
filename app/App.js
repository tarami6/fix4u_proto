/**
 * The bottom component
 * also:
 * manages notifications data transfer to mobx
 * keeps the user logged on this phone as long as he didn't logout - asyncStorage login
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
import AddJobStore from './state-manager/mobx/addJobStore'

let authStore = new AuthStore();

let addJobStore = new AddJobStore();

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider authStore={authStore} addJobStore={addJobStore}>
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
        // marginBottom: 5,
    },
});
