import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
//Header imports:
import LinierView from '../../../../components/linierView';
import CustomHeaderAddJobStepsConsumer from '../../../../components/headers/CustomHeaderAddJobStepsConsumer';
//styles
import {HH} from "../../../../config/styles";
import styles from './styles'
//config:
import {fetcher} from "../../../../generalFunc/fetcher";
import {braintreeGetTokenRoute, braintreeSendTokenRoute} from "../../../../config/apiRoutes";
// paypal Payment
import BraintreeDropIn from 'react-native-braintree-payments-drop-in';

// BraintreeDropIn.show({
//     clientToken: 'token',
// })
//     .then(result => console.log(result))
//     .catch((error) => {
//         if (error.code === 'USER_CANCELLATION') {
//             // update your UI to handle cancellation
//         } else {
//             // update your UI to handle other errors
//         }
//     });

let i = 0;
@inject("modalsStore")

@inject("userDataStore")
@observer
export default class ConsumerPaymentConsumer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let userToken = this.props.userDataStore.userData.token;
        fetcher(braintreeGetTokenRoute, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), {token: userToken})

    }

    successCallback(res) {
        this.activatePayment(res);
    }

    activatePayment(token) {
        BraintreeDropIn.show({
            clientToken: token,
        })
            .then(result => {
                this.fetchPayment(result)
                // console.log(result)
            })
            .catch((error) => {
                if (error.code === 'USER_CANCELLATION') {
                    console.log(error)
                    // update your UI to handle cancellation
                } else {
                    console.log(error)
                    // update your UI to handle other errors
                }
            });

    }

    fetchPayment(result){
        let route = braintreeSendTokenRoute(this.props.userDataStore.focusedJob.id)
        let amount = this.props.userDataStore.focusedJob.total_fee;
        let sendBody = {
            nonce: result.nonce,
            amount: amount
        }
        fetcher(route, 'POST', this.cardConfirmed.bind(this), this.errorCallback, sendBody, {token: this.props.userDataStore.userData.token});

    }

    cardConfirmed(res){
        Alert.alert('Payment Confirmed!');
        let postId = this.props.userDataStore.focusedJob.id
        this.props.userDataStore.updatePostStatus(postId, 'consumer_review');
        console.log('card confirmed:', res);
    }

    errorCallback(err) {
        console.warn('got error in consumerPaymentConsumer:', err);
        console.log('got error in consumerPaymentConsumer:', err);
    }

    startJob() {
        if (i === 0) {
            Alert.alert('wait bro wait..');
        }
        else if (i === 1) {
            Alert.alert('You dont listen now do you?');
        }
        else {
            Alert.alert('fucker');
        }
    }

    render() {
        return (
            <View>
                <LinierView style={{height: HH}}>
                    <CustomHeaderAddJobStepsConsumer props={this.props}/>
                </LinierView>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View>
                    <TouchableOpacity onPress={this.startJob.bind(this)}>
                        <View style={styles.jobContainer}>
                            <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                as a consumer you are here only to look at this text,
                                and wait for the pro to start the job
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}