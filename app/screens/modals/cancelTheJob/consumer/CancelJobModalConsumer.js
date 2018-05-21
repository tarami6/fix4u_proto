import React from 'react';
import {View, Image, StyleSheet, Alert, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import {SW, SH, fontGrey, mainRed} from "../../../../config/styles";
import Text from '../../../../components/text/Text'
import {submitButton} from "../../../../components/modalSubmitButton";
import {fetcher} from "../../../../generalFunc/fetcher";
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
                                Alert.alert('exit pressed')
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

export default class TextPage extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            accident: true,
            foundElse: false,
            notIntrest: false
        }
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

    // Job Cancel Handling

    consumerCancelJob(){
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
    navigateAway(){
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'ConsumerNavigator',
                    action: NavigationActions.navigate({routeName: 'Home'}),
                })
            ],
        });
        this.props.navigationStore.dispatch(actionToDispatch)
    }

    successConsumerCancel(res) {
        this.props.navigation.navigate('AddJob');
        this.props.userDataStore.removeActivePost(res.id);

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
            <CancelJobModal {...this.state} changeBox={this.changeBox.bind(this)} cancelJob={this.consumerCancelJob.bind(this)}/>
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
