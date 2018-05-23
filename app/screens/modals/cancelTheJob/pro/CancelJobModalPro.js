import React from 'react';
import {View, Image, StyleSheet, Alert,TextInput, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {SW, SH, fontGrey} from "../../../../config/styles";
import Text from '../../../../components/text/Text'
import {submitButton} from "../../../../components/modalSubmitButton";
import {inject, observer} from "mobx-react/native";
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
import {NavigationActions} from "react-navigation";


const CancelJobModal = (props) => {

    return (
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <KeyboardAvoidingView style={styles.modalContainer} behavior="position" enabled>
                <View style={styles.modalView}>

                    {/* Exit Icon */}
                    <View style={styles.eXicon}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.modalsStore.closeModal('proCancelJobModal');
                            }}>
                            <Image
                                source={require('../../../../../assets/icons/Exit.png')}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    {/*The Content*/}
                    <View style={{flex: 1, width: SW / 1.5, alignSelf: 'center'}}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                style={{width: 50, height: 55}}
                                source={require('../../../../../assets/icons/cancelRed.png')}
                            />
                            <Text type={'greyTitle'}>אתה מבטל את ההזמנה עם </Text>
                            <Text type={'greyTitle'}>אלכסנרה קנדל</Text>
                        </View>
                        <View style={{flex: 1, }}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TouchableWithoutFeedback onPress={() => {
                                    props.changeBox()
                                }}>
                                    <View
                                        style={{flex: 1, justifyContent: 'center'}}>
                                        {props.accident ?
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../../assets/registration/icons/Vee.png')}/> :
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../../assets/registration/icons/square.png')}/>}
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text>אישרתי בטעות</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TouchableWithoutFeedback onPress={() => {
                                    props.changeBox()
                                }}>
                                    <View
                                        style={{flex: 1,  justifyContent: 'center'}}>
                                        {props.notCome ?
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../../assets/registration/icons/Vee.png')}/> :
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../../assets/registration/icons/square.png')}/>}
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{flex: 1,  justifyContent: 'center'}}>
                                    <Text>איני יכול להגיע</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{alignSelf: 'flex-end'}}>פרט סיבה</Text>
                            <TextInput
                                multiline={true}
                                numberOfLines={20}
                                selectionColor={fontGrey}
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                value={''}
                            />
                        </View>
                        <View style={{flex: 1,  justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                {submitButton('אשר', 'pro', () => {
                                    props.proCancelJob()
                                })}
                            </View>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </View>
    )
}


@inject("navigationStore")
@inject("userDataStore")
@inject("modalsStore")
@observer
export default class CancelJobModalPro extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            accident: false,
            notCome: true
        }
    }

    componentDidMount(){
        console.log("pro navigations:", this.props.navigationStore);
    }

    changeBox = () => {
        prevA = this.state.accident;
        prevB = this.state.notCome;
        this.setState({
            accident: !prevA,
            notCome: !prevB
        })
    }

    // Job Cancel Handling

    proCancelJob(){
        let jobId = this.props.userDataStore.focusedJob.id;
        let sendObj = {
            status: 'canceled',
            canceled_by: 'pro'
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        };
        //start job route is also the route for pro to cancel the job
        let route = startJobRoute(jobId);

        this.props.modalsStore.hideModal("proCancelJobModal");
        this.props.modalsStore.showModal("loaderModal");
        fetcher(route, 'PATCH', this.successProCancel.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    //navigate away from current focused job after it has been canceled
    navigateAway(){
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'ProNavigator',
                    action: NavigationActions.navigate({routeName: 'Home'}),
                })
            ],
        });
        this.props.navigationStore.dispatch(actionToDispatch)
    }

    successProCancel(res) {
        this.props.userDataStore.removeProPost(res.id);
        this.props.modalsStore.hideModal("loaderModal");
        Alert.alert("העבודה בוטלה בהצלחה")
        this.navigateAway();
    }

    errorCallback(err) {
        this.props.modalsStore.hideModal("loaderModal");
        console.log('error in active job/index', err);
    }

    ////

    render() {
        return (
            <CancelJobModal {...this.state} changeBox={this.changeBox.bind(this)} proCancelJob={this.proCancelJob.bind(this)}/>
        )
    }
}


let styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        alignSelf: 'center',
        marginTop: SW / 20,
        backgroundColor: '#F6F6F6',
        height: SH - (SH / 10),
        width: SW - (SW / 10)
    },
    eXicon: {
        flex: 0.06,
        width: SW / 13,
        marginTop: SW / 15,
        marginLeft: SW / 15,
    },
    textInput: {
        height: SH / 5,

        borderColor: '#ECECEC',
        borderWidth: 3,
        backgroundColor: '#fcfcfc',
        borderRadius: 10,
        width: SW / 1.5,
        textAlign: 'right',
        paddingRight: 10,
        textAlignVertical: 'top',
        zIndex: 3
    },

})
