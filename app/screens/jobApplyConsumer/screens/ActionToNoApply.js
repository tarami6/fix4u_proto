import React from 'react';
import {Alert, BackHandler, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../../../components/text/Text'
import {HH, LinierBackground, mainRed, mainStyles, SH, SW} from "../../../config/styles";
import {NavigationActions} from "react-navigation";
import {inject, observer} from "mobx-react/native";
//config
import {editPostConsumerRoute, prosListRoute} from "../../../config/apiRoutes";
import {fetcher} from "../../../generalFunc/fetcher";

@inject("navigationStore")
@inject("prosListStore")
@inject("userDataStore")
@observer
export default class ActionToNoApply extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
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

    searchAgain() {

        let currentJob = this.props.userDataStore.focusedConsumerJob;
        let route = editPostConsumerRoute(currentJob.id);
        let sendBody = {
            status: "open",
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        }
        fetcher(route, 'PATCH', this.searchAgainSuccessCB.bind(this), this.errCB.bind(this), sendBody, headers)
    }

    getProsList() {
        let currentJob = this.props.userDataStore.focusedConsumerJob;
        let route = prosListRoute(currentJob.id);
        let sendBody = {
            token: this.props.userDataStore.userData.token
        }
        fetcher(route, 'GET', this.getProsListSuccessCB.bind(this), this.errCB.bind(this), sendBody)
    }

    getProsListSuccessCB(res) {
        console.log("success CB in get pros list in action to no apply!", res);

        this.props.navigationStore.dispatch(NavigationActions.navigate({
            routeName: 'ProsListToConnect'
        }));

    }

    searchAgainSuccessCB(res) {
        // setTimeout(()=>{
        //     let actionToDispatch;
        //     if(this.props.userDataStore.userType === "pro"){
        //         actionToDispatch = NavigationActions.reset({
        //             index: 0,
        //             key: null,
        //             actions: [
        //                 NavigationActions.navigate({
        //                     routeName: 'ProNavigator',
        //                     action: NavigationActions.navigate({routeName: 'ApplyBaseScreen'}),
        //                 })
        //             ],
        //         });
        //     }
        //     else {
        //         actionToDispatch = NavigationActions.reset({
        //             index: 0,
        //             key: null,
        //             actions: [
        //                 NavigationActions.navigate({
        //                     routeName: 'ConsumerNavigator',
        //                     action: NavigationActions.navigate({routeName: 'ApplyBaseScreen'}),
        //                 })
        //             ],
        //         });
        //     }
        //     this.props.navigation.dispatch(actionToDispatch)
        // }, 500)
        this.props.userDataStore.updateOpenPost(res);
        this.props.userDataStore.focusConsumerJob(res);
        this.props.navigation.navigate('ApplyBaseScreen');

        console.log('success update timer!', res);
    }
    consumerCancel(){
        let jobId = this.props.userDataStore.focusedConsumerJob.id;
        let sendObj = {
            status: 'canceled',
            canceled_by: 'consumer'
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        };
        //start job route is also the route for pro to cancel the job
        let route = editPostConsumerRoute(jobId);
        fetcher(route, 'PATCH', this.successConsumerCancel.bind(this), this.errCB.bind(this), sendObj, headers)
    }

    successConsumerCancel(res){
        console.log('canceled job?', res);
        Alert.alert('עבודה בוטלה בהצלחה');
        this.props.userDataStore.removeOpenPost(res.id);
        this.props.navigation.navigate('AddJob');
    }

    errCB(err) {
        console.log('error update timer', err);
    }

    render() {
        if(!this.props.userDataStore.focusedConsumerJob.id){
            this.props.navigation.navigate("AddJob");
        }
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
                            <TouchableOpacity onPress={() => this.getProsList()}>
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
                    <TouchableOpacity onPress={() =>
                    {
                        Alert.alert(
                            'ביטול עבודה',
                            'האם אתה בטוח שאתה מעוניין לבטל את העבודה הנוכחית?',
                            [
                                {text: 'לא, בטל פעולה', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'כן', onPress: () => this.consumerCancel()},
                            ],
                            { cancelable: true }
                        )

                    }}>
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