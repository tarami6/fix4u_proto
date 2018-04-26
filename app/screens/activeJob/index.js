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
import ProPaymentConsumer from './proPayment/proPaymentConsumer'
//consumer payment step - here the consumer pays the pro
import ConsumerPaymentPro from './consumerPayment/ConsumerPaymentPro';
import ConsumerPaymentConsumer from './consumerPayment/ConsumerPaymentConsumer'
// screens:


@inject("userDataStore")
@observer
export default class ActiveJob extends Component {

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }


    render() {
        switch (this.props.userDataStore.focusedJob.status) {
            case 'on_the_way':
                //here we check user type and bring back the relevant stage of active job
                let OnTheWay = this.props.userDataStore.currentUserType === 'pro' ? OnTheWayPro : OnTheWayConsumer;
                return (
                    <OnTheWay/>
                );
            case 'in_progress':
                let InProgress = this.props.userDataStore.currentUserType === 'pro' ? InProgressPro : InProgressConsumer;
                return (
                    <View>
                        <InProgress/>
                    </View>
                );
            case 'pro_payment':
                let ProPayment = this.props.userDataStore.currentUserType === 'pro' ? ProPaymentPro : ProPaymentConsumer
                return (
                    <ProPayment/>
                );
            case 'consumer_payment':
                let ConsumerPayment = this.props.userDataStore.currentUserType === 'pro' ? ConsumerPaymentPro : ConsumerPaymentConsumer
                return (
                    <ConsumerPayment/>
                );
            case 'consumer_review':
                return (
                    <View>
                        <Text>consumer_review</Text>
                    </View>
                );

            default:
                return (
                    <View>
                    </View>
                )
        }
    }
}