import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Modal from "react-native-modal";
import {inject, observer} from "mobx-react/native";
import AuthModal from './authModal';
import ProPhoneVerifyModal from './proPhoneVerifyModal';
import ChooseJobModal from './chooseJobModal'
import {SH, SW} from "../../config/styles";
import ModalLoader from './Loader/ModalLoader'

@inject("modalsStore")
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


    closeModal(modalName){
        this.props.modalsStore.closeModal(modalName);
    }

    render() {
        return (
            <View>
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
                <Modal
                    isVisible={this.props.modalsStore.chooseJobModal && this.state.showModals}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    animationType={'fade'}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={()=>{this.closeModal('chooseJobModal')}}
                    onBackdropPress={()=>{this.closeModal('chooseJobModal')}}
                >
                    <ChooseJobModal />
                </Modal>
                <Modal
                    animation={'bounceIn'}
                    isVisible={this.props.modalsStore.loaderModal && this.state.showModals}
                    animationType={'fade'}
                    animationInTiming={100}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                >
                    <ModalLoader />
                </Modal>
            </View>
        )
    }
}
