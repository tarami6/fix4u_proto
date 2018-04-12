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

@inject('userDataStore')
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
            access_token: data
        }

        console.log('facebook login response data:', data);
        this.props.authStore.updateUser({fbToken: data});
        // this is the fetch for the verify code for the phone, inactive on the server for now
        fetcher('api/rest-auth/facebook/login/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    }

    successCallback(response) {
        //closing modal
        this.props.authStore.setShowAuthModal(false);
        this.props.userDataStore.setUserData(response)
        console.warn('success callback');
        // console.log('yoo', response)
    }

    errorCallback(error){
        console.warn('error in phoneNumb post fetch');
    }

    componentDidMount(){
        this.checkIfUserIsLoggedIn();
        this.setState({
            text: this.props.authStore.user.phone_number
        })
    }


    checkIfUserIsLoggedIn(){
        let item = '';
        AccessToken.getCurrentAccessToken().then((data)=>{
            item = data.accessToken.toString();
            this.props.authStore.updateUser({fbToken: data});
            fetcher('api/rest-auth/facebook/login/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)

        }).catch(err => console.warn('no token:', err))
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
                    readPermissions={["email"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        this.handleSubmit(data.accessToken.toString())
                                        // alert(data)
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

//exmple facebook key: EAACXPzPIrRgBAKsRZCYwIhdlIpdc1lBSFmvjDBMVNOvrUpZCkgcIn4HOLBx8LbQN6UiCC7gjh2KBipjS1rvvmGJNmqc6mhAXUZAt39NJOC4chEHUghRtrBQYWtUIGac6HloaEHzXzq18sECZAdpLRJQIr5HP3nXZC85SIWQzGJHGyhbZCpbrKCoZCLlxeNpYJ2x5C8ObxZBWslyXspWhQi9F0k1TsQfGtjYZD