import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import {SH, SW, colors} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import LinearGradient from 'react-native-linear-gradient';
import {submitButton} from "../../../components/modalSubmitButton";
import {fetcher} from "../../../config/fetcher";
import styles from './styles';

@inject("authStore")
@observer
export default class PhoneInput extends Component {
    constructor(props){
        super(props);
        this.state = {text: ''}
    }

    submitPhone(){
        let sendObj = {
            phone_number: this.state.text
        }
        fetcher('api/sms/verify/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    }

    successCallback(response) {
        console.warn('success calback at PhoneInput')
        if (response['success']) {
            this.props.authStore.updateUser({phone_number: this.state.text});
            this.props.navigation.navigate('PhoneVerify');
        }
        else {
            for (let error in response) {
                if (response[error] === 'User with this Phone Number already exists.') {
                    // this.props.authStore.updateUser({phone_number: this.state.text})
                    // this.props.authStore.updateAuthStep('login')
                }
                else if (response[error] === 'Phone Number has already been Verified.') {
                    // this.props.authStore.updateUser({phone_number: this.state.text});
                    // this.props.authStore.updateAuthStep('login');
                }
                else if (response[error] === 'Concurrent verifications to the same number are not allowed') {
                    Alert.alert('please wait a few minutes to get the verify code again')
                    // this.props.authStore.updateUser({phone_number: this.state.text});
                    // this.props.authStore.updateAuthStep('verify_code');
                }
                else {
                    //handling the error message
                    let dotIndex = response[error][0].indexOf('.');
                    let alertPartOne = response[error][0].slice(0, dotIndex + 1);
                    let alertPartTwo = response[error][0].slice(dotIndex + 1);
                    if (alertPartOne.length > 0) {
                        Alert.alert(alertPartOne, alertPartTwo);
                    }
                    else {
                        Alert.alert('error', response[error]);
                    }
                }
            }
        }
    }

    errorCallback(error){
        console.warn('error in phoneNumb post fetch', error);
    }

    componentDidMount(){
        this.setState({
            text: this.props.authStore.user.phone_number
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top: 10, left: 20}}
                                  onPress={()=>{this.props.closeModal()}}>
                    <Icon name="ios-close" size={50} color="#8C8C8C"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>הזן מספר טלפון:</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        keyboardType='phone-pad'
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        underlineColorAndroid={"rgba(0, 0, 0, 0.0)"}
                    />
                </View>
                {submitButton('שלח', this.submitPhone.bind(this))}
            </View>
        )
    }
}

