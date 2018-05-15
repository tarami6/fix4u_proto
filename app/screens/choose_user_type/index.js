/* @flow */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Text from '../../components/text/Text'
import {inject, observer} from 'mobx-react';
import authStore from '../../state-manager/mobx/authStore';
import {HH, LinierBackground} from "../../config/styles";
//config:
import {consumerRegistrationRoute} from "../../config/apiRoutes";
import {fetcher} from "../../generalFunc/fetcher";
import {handlePushyToken} from "../../generalFunc/pushyTokenHandler";
import {SW, mainStyles} from "../../config/styles";


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
                // this.props.authStore.changeNavigation('consumer');
                this.props.authStore.updateUser({type: 'consumer'});
                let sendObj = {
                    phone_number: this.props.authStore.user.uid
                }
                this.props.modalsStore.showModal('loaderModal');
                fetcher(consumerRegistrationRoute, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
                // const actionToDispatch = NavigationActions.reset({
                //     index: 0,
                //     key: null,
                //     actions: [
                //         NavigationActions.navigate({
                //             routeName: 'DrawerNavigation',
                //             action: NavigationActions.navigate({routeName: 'ChooseService'}),
                //         })
                //     ],
                // });
                // this.props.navigation.dispatch(actionToDispatch);
                break;
            case 'pro':
                // this.props.authStore.changeNavigation('pro');
                this.props.authStore.updateUser({type: 'pro'});
                this.props.proAuthStore.updatePro({
                    phone_number: this.props.authStore.user.phone_number,
                    uid: this.props.authStore.user.uid
                });
                // fetcher('api/rest-auth/registration/pro/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj))
                navigate('ProRegistrationNavigator');
                // navigate("Form", {"title": "Form"})
                break;
            default:
                return
        }
    }

    successCallback(response) {
        this.props.modalsStore.hideModal('loaderModal');

        this.props.userDataStore.setUserData(response)
        this.props.userDataStore.setUserType('consumer');
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
                <Text type={'greyTitle'} style={{margin: 40}}>אני</Text>
                <ConsumerButton navigate={() => this.navigate('consumer')}/>
                <Text type={'greyTitle'}  style={{color: '#9b9b9b', margin: 40}}>או</Text>
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
                    <Text style={mainStyles.buttonText}>מחפש איש מקצוע</Text>
                </LinierBackground>
            </TouchableOpacity>
        )
    }

const
    ProButton = ({navigate}) => {
        return (
            <TouchableOpacity onPress={() => navigate('Pro')}>
                <LinierBackground>
                    <View style={{
                        width: SW - 124,
                        height: HH - 4 ,
                        borderRadius: 30,
                        margin: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: 40,
                        paddingLeft: 40
                    }}>
                        <Text style={[mainStyles.buttonText,{color: '#fd8724'}]}>נותן שירות</Text>
                    </View>
                </LinierBackground>
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

