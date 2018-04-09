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
// import {observer, inject} from 'mobx-react';
import {observer, inject} from 'mobx-react/native'
import authStore from "../state-manager/mobx/authStore";


type Props = {};


@inject("authStore")
@observer
export default class ScreensBase extends Component<Props> {

    render() {


        // here we will show either the intro or screens
        // what screen to show based on user and  his type we return the proper navigator
        switch (this.props.authStore.currentScreen) {
            case 'intro':
                return (
                    <View>
                        <Text>
                            {this.props.authStore.currentScreen}
                        </Text>
                    </View>
                );
            case 'consumer': //in this case we return the consumer navigator
                return (
                    <View>
                        <Text>
                            {this.props.authStore.currentScreen}
                        </Text>
                    </View>
                );
            case 'pro-pro':
                return (
                    <View>
                        <Text>
                            {this.props.authStore.currentScreen}
                        </Text>
                    </View>
                );
            case 'pro-consumer':
                return (
                    <View>
                        <Text>
                            {this.props.authStore.currentScreen}
                        </Text>
                    </View>
                );
            default:
                return (
                    <View>
                        <Text>
                            {this.props.authStore.currentScreen}
                        </Text>
                    </View>
                );
        }
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
