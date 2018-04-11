import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import {inject, observer} from "mobx-react/native";
import AuthModal from './authModal'
import {SH, SW} from "../../config/styles";

@inject("authStore")
@observer
export default class Modals extends Component {
    state = {
        showModals: true
    }


    componentWillUnmount(){
        this.setState({
            showModals: false
        })
    }


    closeAuthModal(){
        this.props.authStore.setShowAuthModal(false)
    }

    render() {
        return (
            //AuthModal
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
        )
    }
}
