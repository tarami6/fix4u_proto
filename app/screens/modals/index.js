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

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>Hello!</Text>
            {/*{this._renderButton("Close", () => this.setState({visibleModal: null}))}*/}
        </View>
    );

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
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