/* @flow */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Consumer from '../screens/drawer/consumer'
import Pro from '../screens/drawer/pro'
import {inject, observer} from "mobx-react/native";

@inject("authStore")
@observer
export default class CustomDrawer extends Component {


    render() {
        // consumer or pro, change based on login user props
        let currenUser = this.props.authStore.currentNavigationDrawer;
        if (!this.props.authStore.user.token){
            // currenUser = 'NoToken';

        }

            switch (currenUser) {
                case 'NoToken':
                    return (
                        <View/>
                    )

                case 'consumer':
                    return (
                        <Consumer/>
                    );
                    break;
                case 'pro':
                    return (
                        <Pro/>
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
