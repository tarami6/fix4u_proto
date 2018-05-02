import {inject, observer} from "mobx-react/index";
import React, {Component} from "react";
import {View, Text, Alert} from 'react-native'
import ChooseAddress from "../addJob/addJobSteps/ChooseAddress";
import ExplainTheJob from "../addJob/addJobSteps/ExplainTheJob";
import ChooseService from "../addJob/addJobSteps";
import {StackNavigator} from "react-navigation";
import ChooseTime from "../addJob/addJobSteps/ChooseTime";
import ChooseJob from '../chooseJob'

//mapbox:
import MapboxBoilerplate from '../../components/mapbox/MapboxBoilerplate'



const AddJobNavigation = StackNavigator({
    ChooseService: {
        screen: ChooseService
    },
    ChooseTime: {
        screen: ChooseTime
    },
    ExplainTheJob: {
        screen: ExplainTheJob
    },
    ChooseAddress: {
        screen: ChooseAddress
    },
})



@inject("userDataStore")
@observer
export default class HomePage extends Component {
    // static navigationOptions = {
    //     header:null
    // };

    render(){
        if(this.props.userDataStore.userType==='pro'){
            return (
                <AddJobNavigation />
            )
        }
        else {
            return (
                <ChooseJob />
            )
        }
    }
}