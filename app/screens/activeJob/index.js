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
//consumer payment step - here the consumer pays the pro
//Consumer review
// screens:


@inject("userDataStore")
@observer
export default class ActiveJob extends Component {

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    render() {
        let jobStatus = this.props.userDataStore.focusedJob.status
        if (this.props.userDataStore.currentUserType !== 'pro') {
            // if(jobStatus === 'on_the_way'){
            //
            // }
            switch (jobStatus) {
                case 'on_the_way':
                    return (
                        <OnTheWayConsumer/>
                    );
                case ('in_progress' || 'pro_payment' || 'consumer_payment' || 'consumer_review'):
                    return (
                        <InProgressConsumer/>
                    );

                default:
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
            switch (jobStatus) {
                case 'on_the_way':
                    //here we check user type and bring back the relevant stage of active job
                    let OnTheWay = this.props.userDataStore.currentUserType === 'pro' ? OnTheWayPro : OnTheWayConsumer;
                    return (
                        <OnTheWayPro/>
                    );
                case 'in_progress':
                    return (
                        <InProgressPro/>
                    );
                case ('pro_payment' || 'consumer_payment'):

                    return (
                        <ProPaymentPro/>
                    );

                case 'consumer_review':
                    this.props.navigation.navigate('Home');
                    return (
                        <View>
                            <Text>
                                The consumer is currently reviewing the job
                            </Text>
                        </View>
                    );
                default:
                    return (
                        <View>
                            <Text>
                                invalid post status: {jobStatus}
                            </Text>
                        </View>
                    )
            }
        }
    }
}