/* @flow */

import React, {Component} from 'react';
import {BackHandler, StyleSheet, View,} from 'react-native';
import Consumer from '../screens/drawer/consumer'
import Pro from '../screens/drawer/pro'
import {inject, observer} from "mobx-react/native";

@inject("userDataStore")
@observer
export default class CustomDrawer extends Component {



    render() {
        // consumer or pro, change based on login user props
        let currentUser = this.props.userDataStore.userType;
        if (!this.props.userDataStore.userType) {
            return (
                <View/>
            );
        }
        switch (currentUser) {
            case 'NoToken':
                return (
                    <View/>
                );
            case 'consumer':
                return (
                    <Consumer {...this.props}/>
                );
                break;
            case 'pro':
                return (
                    <Pro {...this.props}/>
                );
                break;
            default:
                return <View/>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
