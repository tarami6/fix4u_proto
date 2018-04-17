import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import {SH, SW, colors} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import LinearGradient from 'react-native-linear-gradient';
import {submitButton} from "../../../components/modalSubmitButton";
import {fetcher} from "../../../config/fetcher";
import styles from './styles'


@inject("authStore")
@observer
export default class PhoneVerify extends Component {
    constructor(props){
        super(props);
        this.state = {text: ''}
    }
    submitCode(){
        let sendObj = {
            phone_number: this.props.authStore.user.phone_number,
            code: this.state.text
        }
        // this is the fetch for the verify code for the phone, inactive on the server for now
        fetcher('api/sms/verify/check/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    }

    successCallback(response) {
        if(response.user){
            //user is registered
            // this.props.proAuthStore.updatePro(response)
        }
        else{
            //user is not registered yet
            this.props.authStore.updateUser(response);
            this.props.navigation.navigate('ChooseUserType')
        }
        console.warn('success cb:', response);
        console.log('success cb:', response)
    }
    //
    errorCallback(error){
        console.warn('error in proPhoneVerifyModal:', error);
    }
    // submitPhone(){
    //     let sendObj = {
    //         phone_number: this.state.text
    //     }
    //     fetcher('api/sms/verify/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    // }
    //
    // successCallback(response) {
    //     console.warn('success calback at PhoneInput')
    //     if (response['success']) {
    //         this.props.authStore.updateUser({phone_number: this.state.text});
    //         this.props.authStore.updateAuthStep('verify_code')
    //     }
    //     else {
    //         for (error in response) {
    //             if (response[error] === 'User with this Phone Number already exists.') {
    //                 this.props.authStore.updateUser({phone_number: this.state.text})
    //                 this.props.authStore.updateAuthStep('login')
    //             }
    //             else if (response[error] === 'Phone Number has already been Verified.') {
    //                 this.props.authStore.updateUser({phone_number: this.state.text});
    //                 this.props.authStore.updateAuthStep('login');
    //             }
    //             else if (response[error] === 'Concurrent verifications to the same number are not allowed') {
    //                 Alert.alert('please wait a few minutes to get the verify code again')
    //                 this.props.authStore.updateUser({phone_number: this.state.text});
    //                 this.props.authStore.updateAuthStep('verify_code');
    //             }
    //             else {
    //                 //handling the error message
    //                 let dotIndex = response[error][0].indexOf('.');
    //                 let alertPartOne = response[error][0].slice(0, dotIndex + 1);
    //                 let alertPartTwo = response[error][0].slice(dotIndex + 1);
    //                 if (alertPartOne.length > 0) {
    //                     Alert.alert(alertPartOne, alertPartTwo);
    //                 }
    //                 else {
    //                     Alert.alert('error', response[error]);
    //                 }
    //             }
    //         }
    //     }
    // }
    //
    // errorCallback(error){
    //     console.warn('error in phoneNumb post fetch');
    // }
    //
    // componentDidMount(){
    //     this.setState({
    //         text: this.props.authStore.user.phone_number
    //     })
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>הכנס קוד אימות</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        underlineColorAndroid={"rgba(0, 0, 0, 0.0)"}
                    />
                </View>
                {submitButton('שלח', this.submitCode.bind(this))}
            </View>
        )
    }
}

