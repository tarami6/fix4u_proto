import React, {Component} from "react";
import {Text, View, BackHandler, Alert} from 'react-native';
//config:
import {editPostConsumerRoute, startJobRoute} from "../../config/apiRoutes";
import {fetcher} from "../../generalFunc/fetcher";
//mobx
import {inject, observer} from "mobx-react/index";
//on the way
import OnTheWayPro from './onTheWay/onTheWayPro';
import OnTheWayConsumer from './onTheWay/onTheWayConsumer'
//in progress
import InProgressPro from './inProgress/inProgressPro';
import InProgressConsumer from './inProgress/inProgressConsumer';
//pro payment step here the decides what will be the payment
import ProPaymentPro from './proPayment/proPaymentPro';
import ConsumerPaymentConsumer from "./consumerPayment/ConsumerPaymentConsumer/ConsumerPaymentConsumer";
//consumer payment step - here the consumer pays the pro
import ConsumerPaymentPro from './consumerPayment/ConsumerPaymentPro'
//Consumer review
import ConsumerReview from './consumerReview/consumerReviewConsumer';
// screens:

@inject("notificationsStore")
@inject("userDataStore")
@observer
export default class ActiveJob extends Component {

    constructor(props){
        super(props);

    }
    componentDidMount() {
        let token = this.props.userDataStore.userData.token;
        this.props.notificationsStore.removePostNotifications('active', this.props.userDataStore.focusedJob.id, this.props.userDataStore.currentUserType, token)
        //backHandler:
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        console.warn("active job index backHandler pressed")
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        this.props.userDataStore.focusJob({id: 'asd123456780'});
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    consumerCancel(){
        let jobId = this.props.userDataStore.focusedJob.id;
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

    proCancel(){
        let jobId = this.props.userDataStore.focusedJob.id;
        let sendObj = {
            status: 'canceled',
            canceled_by: 'pro'
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        };
        //start job route is also the route for pro to cancel the job
        let route = startJobRoute(jobId);
        fetcher(route, 'PATCH', this.successProCancel.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    successProCancel(res){
        this.props.userDataStore.removeProPost(res.id);
        this.props.navigation.navigate('Home');
    }

    successConsumerCancel(res){
        console.log('cancled job?', res);
        Alert.alert('עבודה בוטלה בהצלחה');
        this.props.userDataStore.removeActivePost(res.id);
        this.props.navigation.navigate('AddJob');
    }
    errorCallback(err){
        console.log('error in active job/index', err);
    }


    render() {
        if(!this.props.userDataStore.focusedJob.id){
            console.warn('no focused job')
            this.props.navigation.navigate('Home');
        }
        let jobStatus = this.props.userDataStore.focusedJob.status
        if (this.props.userDataStore.currentUserType !== 'pro') {
            //  CONSUMER SIDE consumer side //
            if (jobStatus === 'on_the_way' || jobStatus === 'canceled') {
                return (
                    <OnTheWayConsumer {...this.props} cancelJob={this.consumerCancel.bind(this)}/>
                );
            }
            else if (jobStatus === 'in_progress' || jobStatus === 'pro_payment'
                || jobStatus === 'consumer_payment' ) {
                return (
                    <InProgressConsumer {...this.props} cancelJob={this.consumerCancel.bind(this)}/>
                );
            }
            else if ( jobStatus === 'consumer_review') {
                return (
                    <ConsumerReview navigation={this.props.navigation} />
                );
            }
            else {
                return (
                    <View>
                        <Text>
                            invalid post status: {jobStatus}
                        </Text>
                    </View>
                )
            }
        }
        else {
            if (jobStatus === 'on_the_way') {
                return (
                    <OnTheWayPro {...this.props} cancelJob={this.proCancel.bind(this)} />
                );
            }
            else if (jobStatus === 'in_progress') {
                return (
                    <InProgressPro {...this.props} cancelJob={this.proCancel.bind(this)}/>
                );
            } else if (jobStatus === 'pro_payment') {
                return (
                    <ProPaymentPro {...this.props}/>
                );
            } else if (jobStatus === 'consumer_payment' || jobStatus === 'consumer_review') {
                return (
                    <ConsumerPaymentPro {...this.props}/>
                )
            }
            else {
                return <View><Text> no idea </Text></View>
            }

        }
    }
}