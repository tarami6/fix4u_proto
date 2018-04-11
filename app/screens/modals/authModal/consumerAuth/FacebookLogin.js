import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {SH, SW, colors} from "../../../../config/styles";
import {inject, observer} from "mobx-react/native";
import {submitButton} from "../../../../components/modalSubmitButton";
import {fetcher} from "../../../../config/fetcher";
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

@inject("authStore")
@observer
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {text: ''}
    }

    handleSubmit(data){
        let sendObj = {
            phone_number: this.props.authStore.user.phone_number,
            code: this.state.text
        }

        console.log('facebook login response data:', data);
        // this is the fetch for the verify code for the phone, inactive on the server for now
        // fetcher('api/sms/verify/check/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    }

    successCallback(response) {
        console.warn('success callback');
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
                <TouchableOpacity style={{position: 'absolute', top: 10, left: 0}}
                                  onPress={()=>{this.props.authStore.updateAuthStep('phone_number')}}>
                    <Icon name="ios-arrow-back" size={50} color="#8C8C8C"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>התחבר עם פייסבוק:</Text>
                {/*facebook Login:*/}
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        this.handleSubmit(data)
                                        // alert(data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => alert("logout.")}/>
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
    },
    headerText: {
        fontSize: 20,
        marginTop: 30,
        marginVertical: 30,
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