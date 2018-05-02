import React, {Component} from 'react'
import {inject, observer} from "mobx-react/native";
import CustomDrawer from "../components/customDrawer";
import {DrawerNavigator, StackNavigator} from "react-navigation";
import ChooseJob from "../screens/chooseJob";
import {SW} from "../config/styles";
import ChooseAddress from "../screens/addJob/addJobSteps/ChooseAddress";
import ExplainTheJob from "../screens/addJob/addJobSteps/ExplainTheJob";
import ChooseService from "../screens/addJob/addJobSteps";
import ChooseTime from "../screens/addJob/addJobSteps/ChooseTime";

@inject("userDataStore")
@observer
export default class HomeNavigation extends Component<Props> {

    render() {
        let HomePage = this.props.userDataStore.userType !== 'pro' ? AddJobNavigation : ChooseJob;
        const DrawerNavigation = DrawerNavigator({
            Home: {
                screen: HomePage,
            },
        }, {
            contentComponent: CustomDrawer,
            drawerWidth: SW
        })
        return (
            <DrawerNavigation/>
        )
    }
}

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