import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Image} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import {SH, SW, colors} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import LinearGradient from 'react-native-linear-gradient';
import {submitButton} from "../../../components/modalSubmitButton";
import {fetcher} from "../../../generalFunc/fetcher";
import styles from './styles'
import {loginRoute, phoneVerifyRoute} from "../../../config/apiRoutes";

@inject("userDataStore")
@inject("authStore")
@observer
export default class PhoneVerify extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    submitCode() {
        let sendObj = {
            phone_number: this.props.authStore.user.phone_number,
            code: this.state.text
        }
        // this is the fetch for the verify code for the phone, inactive on the server for now
        fetcher(phoneVerifyRoute, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    }
<<<<<<< HEAD

    loginSuccess(res) {
        let userType = res.user.services ? 'pro' : 'consumer';
=======
    loginSuccess(res){
        let userType = res.user.services? 'pro': 'consumer';
        let navigationEnd = res.user.services? 'ProNavigator': 'ConsumerNavigator';
>>>>>>> 17f05babf85cb22ace75dc4a6fe5bbc6cbd37aa8
        this.props.userDataStore.setUserType(userType);
        this.props.userDataStore.setUserData(res);
        this.props.authStore.saveToAsync();
        this.props.navigation.navigate(navigationEnd);
        console.warn('success login got:', res);
        console.log('success login got:', res);
    }

    loginError(err) {
        console.warn('error:', err)
    }

    successCallback(response) {
        if (response.user) {
            this.props.authStore.updateUser(response);
            let sendObj = {
                username: this.props.authStore.user.phone_number,
                password: response.uid
            }
            fetcher(loginRoute, 'POST', this.loginSuccess.bind(this), this.loginError.bind(this), sendObj);
            //user is registered
            // this.props.proAuthStore.updatePro(response)
        }
        else {
            //user is not registered yet
            this.props.authStore.updateUser(response);
            this.props.navigation.navigate('ChooseUserType')
        }
        console.warn('success cb:', response);
        console.log('success cb:', response)
    }

    //
    errorCallback(error) {
        console.warn('error in proPhoneVerifyModal:', error);
        console.log(error)
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f6f6f6"}}>
                <View style={{flex: 1.3,  justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: SW / 2.5, height: SW / 2.5,}}
                       source={require('../../../../assets/registration/code4digitsBack.png')}/>
                    <Text style={{fontSize: 14}}>  קוד אימות נשלח ב SMS</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
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
                </View>
                <View style={{flex: 1,alignItems: 'center'}}>
                    {submitButton('שלח', this.submitCode.bind(this))}
                </View>


            </View>
        )
    }
}

