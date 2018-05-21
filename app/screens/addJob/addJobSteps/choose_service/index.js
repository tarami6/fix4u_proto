/* @flow
*
* inside cardRow we activate the whatever
*
* */

import React, {Component} from 'react';
import {Alert, BackHandler, Dimensions, ScrollView} from 'react-native';

import Header from '../../../../components/headers/Header'

import LinierView from '../../../../components/linierView'
import {CardList} from './components/index'
import ChooseTime from "../ChooseTime";
import {inject, observer} from "mobx-react/native";



@inject("navigationStore")
@observer
export default class ChooseService extends Component {

    static navigationOptions = {
        header: null
    }
    onBackPress = () => {
        console.warn("choose Service backHandler")
        if (this.props.navigation.state.params) {
            if(this.props.navigation.state.params.drawerOpen){
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

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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
            <ScrollView style={{flex:1}}>
                    <LinierView>
                        <Header head={'consumerHome'} {...this.props}/>
                    </LinierView>
                    <CardList nextStep={this.nextStep.bind(this)}/>
            </ScrollView>
        );
    }
}
