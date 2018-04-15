/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import LoadinPage from '../../../components/LoadinPage';
// import OpenScreen3 from '../../../components/infoScreens/OpenScreen3'
import Step from './Step'
import {inject, observer} from "mobx-react/native";

@inject("authStore")
@observer
export default class Intro2 extends Component{

    render() {
        return (
            <Step skipIntro={()=>this.props.navigation.navigate('ChooseUserType')}/>
        );
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