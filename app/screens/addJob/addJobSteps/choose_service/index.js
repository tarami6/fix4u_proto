/* @flow
*
* inside cardRow we activate the whatever
*
* */

import React, {Component} from 'react';
import {
    View,
    Image,
    Platform,
    Dimensions,
    StyleSheet,
    Alert,
    BackHandler
} from 'react-native';
import {Container, Header, Content, Card, CardItem, Body, Text, Icon} from 'native-base';

import {addNavigationHelpers, NavigationActions} from "react-navigation"

import LinierView from '../../../../components/linierView'
import {CardList, CustomHeader} from './components/index'
import ChooseTime from "../../addJobRamiScreens/screens/ChooseTime";
import {inject, observer} from "mobx-react/native";

const {width, height} = Dimensions.get('window')

@inject("navigationStore")
@observer
export default class ChooseService extends Component {

    static navigationOptions = {
        header: null
    }

    //BackHandler s:
    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
    }
    //
    // handleBackButton = () => {
    //     console.warn('index is:', this.props.navigationStore.navigationState.index)
    //     if (this.props.navigationStore.navigationState.index === 0) {
    //         Alert.alert('index is:', this.props.navigationStore.navigationState.index)
    //         // return false;
    //     }
    //     this.props.navigationStore.dispatch(NavigationActions.back());
    //     return true;
    //     // Alert.alert(
    //     //     'Exit App',
    //     //     'Exiting the application?'
    //     // ),
    //     //     [{
    //     //         text: 'Cancel',
    //     //         onPress: () => console.log('Cancel Pressed'),
    //     //         style: 'cancel'
    //     //     }, {
    //     //         text: 'OK',
    //     //         onPress: () => BackHandler.exitApp()
    //     //     },], {
    //     //     cancelable: false
    //     // }
    //     // return true;
    // }
    //
    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }
    componentWillMount(){
        // console.warn('index is:', this.props.navigationStore.navigationState.index)
        // console.log('chooseService navigationState:', this.props.navigationStore.navigationState)
    }


    x = () => {
    }

    //after Submit info:
    nextStep() {
        this.props.navigation.navigate('ChooseTime');
    }

    render() {
        return (
            <Container>
                <Content>
                    <LinierView>
                        <CustomHeader/>
                    </LinierView>
                    <CardList nextStep={this.nextStep.bind(this)}/>
                </Content>
            </Container>
        );
    }
}
