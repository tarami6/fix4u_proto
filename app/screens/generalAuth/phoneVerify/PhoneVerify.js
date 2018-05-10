import React, {Component} from "react";
import {Alert, Image, Text, TextInput, View} from "react-native";
import {fontGrey, mainStyles, mediumFont, SW} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import {submitButton} from "../../../components/modalSubmitButton";
import {fetcher} from "../../../generalFunc/fetcher";
import styles from './styles'
import {loginRoute, phoneVerifyRoute} from "../../../config/apiRoutes";
import {handlePushyToken} from "../../../generalFunc/pushyTokenHandler";

@inject('modalsStore')
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
        let code = this.state.text;
        if (code.length === 4) {
            let sendObj = {
                phone_number: this.props.authStore.user.phone_number,
                code: code
            }
            // this is the fetch for the verify code for the phone, inactive on the server for now
            this.props.modalsStore.showModal('loaderModal');
            fetcher(phoneVerifyRoute, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
        }
        else {
            Alert.alert('קוד האימות צריך להיות 4 ספרות')
        }
    }


    loginSuccess(res) {
        let userType = res.user.services ? 'pro' : 'consumer';
        let navigationEnd = res.user.services ? 'ProNavigator' : 'ConsumerNavigator';
        this.props.userDataStore.setUserType(userType);
        this.props.userDataStore.setUserData(res);
        this.props.authStore.saveToAsync();
        handlePushyToken(res.token);
        this.props.navigation.navigate(navigationEnd);
    }

    loginError(err) {
        this.props.modalsStore.hideModal('loaderModal');
        console.warn('error:', err)
    }

    successCallback(response) {
        this.props.modalsStore.hideModal('loaderModal');
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
    }

    //
    errorCallback(error) {
        this.props.modalsStore.hideModal('loaderModal');
        console.warn('error in proPhoneVerifyModal:', error);
        console.log(error)
    }

    componentDidMount() {
        setTimeout(() => {
            this.codeInput.focus();
        }, 1000)
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f6f6f6"}}>
                <View style={{flex: 1.3, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: SW / 2.5, height: SW / 2.5,}}
                           source={require('../../../../assets/registration/code4digitsBack.png')}/>
                    <Text style={{fontSize: mediumFont}}> קוד אימות נשלח ב SMS</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={[mainStyles.greyTitle, {paddingBottom: 10}]}>הכנס קוד אימות</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={ref => this.codeInput = ref}
                            style={styles.textInputStyle}
                            keyboardType='phone-pad'
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            selectionColor={fontGrey}
                            underlineColorAndroid={"rgba(0, 0, 0, 0.0)"}
                            onSubmitEditing={this.submitCode.bind(this)}
                        />
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    {submitButton('שלח', 'consumer', this.submitCode.bind(this))}
                </View>


            </View>
        )
    }
}

