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

    handleBackButton = () => {
        const {dispatch} = this.props.navigationStore;
        const {navigationState} = this.props.navigationStore;
        const routeName = navigationState.routes[0].routeName

        if(routeName === 'ConsumerNavigator' || routeName === 'ProNavigator'){
            if(navigationState.routes[0].routes[0].routes[0].index===0){
                return false
            }
            else {
                dispatch(NavigationActions.back())
                return true;
            }
        }
        else {
            if(navigationState.index===0){
                return false
            }
            dispatch(NavigationActions.back())
            return true
        }
        // Alert.alert(
        //     'Exit App',
        //     'Exiting the application?'
        // ),
        //     [{
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel'
        //     }, {
        //         text: 'OK',
        //         onPress: () => BackHandler.exitApp()
        //     },], {
        //     cancelable: false
        // }
        // return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }



    x = () => {
    }

    //after Submit info:
    nextStep() {
        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'ChooseTime',
        //
        //     params: {},
        // });
        //
        // this.props.navigationStore.dispatch(navigateAction);
        this.props.navigation.navigate('ChooseTime');
        // console.log(this.props.navigationStore);
        // console.warn(this.props.navigationStore);
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
