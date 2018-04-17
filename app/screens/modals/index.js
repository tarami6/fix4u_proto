import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Modal from "react-native-modal";
import {inject, observer} from "mobx-react/native";
import AuthModal from './authModal';
import ProPhoneVerifyModal from './proPhoneVerifyModal'
import {SH, SW} from "../../config/styles";

@inject("modalsStore")
@inject("authStore")
@observer
export default class Modals extends Component {
    state = {
        showModals: true
    }


    componentWillUnmount() {
        this.setState({
            showModals: false
        })
    }


    closeAuthModal() {
        this.props.authStore.setShowAuthModal(false)
    }

    closeModal(modalName){
        this.props.modalsStore.closeModal(modalName);
    }

    render() {
        return (
            <View>
                <Modal
                    isVisible={this.props.authStore.showAuthModal && this.state.showModals}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={this.closeAuthModal.bind(this)}
                    onBackdropPress={this.closeAuthModal.bind(this)}
                >
                    <AuthModal closeModal={this.closeAuthModal.bind(this)}/>
                </Modal>
                <Modal
                    isVisible={this.props.modalsStore.proPhoneVerifyModal && this.state.showModals}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={()=>{this.closeModal('proPhoneVerifyModal')}}
                    onBackdropPress={()=>{this.closeModal('proPhoneVerifyModal')}}
                >
                    <ProPhoneVerifyModal closeModal={()=>{this.closeModal('proPhoneVerifyModal')}}/>
                </Modal>
            </View>
        )
    }
}
