import React, {Component} from "react";
import {Alert, Image, Text, TextInput, View} from "react-native";
import {inject, observer} from "mobx-react/native";
import {submitButton} from "../../../components/modalSubmitButton";
//config
import {fetcher} from "../../../generalFunc/fetcher";
import {phoneInputRoute} from "../../../config/apiRoutes";
import styles from './styles';
import {fontGrey, mainStyles, SW} from "../../../config/styles";

@inject('modalsStore')
@inject("authStore")
@observer
export default class PhoneInput extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    submitPhone() {
        let sendObj = {
            phone_number: this.state.text
        }
        if (this.state.text.length < 10) {
            Alert.alert('אנא הכנסז מספר ארוך מ10 ספרות')
        }
        else {
            this.props.modalsStore.showModal('loaderModal');
            fetcher(phoneInputRoute, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
        }
    }

    successCallback(response) {
        this.props.modalsStore.hideModal('loaderModal');
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

    errorCallback(error) {
        this.props.modalsStore.hideModal('loaderModal');
        console.warn('error in phoneNumb post fetch', error);
    }

    componentDidMount() {
        this.setState({
            text: this.props.authStore.user.phone_number
        })
        this.phoneInput.focus()
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{flex: 1.3, justifyContent: 'flex-end'}}>
                    <Image style={{width: SW / 2.5, height: SW / 2.5,}}
                           source={require('../../../../assets/registration/phoneInputBack.png')}/>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={[mainStyles.greyTitle, {paddingBottom: 10}]}>הזן מספר טלפון</Text>
                    <View style={styles.inputContainer}>


                        <TextInput
                            ref={ref => this.phoneInput = ref}
                            style={styles.textInputStyle}
                            keyboardType='phone-pad'
                            selectionColor={fontGrey}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            underlineColorAndroid={"rgba(0, 0, 0, 0.0)"}
                            onSubmitEditing={this.submitPhone.bind(this)}
                        />

                    </View>
                </View>
                <View style={{flex: 1}}>
                    {submitButton('שלח', 'consumer', this.submitPhone.bind(this))}
                </View>


            </View>
        )
    }
}

