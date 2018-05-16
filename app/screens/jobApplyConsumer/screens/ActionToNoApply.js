import React from 'react';
import {Alert, BackHandler, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../../../components/text/Text'
import {HH, LinierBackground, mainRed, mainStyles, SH, SW} from "../../../config/styles";
import {NavigationActions} from "react-navigation";
import {observer, inject} from "mobx-react/native";
//config
import {editPostConsumerRoute} from "../../../config/apiRoutes";
import {fetcher} from "../../../generalFunc/fetcher";

@inject("navigationStore")
@inject("userDataStore")
@observer
export default class ActionToNoApply extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton() {
        const {dispatch} = this.props.navigationStore;
        console.log(this.props.navigationStore.navigationState);
        const {navigationState} = this.props.navigationStore;
        // console.log('navigationState',navigationState.index);
        if (navigationState.index === 0) {
            // console.warn('exiting app');
            Alert.alert(
                'Exit App',
                'Exiting the application?', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }, {
                        text: 'OK',
                        onPress: () => BackHandler.exitApp()
                    },], {
                    cancelable: false
                }
            )
            return true;
            // return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }
    searchAgain(){
        let currentJob = this.props.userDataStore.focusedConsumerJob;
        let route = editPostConsumerRoute(currentJob.id);
        let sendBody = {
            status: "open",
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        }
        fetcher(route, 'PATCH', this.successCB.bind(this), this.errCB.bind(this), sendBody, headers)
    }

    successCB(res){
        this.props.navigation.navigate('AddJob')
        console.log('success update timer!', res);
    }

    errCB(err){
        console.log('error update timer', err);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={{flex: 1,}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Image
                            style={{width: SW / 10, height: SW / 10, marginBottom: SH / 20}}
                            source={require('../../../../assets/icons/canceling.png')}
                        />
                        <Text type={'greyTitle'}>
                            מתנצלים,
                        </Text>
                        <Text type={'greyTitle'}>
                            אף אחד לא פנוי בזמן הזה
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center',}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => this.searchAgain()}>
                                <LinierBackground>
                                    <Text style={mainStyles.buttonText}>חפש שוב 05:00</Text>
                                </LinierBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigationStore.dispatch(NavigationActions.navigate({
                                routeName: 'ProsListToConnect'}))}>
                                <LinierBackground>
                                    <View style={{
                                        width: SW - 124,
                                        height: HH - 4,
                                        borderRadius: 30,
                                        margin: 1,
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingRight: 40,
                                        paddingLeft: 40
                                    }}>
                                        <Text style={[mainStyles.buttonText, {color: '#fd8724'}]}> לרשימת אנשים
                                            רלוונטיים</Text>
                                    </View>
                                </LinierBackground>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => Alert.alert('Show me List of Pros')}>
                        <View style={{
                            width: SW - 124,
                            height: HH - 4,
                            borderRadius: 30,
                            margin: 1,
                            backgroundColor: mainRed,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: 40,
                            paddingLeft: 40
                        }}>
                            <Text style={[mainStyles.buttonText, {color: '#fff'}]}> בטל </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});