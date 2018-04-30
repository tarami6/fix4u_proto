import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {SH, SW, colors} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import {submitButton} from "../../../components/modalSubmitButton";
import {fetcher} from "../../../generalFunc/fetcher";
import {styles} from './styles';
import {NavigationActions} from "react-navigation";

@inject("navigationStore")
@inject("modalsStore")
@inject("proAuthStore")
@observer
export default class ProPhoneVerifyModal extends Component {
    constructor(props){
        super(props);
        this.state = {text: ''}
    }

    submitCode(){
        let sendObj = {
            phone_number: this.props.proAuthStore.proUser.phone_number,
            code: this.state.text
        }
        this.props.closeModal();
        // this is the fetch for the verify code for the phone, inactive on the server for now
        fetcher('api/sms/verify/check/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
    }

    successCallback(response) {
        if(response.user){
            //user is registered
            this.props.proAuthStore.updatePro(response)
        }
        else{
            //user is not registered yet
            this.props.proAuthStore.updatePro(response)
        }
    }
    //
    errorCallback(error){
        console.warn('error in proPhoneVerifyModal:', error);
    }
    componentDidMount(){
        this._input.clear();
        setTimeout(()=>{
            const actionToDispatch = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'DrawerNavigation',
                        action: NavigationActions.navigate({routeName: 'Home'}),
                    })
                ],
            });
            this.props.navigationStore.dispatch(actionToDispatch)
        },5000)
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{position: 'absolute', top: 10, left: 20}}
                                  onPress={()=>{this.props.modalsStore.hideModal('proPhoneVerifyModal')}}>
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


