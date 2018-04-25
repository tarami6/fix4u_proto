import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import {SH, SW, colors} from "../../../../config/styles";
import {inject, observer} from "mobx-react/native";
import LinearGradient from 'react-native-linear-gradient';
import {submitButton} from "../../../../components/modalSubmitButton";
import {fetcher} from "../../../../generalFunc/fetcher";

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
        if (response['success']) {
            this.props.authStore.updateUser({phone_number: this.state.text});
            this.props.authStore.updateAuthStep('verify_code')
        }
        else {
            for (error in response) {
                if (response[error] === 'User with this Phone Number already exists.') {
                    this.props.authStore.updateUser({phone_number: this.state.text})
                    this.props.authStore.updateAuthStep('login')
                }
                else if (response[error] === 'Phone Number has already been Verified.') {
                    this.props.authStore.updateUser({phone_number: this.state.text});
                    this.props.authStore.updateAuthStep('login');
                }
                else if (response[error] === 'Concurrent verifications to the same number are not allowed') {
                    Alert.alert('please wait a few minutes to get the verify code again')
                    this.props.authStore.updateUser({phone_number: this.state.text});
                    this.props.authStore.updateAuthStep('verify_code');
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
        console.warn('error in phoneNumb post fetch');
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


let styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        // height: SH*0.8
    },
    headerText: {
        fontSize: 20,
        marginTop: 30,
        // borderBottomWidth: 1,
        // borderColor: '#000',
    },
    //text input:
    inputContainer: {},
    textInputStyle: {
        width: SW * 0.6,
        marginVertical: SH / 16,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0.1,
        elevation: 4,
        borderColor: '#000'
    },

    button: {
        backgroundColor: "#fff",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    }
})