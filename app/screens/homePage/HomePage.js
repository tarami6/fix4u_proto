import {inject, observer} from "mobx-react/index";
import React, {Component} from "react";
import {View, Text} from 'react-native'
import ChooseAddress from "../addJob/addJobRamiScreens/screens/ChooseAddress";
import ExplainTheJob from "../addJob/addJobRamiScreens/screens/ExplainTheJob";
import ChooseService from "../addJob/addJobSteps";
import {StackNavigator} from "react-navigation";
import ChooseTime from "../addJob/addJobRamiScreens/screens/ChooseTime";
import CustomHeaderAddJob from '../addJob/addJobRamiScreens/components/CustomHeaderAddJob'
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
@inject("authStore")
@inject("proAuthStore")
@observer
export default class HomePage extends Component {
    static navigationOptions = {
        header: (/* Your custom header */
            <CustomHeaderAddJob/>
        ),
    };

    render(){
        return (
            <View>
                <Text>
                    {this.props.userDataStore.userType}
                </Text>
            </View>
        )
    }
}