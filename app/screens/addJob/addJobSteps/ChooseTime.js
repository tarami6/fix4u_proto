// React
import React from 'react';
import {
    BackHandler,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    Alert
} from 'react-native';
// Components
import LinierView from '../../../components/linierView';
import {submitButton} from "../../../components/modalSubmitButton";
// Mobx
import {inject, observer} from "mobx-react/native";
// Styles
import {mainStyles, SH, SW} from "../../../config/styles";

import Header from '../../../components/headers/Header'
// Config
import {hebrewServices} from "../../../generalFunc/generalObjects";
import {NavigationActions} from "react-navigation";

let data = {
    service: 'חשמלאי',
    servicePic: require('../../../../assets/icons/serviceElectrician.png'),
}


@inject("navigationStore")
@inject("addJobStore")
@observer
export default class ChooseTime extends React.Component {

    static navigationOptions = {
        header: null,
    };
    handleBackButton = () => {
        const {dispatch} = this.props.navigationStore;
        const {navigationState} = this.props.navigationStore;
        const routeName = navigationState.routes[0].routeName

        if (routeName === 'ConsumerNavigator' || routeName === 'ProNavigator') {
            if (navigationState.routes[0].routes[0].routes[0].index === 0) {
                return false
            }
            else {
                dispatch(NavigationActions.back())
                return true;
            }
        }
        else {
            if (navigationState.index === 0) {
                this.props.navigation.goBack()
                // return false
            }
            dispatch(NavigationActions.back())
            return true
        }

        // return true;
    }

    constructor(props) {
        super(props);
    }

    goBack() {
        this.props.navigation.goBack()
    }

    handleSubmit() {
        let date = new Date().toISOString().slice(0, 10);
        ;
        let time_start = '10:00:00';
        let time_end = '12:00:00';
        let sendObj = {
            appointment_date: date,
            appointment_time_start: time_start,
            appointment_time_end: time_end
        }
        this.props.addJobStore.editNewJobInfo(sendObj);
        this.props.navigation.navigate('ExplainTheJob');
    }

    componentWillMount() {
        // console.warn('index is:', this.props.navigationStore.navigationState.index)
        // console.log('chooseTime navigationState:', this.props.navigationStore.navigationState)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    render() {
        console.log("serviceJOB", this.props.addJobStore.newJobInfo.service)
        return (
            <View style={{flex: 1}}>
                {/*Orange Head*/}
                <LinierView>
                    <Header head={'AddJob'} previousPage={'ChooseService'} props={this.props}/>
                    <View style={{flex: 1, marginLeft: SW / 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require('../../../../assets/icons/stepIndicatorConsumer1.png')}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            style={{alignSelf: 'center'}}
                            source={data.servicePic}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={mainStyles.whiteTitle}>
                            {hebrewServices[this.props.addJobStore.newJobInfo.service]}
                        </Text>
                    </View>
                </LinierView>
                {/*The Body*/}

                <View style={{flex: 1,}}>
                    {/*price list and order button*/}
                    <View style={{flex: 1.2, alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={mainStyles.greyTitle}>
                                מחיר הגעה מומלץ 130 ש"ח
                            </Text>
                            <Text style={{fontSize: 14}}>
                                צפה במחירון
                            </Text>
                        </View>

                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableWithoutFeedback onPress={this.handleSubmit.bind(this)}>
                                <View style={{
                                    width: SW / 1.5,
                                    height: SH / 13,
                                    borderColor: 'orange',
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={[mainStyles.buttonText, {color: '#FFAC50'}]}>הזמן לעכשיו</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    {/*Choose Date*/}
                    <View style={{flex: 1.2,}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontSize: 14, marginTop: 20}}>או</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text>בחר תאריך</Text>
                            <TouchableWithoutFeedback
                                onPress={() => Alert.alert('Under Development')}>
                                <View style={{
                                    width: SW / 1.5,
                                    height: SH / 13,
                                    borderRadius: 7,
                                    borderWidth: 0.1,
                                    borderTopWidth: 4,
                                    borderLeftWidth: 2,
                                    borderRightWidth: 2,
                                    borderColor: 'rgba(218, 218, 218, 0.35)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <View style={{
                                        width: (SW / 1.5) / 3,
                                        height: (SH / 13) / 1.5,
                                        borderRightWidth: 1,
                                        borderLeftWidth: 1,
                                        borderColor: '#000'
                                    }}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    {/*Button Next*/}
                    <View style={{flex: 0.8, justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                            {submitButton('המשך', 'consumer',
                                this.handleSubmit.bind(this)
                            )}
                        </View>
                    </View>
                </View>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Platform.OS == 'ios' ? 30 : 10
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '300',
    },
    leftIcon: {
        color: '#fff',
        paddingLeft: 20,
        fontSize: 35
    },
    rightIcon: {
        color: '#fff',
        fontSize: 35,
    },
    rightButton: {
        paddingRight: 20,
        // paddingLeft: 20,
    },
    counter: {
        position: 'absolute',
        right: 10,
        top: 30
    },
    textWraper: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fd8724'
    }
});