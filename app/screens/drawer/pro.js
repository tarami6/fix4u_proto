/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {inject, observer} from "mobx-react/native";

@inject("authStore")
@observer
export default class Pro extends Component {
    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity onPress={()=>{this.props.authStore.changeNavigation('Consumer')}}>
                <Text>I'm the Pro component</Text>
              </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
