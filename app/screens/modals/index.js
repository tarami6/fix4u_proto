import React, {Component} from "react";
import {View} from "react-native";
import Modal from "react-native-modal";
import {inject, observer} from "mobx-react/native";
import ProPhoneVerifyModal from './proPhoneVerifyModal';
import ChooseJobModal from './chooseJobModal'
import ModalLoader from './Loader/ModalLoader'
import ConsumerCancelJobModal from './cancelTheJob/consumer';
import ProCancelJobModal from './cancelTheJob/pro';

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


    closeModal(modalName) {
        this.props.modalsStore.closeModal(modalName);
    }

    render() {
        return (
            <View>
                <Modal
                    animation={'bounceIn'}
                    isVisible={this.props.modalsStore.proPhoneVerifyModal && this.state.showModals}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={() => {
                        this.closeModal('proPhoneVerifyModal')
                    }}
                    onBackdropPress={() => {
                        this.closeModal('proPhoneVerifyModal')
                    }}
                >
                    <ProPhoneVerifyModal closeModal={() => {
                        this.closeModal('proPhoneVerifyModal')
                    }}/>
                </Modal>
                <Modal
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    isVisible={this.props.modalsStore.chooseJobModal && this.state.showModals}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={() => {
                        this.closeModal('chooseJobModal')
                    }}
                    onBackdropPress={() => {
                        this.closeModal('chooseJobModal')
                    }}
                >
                    <ChooseJobModal/>
                </Modal>
                <Modal
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    isVisible={this.props.modalsStore.loaderModal && this.state.showModals}
                    animationInTiming={100}
                    animationOutTiming={200}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                >
                    <ModalLoader/>
                </Modal>
                <Modal
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    isVisible={this.props.modalsStore.consumerCancelJobModal && this.state.showModals}
                    animationInTiming={100}
                    animationOutTiming={200}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={() => {
                        this.closeModal('consumerCancelJobModal')
                    }}
                    onBackdropPress={() => {
                        this.closeModal('consumerCancelJobModal')
                    }}>
                >
                    <ConsumerCancelJobModal/>
                </Modal>
                <Modal
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    isVisible={this.props.modalsStore.proCancelJobModal && this.state.showModals}
                    animationInTiming={100}
                    animationOutTiming={200}
                    backdropTransitionInTiming={2000}
                    backdropTransitionOutTiming={1000}
                    onBackButtonPress={() => {
                        this.closeModal('proCancelJobModal')
                    }}
                    onBackdropPress={() => {
                        this.closeModal('proCancelJobModal')
                    }}>
                    <ProCancelJobModal/>
                </Modal>
            </View>
        )
    }
}
