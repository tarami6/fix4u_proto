import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {SH, SW, colors} from "../../../../config/styles";
import {inject, observer} from "mobx-react/native";
import {submitButton} from "../../../../components/modalSubmitButton";
import {fetcher} from "../../../../generalFunc/fetcher";

@inject("authStore")
@observer
export default class VerifyCodeInput extends Component {
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
        if (response['success']) {
            this.props.authStore.updateAuthStep('login');
        }
        else {
            console.log('the error:', response)
            let errorMessage = '';
            for (let error in response) {
                console.log('Code Input error', response[error]);
                if(typeof response[error] !== 'string'){
                    errorMessage = response[error][0]
                }
                else {
                    errorMessage = response[error]
                }
                Alert.alert('errorMessage in VerifyCodeInput',errorMessage);
            }
        }
    }

    errorCallback(error){
        console.warn('error in phoneNumb post fetch', error);
    }
    componentDidMount(){
        this._input.clear();
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top: 10, left: 20}}
                                  onPress={()=>{this.props.authStore.updateAuthStep('phone_number')}}>
                    <Icon name="ios-arrow-back" size={50} color="#8C8C8C"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>הזן קוד לאימות הטלפון:</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={(ref) => this._input = ref}
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