import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
//AUTH screens import:
import VerifyCodeInput from './VerifyCodeInput'
import PhoneInput from './PhoneInput';
import FacebookLogin from './FacebookLogin'
import {SH, SW, colors} from "../../../../config/styles";
import {inject, observer} from "mobx-react/native";


@inject("authStore")
@observer
export default class ConsumerAuthModal extends Component {
    render() {
        switch (this.props.authStore.authStep) {
            case 'phone_number':
                return (
                    <View style={styles.container}>
                        <PhoneInput closeModal={()=>{this.props.closeModal()}}/>
                    </View>
                )
            //if phone exists in db:
            case 'login':
                return (
                    <View style={styles.container}>
                        <FacebookLogin />
                    </View>
                )
            //in case phone doesnt exist in the system:
            case 'verify_code':
                return (
                    <View style={styles.container}>
                        <VerifyCodeInput />
                    </View>
                )
            case 'consumer_register':
                return (
                    <ConsumerRegister handlePushyToken={this.handlePushyToken.bind(this)}/>
                )
            default:
                return (
                    <View><Text>yo, wrong authStore step</Text></View>
                )
        }
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

