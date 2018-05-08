import React, {Component} from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {SH, SW} from "../../../config/styles";
import {submitButton} from "../../../components/modalSubmitButton";
import {inject, observer} from "mobx-react/index";
import {applyForJobRoute} from "../../../config/apiRoutes";
import {fetcher} from "../../../generalFunc/fetcher";
import {addZero, dateObjToTimeString} from "../../../generalFunc/generalFunctions";

const data = {
    name: 'אלכסנדרה קנדל',
    address: 'רבינו נאנל 26, תל אביב',
    description: 'נשרף לי הבית, לדעתי יש בעיות חשמל ויוצאים קצרים מהשקע. אני בבית אשמח אם מישהו יהיה פנוי מעכישיו לעכשיו',
    jobImage: require('../../../../assets/images/elec.jpg'),
    profilePic: require('../../../../assets/avatars/avatar-sitepal.jpg'),
    price: "130",
    time: {
        hour: "14",
        minutes: "30"
    },
}

@inject('openJobsStore')
@inject('userDataStore')
@inject("modalsStore")
@observer
export default class ChooseJobModal extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    // getImageModal(){
    //     this.props.modalsStore.showModal('ImageModal');
    // }

    submitApply() {
        this.props.userDataStore.setLoading(true);
        let jobId = this.props.openJobsStore.focusedJob.id
        let route = applyForJobRoute(jobId);
        let headers = {
            'Accept': `application/json`,
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.userDataStore.userData.token
        };
        let time = dateObjToTimeString(this.props.openJobsStore.focusedJob.created_at);
        console.warn('timeemit:', time);
        if (this.state.hour && this.state.minutes) {
            let hour = this.state.hour < 10 ? '0' + this.state.hour : this.state.hour;
            let minutes = this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes;
            time = hour + ":" + minutes + ":" + "00";
        }
        let service_fee = this.state.service_fee? this.state.service_fee: this.props.openJobsStore.focusedJob.service_fee;
        let sendBody = {
            time: time,
            service_fee: service_fee
        };
        fetcher(route, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendBody, headers)
    }

    closeModal() {
        this.props.modalsStore.closeModal('chooseJobModal')
    }

    successCallback(res) {
        this.closeModal();
        if (res.detail) {
            Alert.alert(res.detail)
            // this.closeModal();
        }
        else {
            this.props.userDataStore.addApply(res)
        }
        this.props.userDataStore.setLoading(false);
        // console.log('success cb chooseJob:', res);
    }

    errorCallback(err) {
        this.props.userDataStore.setLoading(false);
        console.warn('error in chooseJob:', err);
        console.log('error in chooseJob:', err)
    }



    render() {

        ///////// and here is the data: ///////////
        let currentJob = this.props.openJobsStore.focusedJob;
        let jobMinutes = new Date(currentJob.created_at).getMinutes().toString();
        let jobHours = new Date(currentJob.created_at).getHours().toString();
        return (


            <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <KeyboardAvoidingView style={styles.modalContainer} behavior="position" enabled>
                    <View style={styles.modalView}>

                        {/* Exit Icon */}
                        <View style={styles.eXicon}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.modalsStore.closeModal('chooseJobModal');
                                }}>
                                <Image
                                    source={require('../../../../assets/icons/Exit.png')}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        {/*The Content*/}

                        <View style={{flex: 1,}}>
                            {/*{/the body splitted in two views/}*/}
                            {/*{/This the Top View/}*/}
                            <View style={{
                                flex: 1.05, backgroundColor: '#fff', paddingRight: SW / 20,
                                paddingLeft: SW / 20,
                                borderBottomWidth: 1,
                                borderColor: '#9f9f9f'
                            }}>
                                {/*{/Name And Image/}*/}
                                <View style={{
                                    flex: 0.85,
                                    borderBottomWidth: 1,
                                    borderColor: '#cacaca'
                                }}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{
                                            flex: 1,
                                            backgroundColor: '#fff',
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#000',
                                                fontWeight: 'bold',
                                                marginRight: 5,
                                                textAlign: 'center',
                                            }}>{currentJob.user ? currentJob.user.name : ''}</Text>
                                        </View>
                                        <View style={{
                                            flex: 0.3,
                                            alignItems: 'flex-end',
                                            justifyContent: 'center'
                                        }}>
                                            {currentJob.user && currentJob.user.profile_pic_thumb ? <Image
                                                style={{width: SW / 5.5, height: SW / 5.5, borderRadius: 100}}
                                                source={{uri: currentJob.user.profile_pic_thumb}}/> : <View/>

                                            }
                                        </View>
                                    </View>
                                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <Text>כתובת :{currentJob.address}</Text>
                                    </View>
                                </View>
                                {/*{/Description and Image/}*/}
                                <View style={{flex: 1.15, backgroundColor: '#fff', alignItems: 'flex-end'}}>
                                    <Text style={{lineHeight: 20, paddingTop: 10}}>תיאור
                                        : {currentJob.description}</Text>
                                    {currentJob.image_thumb ?
                                        // <TouchableHighlight onPress={() => this.getImageModal()}>
                                        <Image style={{
                                            height: SW / 6, width: SW / 6, alignSelf: 'flex-end',
                                            marginTop: 10
                                        }} source={{uri: currentJob.image_thumb}}/>
                                        // </TouchableHighlight>

                                        : < View/>
                                    }
                                </View>
                            </View>
                            {/*{/This the bottom and the second view/}*/}

                            <View style={{flex: 0.95, backgroundColor: "#d8d8d8"}}>
                                <View style={{flex: 1.2,}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'flex-end'
                                        }}>
                                            <View style={{
                                                flex: 0.6,
                                                justifyContent: "center",
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <TextInput
                                                    onChangeText={(service_fee) => this.setState({service_fee})}
                                                    onSubmitEditing={() => {
                                                        this.hourField.focus()
                                                    }}
                                                    keyboardType={'phone-pad'}
                                                    style={{
                                                        height: 45,
                                                        width: SW / 6,
                                                        borderColor: '#cbcbcb',
                                                        borderRadius: 7,
                                                        borderWidth: 2,
                                                        textAlign: 'left',
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#fff'

                                                    }}
                                                    underlineColorAndroid="transparent"
                                                    placeholderTextColor='black'
                                                    placeholder={this.props.openJobsStore.focusedJob.service_fee.toString()}/>
                                                <Text style={{paddingLeft: 5}}>ש"ח</Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'flex-end'
                                        }}>
                                            <View style={{
                                                flex: 0.6,
                                                justifyContent: "flex-end",
                                                marginRight: SW / 10,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>

                                                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>בחר מחיר
                                                    הגעה</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <View
                                            style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'flex-end'
                                            }}>

                                                <View style={{
                                                    flex: 0.6,
                                                    justifyContent: "center",
                                                    alignItems: 'center',
                                                    flexDirection: 'row'
                                                }}>
                                                    <TextInput
                                                        onChangeText={(hour) => {
                                                            if(hour>10){
                                                                this.minutesField.focus();
                                                            }
                                                            this.setState({hour})}
                                                        }
                                                        onSubmitEditing={() => {
                                                            this.minutesField.focus()
                                                        }}
                                                        ref={(ref => this.hourField = ref)} keyboardType={'phone-pad'}
                                                        style={{
                                                            height: 45,
                                                            width: 45,
                                                            borderColor: '#cbcbcb',
                                                            borderRadius: 7,
                                                            borderWidth: 2,
                                                            textAlign: 'center',
                                                            fontSize: 18,
                                                            fontWeight: 'bold',
                                                            backgroundColor: '#fff'

                                                        }}
                                                        placeholderTextColor='black'
                                                        underlineColorAndroid="transparent"
                                                        placeholder={addZero(jobHours)}/>
                                                    <Text style={{paddingLeft: 5, paddingRight: 5}}>:</Text>

                                                    <TextInput
                                                        onSubmitEditing={() => {
                                                            this.submitApply()
                                                        }}
                                                        ref={(ref => this.minutesField = ref)}
                                                        onChangeText={(minutes) => this.setState({minutes})}
                                                        keyboardType={'phone-pad'}
                                                        style={{
                                                            height: 45,
                                                            width: 45,
                                                            borderColor: '#cbcbcb',
                                                            borderRadius: 7,
                                                            borderWidth: 2,
                                                            textAlign: 'center',
                                                            fontSize: 18,
                                                            fontWeight: 'bold',
                                                            backgroundColor: '#fff'
                                                        }}
                                                        placeholderTextColor='black'
                                                        underlineColorAndroid="transparent"
                                                        placeholder={addZero(jobMinutes)}/>

                                                </View>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'flex-end'
                                            }}>
                                                <View style={{
                                                    flex: 0.6,
                                                    justifyContent: "flex-end",
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                }}>

                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#000',
                                                        fontWeight: 'bold',
                                                        marginRight: SW / 10
                                                    }}>בחר שעה</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex: 0.8}}>
                                    <View style={styles.footer}>
                                        <View style={{alignItems: 'center'}}>

                                            {submitButton('שלח הצעה', 'pro', () => {

                                                this.submitApply();
                                            })}
                                        </View>

                                    </View>
                                </View>

                            </View>

                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>


        );
    }
}

let styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        alignSelf: 'center',

        marginTop: SW / 20,
        backgroundColor: '#fff',
        height: SH - (SH / 10),
        width: SW - (SW / 10)
    },
    eXicon: {
        flex: 0.06,
        width: SW / 13,
        marginTop: SW / 15,
        marginLeft: SW / 15,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    footer: {
        flex: 0.5,
        justifyContent: 'center',
        marginTop: SH / 30
    }

})