import React, {Component} from "react";
import {Alert, Image, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import Text from '../../../../components/text/Text'
import Header from '../../../../components/headers/Header'
import InfoItem from '../../../../components/InfoItem'
import OrangeCircle from '../../../../components/OrangeCircle'

import StarRating from 'react-native-star-rating'
//styles
import {GOLD, mainStyles, SH, SW} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";
//config
import BraintreeDropIn from 'react-native-braintree-payments-drop-in';
import {fetcher} from "../../../../generalFunc/fetcher";
import {braintreeGetTokenRoute, braintreeSendTokenRoute} from "../../../../config/apiRoutes";
import {addZero, getAvgRating, msToHMS} from "../../../../generalFunc/generalFunctions";
//mobx
import {inject, observer} from "mobx-react/index";

import Communications from 'react-native-communications';

@inject('modalsStore')
@inject("userDataStore")
@observer
export default class InProgressConsumer extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            timer: '...'
        }
    }


    pay() {
        let userToken = this.props.userDataStore.userData.token;
        fetcher(braintreeGetTokenRoute, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), {token: userToken})
    }

    successCallback(res) {
        // console.warn('got success cb:', res);
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


    fetchPayment(result) {
        let route = braintreeSendTokenRoute(this.props.userDataStore.focusedJob.id)
        let amount = this.props.userDataStore.focusedJob.total_fee;
        let sendBody = {
            nonce: result.nonce,
            amount: amount
        }
        this.props.modalsStore.showModal('loaderModal');
        fetcher(route, 'POST', this.cardConfirmed.bind(this), this.errorCallback, sendBody, {token: this.props.userDataStore.userData.token});

    }

    cardConfirmed(res) {
        Alert.alert('Payment Confirmed!');
        let postId = this.props.userDataStore.focusedJob.id
        this.props.userDataStore.updatePostStatus(postId, 'consumer_review');
        this.props.modalsStore.hideModal('loaderModal');
        // console.log('card confirmed:', res);
    }

    errorCallback(err) {
        this.props.modalsStore.hideModal('loaderModal');
        console.warn('got error in consumerPaymentConsumer:', err);
        console.log('got error in consumerPaymentConsumer:', err);
    }

    startJob() {
        Alert.alert('job started maybe');
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    startTimer() {
        this.interval = setInterval(() => {
            let basicDate = new Date(this.props.userDataStore.focusedJob.job_start_time);
            let currentDate = new Date();
            let x = new Date(currentDate - basicDate);
            let timer = msToHMS(x);
            if (this.props.userDataStore.focusedJob.status !== 'in_progress') {
                clearInterval(this.interval)
            }
            this.setState({timer: timer})
        }, 1000);
    }

    componentDidMount() {
        if (this.props.userDataStore.focusedJob.status === 'in_progress') {
            this.startTimer();
        }
        else {
            let startTime = new Date(this.props.userDataStore.focusedJob.job_start_time);
            let completionTime = new Date(this.props.userDataStore.focusedJob.job_completion_time);
            let sec2 = addZero(completionTime.getSeconds() - startTime.getSeconds());
            let min2 = addZero(completionTime.getMinutes() - startTime.getMinutes());
            let hour2 = addZero(completionTime.getHours() - startTime.getHours());
            let jobTime = hour2 + ':' + min2 + ':' + sec2;
            this.setState({
                timer: jobTime
            })
        }
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let focusedJob = this.props.userDataStore.focusedJob;
        let rating = getAvgRating(
            focusedJob.user_pro.price_rating_avg,
            focusedJob.user_pro.time_rating_avg,
            focusedJob.user_pro.performance_rating_avg,
        );
        return (
            <View style={{flex: 1,}}>
                <Header head={'Grey'} props={this.props}/>
                <View style={{flex: 0.45, backgroundColor: 'red'}}>
                    <View style={styles.infoView}>
                        {/*Image & service & full name*/}
                        <View style={{flex: 0.65}}>
                            <InfoItem info={focusedJob} type={'activeJob'}/>
                        </View>
                        {/*about*/}
                        <View style={styles.infoAboutView}>
                            <Text>{focusedJob.user_pro.company_description}</Text>
                        </View>
                        {/*Border*/}
                        <View style={styles.infoBorder}/>
                        {/*reviews*/}
                        <View style={styles.infoReviews}>
                            {/*Stars*/}
                            <TouchableOpacity activeOpacity={0.3}
                                              onPress={this.expand_collapse_Function}
                                              style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.infoStarsView}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        starSize={15}
                                        fullStarColor={GOLD}
                                        rating={rating}
                                    />
                                </View>


                                <View style={styles.infoReviewCount}>
                                    <Text>{focusedJob.user_pro.pro_reviews.length} חוות דעת</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flex: 0.3, justifyContent: 'center'}}>
                        {console.log("inProgress", focusedJob.status)}
                        <Text style={mainStyles.greyTitle}>
                            {this.props.userDataStore.focusedJob.status === 'in_progress' ? 'בעבודה' : ''}
                            {this.props.userDataStore.focusedJob.status === 'pro_payment' ? focusedJob.user_pro.name + ' מכין חשבונית ' : ''}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <OrangeCircle size={'big'} style={{width: 180, height: 180}}>
                            <Text style={{fontSize: 30, color: '#000', fontWeight: 'bold', fontFamily: 'sans-serif'}}>
                                {this.props.userDataStore.focusedJob.status === 'in_progress' ? this.state.timer :
                                    msToHMS(new Date(focusedJob.job_completion_time) - new Date(focusedJob.job_start_time))}
                            </Text>
                        </OrangeCircle>
                    </View>
                    <View style={{flex: 0.3}}>
                        {this.props.userDataStore.focusedJob.status === 'consumer_payment' ?
                            <View style={{alignItems: 'center'}}>
                                {submitButton('תשלום', 'consumer', () => {
                                    this.setModalVisible(true);
                                })}
                            </View>
                            : null}
                    </View>
                </View>
                <View style={{
                    flex: 0.16, backgroundColor: 'white', width: SW, flexDirection: 'row', borderTopWidth: 0.5,
                    borderColor: 'grey',
                    alignItems: 'center'
                }}>


                    <TouchableOpacity onPress={() => Communications.phonecall(focusedJob.user_pro.phone_number, true)}
                                      style={{flex: 1, alignItems: 'center',}}>
                        <Image source={require('../../../../../assets/icons/call.png')}/>
                    </TouchableOpacity>


                </View>
                {/*Modal*/}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: false})
                    }}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                        <View style={styles.modalView}>
                            {/*Exit Icon*/}
                            <View style={styles.eXicon}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Image
                                        source={require('../../../../../assets/icons/Exit.png')}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.body}>
                                <View style={{flex: 0.6, width: SW - 120}}>

                                    <View style={{
                                        flex: 0.5,
                                    }}>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                            <Text style={{fontSize: 18, color: '#000'}}>חשבונית מס</Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#000'
                                            }}>עבור {focusedJob.user_pro.name}</Text>
                                        </View>
                                    </View>

                                    <View style={{flex: 1, borderBottomWidth: 0.5, borderColor: 'grey',}}>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{flex: 1}}>
                                                <Text style={{fontSize: 14}}>{this.state.timer}</Text>
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text>זמן</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                <Text style={{fontSize: 14}}>{focusedJob.service_fee} ש"ח</Text>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <Text>מחיר הגעה</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                <Text style={{fontSize: 14}}>{focusedJob.work_fee} ש"ח</Text>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <Text>מחיר שירות</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{flex: 1, borderBottomWidth: 0.5, borderColor: 'grey',}}>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                                <Text style={{fontSize: 14}}>{focusedJob.total_fee} ש"ח</Text>
                                            </View>
                                            <View style={{flex: 1}}>
                                                <Text>סה"כ לפני מע"ם</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                <Text style={{fontSize: 14}}>17%</Text>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <Text> מע"מ</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{flex: 0.2,}}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#000'
                                                }}>{(focusedJob.total_fee * 1.17).toFixed(2)} ש"ח</Text>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                <Text style={{fontSize: 16, color: '#000'}}>סה"כ</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.3}}>
                                    {submitButton('אשר', 'consumer', () => {
                                        this.pay();
                                    })}
                                </View>
                            </View>


                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    infoView: {
        paddingTop: 10,
        backgroundColor: '#fff',
        flex: 1,
        borderBottomWidth: 0.5,
        borderColor: '#9b9b9b'
    },
    infoAboutView: {
        flex: 0.6,
        marginRight: SW / 20,
        marginLeft: SW / 20,
        justifyContent: 'center'
    },
    infoBorder: {
        width: SW,
        height: 1,
        borderBottomWidth: 0.5,
        borderColor: '#000',
        alignSelf: 'center'
    },
    infoReviews: {
        flex: 0.3,
        alignSelf: 'center',
        width: SW - ((SW / 20) * 2),
        flexDirection: 'row',
    },
    infoStarsView: {
        flex: 0.9,
        alignItems: 'center',
        flexDirection: 'row'
    },

    infoReviewCount: {
        flex: 0.9,
        justifyContent: 'center'
    },
    // Modal
    //Modal
    modalView: {
        alignSelf: 'center',
        marginTop: SW / 20,
        backgroundColor: '#f6f6f6',
        height: SH - (SH / 10),
        width: SW - (SW / 10)
    },
    eXicon: {
        flex: 0.1,
        marginTop: SW / 15,
        marginLeft: SW / 15,

    },
    body: {
        flex: 1,
        alignItems: 'center',

    },
})