/* @flow
*
* inside cardRow we activate the whatever
*
* */

import React, {Component} from 'react';
import {Alert, BackHandler, Dimensions,View, ScrollView} from 'react-native';

import Header from '../../../../components/headers/Header'

import LinierView from '../../../../components/linierView'
import {CardList} from './components/index'
import ChooseTime from "../ChooseTime";
import {inject, observer} from "mobx-react/native";


@inject("navigationStore")
@observer
export default class ChooseService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIsUp: false
        }
    }

    static navigationOptions = {
        header: null
    }


    onBackPress = () => {
        if (this.props.navigation.state.params) {
            if (this.props.navigation.state.params.drawerOpen) {
                this.props.navigation.navigate('DrawerClose');
                this.props.navigation.setParams({
                    drawerOpen: false,
                });
                return true;
            }
        }
        Alert.alert(
            'Exit App',
            'Exiting the applicationasdada?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                },], {
                cancelable: false
            }
        )
        return true;
    };


    componentDidMount() {

            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    //after Submit info:
    nextStep() {
        this.props.navigation.navigate('ChooseTime');
    }

    render() {
        return (


            <ScrollView style={{flex: 1}}>
                    <View style={{flex: 1}}>
                    <LinierView>
                        <Header head={'consumerHome'} {...this.props}/>
                    </LinierView>
                    <CardList nextStep = {this.nextStep.bind(this)}/>
                    </View>
            </ScrollView>
        );
    }
}
