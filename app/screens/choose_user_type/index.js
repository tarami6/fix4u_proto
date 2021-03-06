/* @flow */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View,} from 'react-native';
import Text from '../../components/text/Text'
import {inject, observer} from 'mobx-react';
import authStore from '../../state-manager/mobx/authStore';
import {HH, LinierBackground, mainStyles, SH, SW} from "../../config/styles";
//config:
import {consumerRegistrationRoute} from "../../config/apiRoutes";
import {fetcher} from "../../generalFunc/fetcher";
import {handlePushyToken} from "../../generalFunc/pushyTokenHandler";
import Cicons from '../../components/customIcons/CustomIcons';


@inject('modalsStore')
@inject("userDataStore")
@inject("authStore")
@inject("proAuthStore")
@observer
export default class ChooseUserType extends Component {
    static navigationOptions = {
        header: null
    }
    navigate = (key) => {
        const {navigate} = this.props.navigation
        switch (key) {
            case 'consumer':
                this.props.authStore.updateUser({type: 'consumer'});
                let sendObj = {
                    phone_number: this.props.authStore.user.uid
                }
                this.props.modalsStore.showModal('loaderModal');
                fetcher(consumerRegistrationRoute, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
                break;
            case 'pro':
                this.props.authStore.updateUser({type: 'pro'});
                this.props.proAuthStore.updatePro({
                    phone_number: this.props.authStore.user.phone_number,
                    uid: this.props.authStore.user.uid
                });
                navigate('ProRegistrationNavigator');
                break;
            default:
                return
        }
    }

    successCallback(response) {
        this.props.modalsStore.hideModal('loaderModal');

        this.props.userDataStore.setUserData(response)
        this.props.userDataStore.setUserType('consumer');
        this.props.userDataStore.setCurrentUserType('consumer');
        this.props.authStore.updateUser(response);
        this.props.authStore.saveToAsync();
        handlePushyToken(response.token);
        this.props.navigation.navigate('ConsumerNavigator');
    }

    errorCallback(error) {
        this.props.modalsStore.hideModal('loaderModal');

        console.warn('error in proPhoneVerifyModal:', error);
    }

    render() {
        return (
            <View style={styles.container}>


                <ConsumerButton navigate={() => this.navigate('consumer')}/>
                <View style={{marginTop: (SW / 15)*2, marginBottom: (SH/30)}}>
                    <Cicons name={"a-pro"} size={80} color={"#DBDBDB"}/>
                </View>
                <ProButton navigate={() => this.navigate('pro')}/>
            </View>
        );
    }
}

const
    ConsumerButton = ({navigate}) => {
        return (
            <TouchableOpacity onPress={() => navigate('Consumer')}>
                <LinierBackground>
                    <Text style={mainStyles.buttonText}>אני מחפש איש מקצוע</Text>
                </LinierBackground>
            </TouchableOpacity>
        )
    }

const
    ProButton = ({navigate}) => {
        return (
            <TouchableOpacity onPress={() => navigate('Pro')} style={{
                borderWidth: 1.5,
                borderColor: '#ff8500',
                width: SW - 111,
                height: HH - 3,
                borderRadius: 30,
                margin: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 40,
                paddingLeft: 40,
            }}>
                {/*<LinierBackground>*/}

                    <Text style={[mainStyles.buttonText, {color: '#fd8724'}]}>אני נותן שירות</Text>
                {/*</LinierBackground>*/}
            </TouchableOpacity>
        )
    }


const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f6f6f6',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

