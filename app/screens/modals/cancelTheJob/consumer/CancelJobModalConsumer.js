import React from 'react';
import {Alert, Image, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {fontGrey, mainRed, SH, SW} from "../../../../config/styles";
import Text from '../../../../components/text/Text'
import {submitButton} from "../../../../components/modalSubmitButton";
import {fetcher} from "../../../../generalFunc/fetcher";
import {inject, observer} from "mobx-react/native";
import {NavigationActions} from "react-navigation";
import {editPostConsumerRoute} from "../../../../config/apiRoutes";

const CancelJobModal = (props) => {
    return (
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
            <KeyboardAvoidingView style={styles.modalContainer} behavior="position" enabled>
                <View style={styles.modalView}>

                    {/* Exit Icon */}
                    <View style={styles.eXicon}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                props.closeModal();
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
                                style={{width: 70, height: 70, borderRadius: 100, borderWidth: 5, borderColor: mainRed}}
                                source={require('../../../../../assets/avatars/electricianAvatar.jpg')}
                            />
                            <Text type={'greyTitle'}>אתה מבטל את ההזמנה עם </Text>
                            <Text type={'greyTitle'}>אבי חשמל בע"ם</Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <TouchableWithoutFeedback onPress={() => {
                                    props.changeBox('accident')
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
                                    props.changeBox('foundElse')
                                }}>
                                    <View
                                        style={{flex: 1, justifyContent: 'center'}}>
                                        {props.foundElse ?
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
                                    props.changeBox('notIntrest')
                                }}>
                                    <View
                                        style={{flex: 1, justifyContent: 'center'}}>
                                        {props.notIntrest ?
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../../assets/registration/icons/Vee.png')}/> :
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../../assets/registration/icons/square.png')}/>}
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{flex: 1, justifyContent: 'center'}}>
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
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                {submitButton('אשר', 'pro', () => {
                                    props.cancelJob()
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
export default class TextPage extends React.Component {
    static navigationOptions = {
        header: null
    }
    changeBox = (choose) => {
        switch (choose) {
            case 'accident' :
                this.setState({
                    accident: true,
                    foundElse: false,
                    notIntrest: false
                })
                break;
            case 'foundElse' :
                this.setState({
                    accident: false,
                    foundElse: true,
                    notIntrest: false
                })
                break;
            case 'notIntrest' :
                this.setState({
                    accident: false,
                    foundElse: false,
                    notIntrest: true
                })
                break;
            default:
                break;
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            accident: true,
            foundElse: false,
            notIntrest: false
        }
    }

    // Job Cancel Handling

    consumerCancelJob() {
        let jobId = this.props.userDataStore.focusedJob.id;
        let sendObj = {
            status: 'canceled',
            canceled_by: 'consumer'
        };
        let headers = {
            token: this.props.userDataStore.userData.token
        };
        //start job route is also the route for pro to cancel the job
        let route = editPostConsumerRoute(jobId);

        this.props.modalsStore.hideModal("consumerCancelJobModal");
        this.props.modalsStore.showModal("loaderModal");
        fetcher(route, 'PATCH', this.successConsumerCancel.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    //navigate away from current focused job after it has been canceled
    navigateAway() {
        console.warn('yo');
        this.props.modalsStore.hideModal("consumerCancelJobModal");
        //for now the traditional way to navigate is not working so Im navigating by a render listener on activeJob.
        this.props.userDataStore.focusJob({});
        // let routeName = this.props.userDataStore.userType === "pro" ? "ProNavigator" : "ConsumerNavigator";
        // console.warn('y', routeName);
        // const actionToDispatch = NavigationActions.reset({
        //     index: 0,
        //     key: null,
        //     actions: [
        //         NavigationActions.navigate({
        //             routeName: "ProNavigator",
        //             action: NavigationActions.navigate({routeName: 'Home'}),
        //         })
        //     ],
        // });
        // this.props.navigationStore.dispatch(actionToDispatch);
    }

    successConsumerCancel(res) {
        this.props.userDataStore.removeActivePost(res.id);
        this.props.modalsStore.hideModal("loaderModal");
        Alert.alert("העבודה בוטלה בהצלחה");
        this.navigateAway();
    }

    errorCallback(err) {
        this.props.modalsStore.hideModal("loaderModal");
        console.log('error in active job/index', err);
    }

    ////

    render() {
        return (
            <CancelJobModal {...this.state} changeBox={this.changeBox.bind(this)}
                            closeModal={()=>this.props.modalsStore.closeModal('consumerCancelJobModal')}
                            cancelJob={this.consumerCancelJob.bind(this)}/>
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
