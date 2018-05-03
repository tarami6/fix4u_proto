import React, {Component} from "react";
import {Text, View} from 'react-native';
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


@inject("userDataStore")
@observer
export default class ActiveJob extends Component {

    constructor(props){
        super(props);

    }

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    render() {
        let jobStatus = this.props.userDataStore.focusedJob.status
        if (this.props.userDataStore.currentUserType !== 'pro') {
            if (jobStatus === 'on_the_way') {
                return (
                    <OnTheWayConsumer/>
                );
            }
            else if (jobStatus === 'in_progress' || jobStatus === 'pro_payment'
                || jobStatus === 'consumer_payment' ) {
                return (
                    <InProgressConsumer/>
                );
            }
            else if ( jobStatus === 'consumer_review') {
                return (
                    <ConsumerReview navigation={this.props.navigation}/>
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
                    <OnTheWayPro {...this.props}/>
                );
            }
            else if (jobStatus === 'in_progress') {
                return (
                    <InProgressPro {...this.props}/>
                );
            } else if (jobStatus === 'pro_payment') {
                return (
                    <ProPaymentPro {...this.props}/>
                );
            } else if (jobStatus === 'consumer_payment') {
                return (
                    <ConsumerPaymentPro {...this.props}/>
                )
            }
            else if (jobStatus === 'consumer_review') {
                this.props.navigation.navigate('Home');
                return (
                    <View>
                        <Text>
                            The consumer is currently reviewing the job
                        </Text>
                    </View>
                );
            }
            else {
                return <View><Text> no idea </Text></View>
            }

        }
    }
}