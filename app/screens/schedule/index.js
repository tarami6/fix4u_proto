import React, {Component} from "react";
import {Alert, View} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
// screens:
import SchedulePro from './schedulePro'
import ScheduleConsumer from './scheduleConsumer/'
import {editPostConsumerRoute} from "../../config/apiRoutes";
import {fetcher} from "../../generalFunc/fetcher";

@inject("modalsStore")
@inject("notificationsStore")
@inject("userDataStore")
@observer
export default class Schedule extends Component {
    constructor(props) {
        super(props)
    }

    consumerCancel(job) {


        let sendObj = {
            status: 'canceled',
            canceled_by: 'consumer'
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        };
        //start job route is also the route for pro to cancel the job
        let route = editPostConsumerRoute(jobId);
        fetcher(route, 'PATCH', this.successConsumerCancel.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    proCancel(job) {
        this.props.userDataStore.focusJob(job);
        this.props.modalsStore.showModal('proCancelJobModal');
        // let sendObj = {
        //     status: 'canceled',
        //     canceled_by: 'pro'
        // };
        // let headers = {
        //     token: this.props.userDataStore.userData.token
        // };
        // //start job route is also the route for pro to cancel the job
        // let route = startJobRoute(jobId);
        // fetcher(route, 'PATCH', this.successProCancel.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    successProCancel(res) {
        this.props.userDataStore.removeProPost(res.id);
    }

    successConsumerCancel(res) {
        console.log('cancled job?', res);
        Alert.alert('עבודה בוטלה בהצלחה');
        this.props.navigation.navigate('AddJob');
        this.props.userDataStore.removeOpenPost(res.id);
        this.props.userDataStore.focusConsumerJob(res.id)
    }

    errorCallback(err) {
        console.log('error in active job/index', err);
    }

    render() {
        switch (this.props.userDataStore.currentUserType) {
            case 'pro':
                return (
                    <SchedulePro navigation={this.props.navigation} cancelJob={this.proCancel.bind(this)}/>
                );
            case 'consumer':
                return (
                    <ScheduleConsumer navigation={this.props.navigation} cancelJob={this.proCancel.bind(this)}/>
                );

            default:
                return (
                    <View/>
                )


        }
    }
}