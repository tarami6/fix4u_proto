import React, {Component} from "react";
import {Text, View, BackHandler} from 'react-native';
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

        this.props.notificationsStore.removePostNotifications('active', this.props.userDataStore.focusedJob.id, this.props.userDataStore.currentUserType)
        //backHandler:
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    render() {
        let jobStatus = this.props.userDataStore.focusedJob.status
        if (this.props.userDataStore.currentUserType !== 'pro') {
            if (jobStatus === 'on_the_way') {
                return (
                    <OnTheWayConsumer {...this.props}/>
                );
            }
            else if (jobStatus === 'in_progress' || jobStatus === 'pro_payment'
                || jobStatus === 'consumer_payment' ) {
                return (
                    <InProgressConsumer {...this.props}/>
                );
            }
            else if ( jobStatus === 'consumer_review') {
                return (
                    <ConsumerReview navigation={this.props.navigation} {...this.props}/>
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
            console.warn(1);
            if (jobStatus === 'on_the_way') {
                return (
                    <OnTheWayPro {...this.props}/>
                );
            }
            else if (jobStatus === 'in_progress') {
                console.warn(2);
                return (
                    <InProgressPro {...this.props}/>
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