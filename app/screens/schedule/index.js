import React, {Component} from "react";
import {View} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
// screens:
import SchedulePro from './schedulePro'
import ScheduleConsumer from './scheduleConsumer/ScheduleConsumer1'

@inject("userDataStore")
@observer
export default class Schedule extends Component {
    constructor(props) {
        super(props)
    }

    // componentWillMount() {
    //     console.warn(this.props.userDataStore.currentUserType);
    // }


    render() {
        switch (this.props.userDataStore.currentUserType) {
            case 'pro':
                return (
                    <SchedulePro navigation={this.props.navigation} />
                );
            case 'consumer':
                return (
                    <ScheduleConsumer navigation={this.props.navigation} />
                );

            default:
                return (
                    <View/>
                )


        }
    }
}