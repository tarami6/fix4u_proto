// React
import React from 'react';
import {View, Text, Image, StyleSheet, Platform, TouchableHighlight, Alert} from 'react-native';
// Components
import LinierView from '../../../../components/linierView';
import CustomHeaderAddJobStepsConsumer from '../../../../components/headers/CustomHeaderAddJobStepsConsumer'
import {submitButton} from "../../../../components/modalSubmitButton";
// Mobx
import {inject, observer} from "mobx-react/native";
// Styles
import {SH, SW} from "../../../../config/styles";

let data = {
    service: 'חשמלאי',
    servicePic: require('../../../../../assets/icons/serviceElectrician.png'),
}


@inject("navigationStore")
@inject("addJobStore")
@observer
export default class ChooseTime extends React.Component {

    constructor(props){
        super(props);
    }
    goBack(){
        this.props.navigation.goBack()
    }
    static navigationOptions = {
        header: null,
    };

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

    componentWillMount(){
        // console.warn('index is:', this.props.navigationStore.navigationState.index)
        // console.log('chooseTime navigationState:', this.props.navigationStore.navigationState)
    }


    render() {
        return (
            <View style={{flex: 1}}>
                {/*Orange Head*/}
                <LinierView>
                    <CustomHeaderAddJobStepsConsumer props={this.props}/>
                    <View style={{flex: 1, marginLeft: SW / 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={require('../../../../../assets/icons/stepIndicatorConsumer1.png')}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            style={{alignSelf: 'center'}}
                            source={data.servicePic}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{alignSelf: 'center', fontSize: 18, color: '#fff'}}>{data.service}</Text>
                    </View>
                </LinierView>
                {/*The Body*/}

                <View style={{flex: 1,}}>
                    {/*price list and order button*/}
                    <View style={{flex: 1.2, alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#000', fontSize: 18}}>
                                מחיר הגעה מומלץ 130 ש"ח
                            </Text>
                            <Text style={{fontSize: 14}}>
                                צפה במחירון
                            </Text>
                        </View>

                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableHighlight onPress={ this.handleSubmit.bind(this)}>
                                <View style={{
                                    width: SW / 1.5,
                                    height: SH / 13,
                                    borderColor: 'orange',
                                    borderWidth: 2,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{color: 'orange', fontSize: 20}}>הזמן לעכשיו</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {/*Choose Date*/}
                    <View style={{flex: 1.2,}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={{fontSize: 14, marginTop: 20}}>or</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text>Choose the date</Text>
                            <TouchableHighlight onPress={() => Alert.alert("coming soon")}>
                                <View style={{
                                    width: SW / 1.5,
                                    height: SH / 13,
                                    borderColor: '#E0E0E0',
                                    borderWidth: 2,
                                    borderRadius: 7,
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
                            </TouchableHighlight>
                        </View>
                    </View>
                    {/*Button Next*/}
                    <View style={{flex: 0.8, justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                            {submitButton('המשך',
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