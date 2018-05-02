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
import {Container, Content, Card, CardItem, Body, Text, Icon} from 'native-base';

import {addNavigationHelpers, NavigationActions} from "react-navigation";
import Header from '../../../../components/headers/Header'

import LinierView from '../../../../components/linierView'
import {CardList, CustomHeader} from './components/index'
import ChooseTime from "../ChooseTime";
import {inject, observer} from "mobx-react/native";

const {width, height} = Dimensions.get('window');

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
        this.props.navigation.navigate('ChooseTime');
    }

    render() {
        return (
            <Container>
                <Content>
                    <LinierView>
                        <Header head={'consumerHome'} {...this.props}/>
                    </LinierView>
                    <CardList nextStep={this.nextStep.bind(this)}/>
                </Content>
            </Container>
        );
    }
}
