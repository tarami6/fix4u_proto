import React from "react";
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
//config
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
import {numbersOnlyByLengthValidator} from "../../../../generalFunc/validators";
//mobx
import {inject, observer} from "mobx-react/index";
import {SW} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";
import Header from '../../../../components/headers/Header'

@inject("userDataStore")
@observer
export default class ProPaymentPro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            name: '',
        };
    }

    componentWillMount() {
        let name = this.props.userDataStore.focusedJob.user.name;
        this.setState({
            name: name
        })
    }


    // setModalVisible(visible) {
    //     this.setState({modalVisible: visible});
    // }

    //fetch func and handling
    getPaid() {
        if (this.state.fee) {
            // let errors = numbersOnlyByLengthValidator(this.state.fee, 6);
            // if(errors.length===0) {
                let fee = this.state.fee;
                let route = startJobRoute(this.props.userDataStore.focusedJob.id);
                let totalFee = parseInt(fee) + parseInt(this.props.userDataStore.focusedJob.service_fee);
                let sendObj = {
                    status: 'consumer_payment',
                    work_fee: fee,
                    total_fee: totalFee
                };
                console.warn("dasda", sendObj.total_fee)
                let headers = {
                    'Accept': `application/json`,
                    'content-type': 'application/json',
                    'Authorization': 'JWT ' + this.props.userDataStore.userData.token
                };
                fetcher(route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers)
            // }
            // else {
            //     for(let i =0; i<errors.length; i++){
            //         Alert.alert(errors[i])
            //     }
            // }
        }
        else {
            Alert.alert('אנא הכנס מחיר שירות');
        }
    }

    successCallback(res) {
        this.props.userDataStore.updateProPost(res);
        this.props.userDataStore.focusJob(res);
        // this.props.navigation.navigate('ActiveJob');
    }

    errorCallback(err) {
        console.warn('error', err);
        console.log('error:', err)
    }



    render() {
        let a =new Date(this.props.userDataStore.focusedJob.job_start_time)
        let currentJob = this.props.userDataStore.focusedJob;
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                <Header head={'Grey'} previousPage={'Home'} props={this.props}/>
                {/*Body*/}
                <View style={{flex: 1, width: SW - 60}}>
                    <View style={{flex: 1.5, borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 10}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={{fontSize: 18, color: '#000'}}>חשבונית מס</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View style={{flex: 1, backgroundColor: '#fff'}}>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    value={this.state.name}
                                    onChangeText={(name) => {
                                        this.setState({name: name})
                                    }}
                                    placeholder={"אלכסנדר קנדל"}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={{flex: 0.4, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>עבור</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <View
                                style={{flex: 1, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center'}}>
                                <TextInput
                                    keyboardType={"numeric"}
                                    onChangeText={(fee) => this.setState({fee: fee})}
                                    underlineColorAndroid="transparent"
                                    style={{
                                        width: SW / 8,
                                        backgroundColor: '#FCFCFC',
                                        borderRadius: 7,
                                        borderBottomWidth: 0.5,
                                        borderTopWidth: 2,
                                        borderRightWidth: 1,
                                        borderLeftWidth: 1,
                                        borderColor: '#E7E7E7'
                                    }}
                                />
                                <Text style={{fontSize: 16, color: '#000', marginLeft: 10}}>ש"ח</Text>
                            </View>
                            <View style={{flex: 0.4, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>מחיר שירות</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, borderBottomWidth: 1, borderColor: 'grey',}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 14}}></Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>זמן</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={{fontSize: 14}}> {currentJob.service_fee} ש"ח</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text>מחיר הגעה</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, borderBottomWidth: 1, borderColor: 'grey',}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 14}}>5 שעות</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>זמן</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={{fontSize: 14}}>17%</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text> מע"מ</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 0.5,}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>{ (this.state.fee ? (currentJob.service_fee+parseInt(this.state.fee)* 1.17).toFixed(2) :  (currentJob.service_fee* 1.17).toFixed(2))} ש"ח</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>סה"כ</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('שלח', 'pro', () => {
                            this.getPaid();
                        })}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#FCFCFC',
        borderRadius: 7,
        textAlign: 'right',
        borderBottomWidth: 0.5,
        borderTopWidth: 2,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#E7E7E7'
    },
    // Modal
    modal: {
        width: '84%',
        height: '95%',
        marginLeft: '8%',
        marginTop: '10%'
    },
    TopView: {
        backgroundColor: 'white',
        flex: 0.3,
        justifyContent: 'flex-start'

    },
    middleView: {
        backgroundColor: 'white',
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '10%'


    },
    bottomView: {
        backgroundColor: 'white',
        flex: 0.6,
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center'

    },
    xicon: {
        margin: '5%'
    },
    bt: {
        width: '70%',
        height: 50,
        backgroundColor: 'orange',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    middleText: {
        flex: 0.6,
        fontSize: 18,
        fontWeight: 'bold'


    },

});