import {inject, observer} from "mobx-react/index";
import React, {Component} from "react";
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {StackNavigator} from "react-navigation";
//header stuff:
import Header from '../../components/headerComponent'
//fetch allJobs
import {fetcher} from "../../generalFunc/fetcher";
import {getOpenPostsRoute} from "../../config/apiRoutes";
//google maps:
import MapComponent from '../../components/mapComponent/MarkersMap'
import {SH, SW, HH} from "../../config/styles";

//dummyData:
let usersPlaces = [
    {
        latitude: 32.0853,
        longitude: 34.781768,
        latitudeDelta: 0.0622 * 0.2,
        longitudeDelta: 0.0421 * 0.2,
    },
    {
        latitude: 32.0753,
        longitude: 34.782768,
        latitudeDelta: 0.0622 * 0.2,
        longitudeDelta: 0.0421 * 0.2,
    }
]


@inject("userDataStore")
@inject('openJobsStore')
@inject("modalsStore")
@observer
export default class ChooseJob extends Component {
    static navigationOptions = {
        header: (
            <Header {...this.props}/>
        )
    };

    componentWillMount() {
        let body = {
            token: this.props.userDataStore.userData.token
        }
        fetcher(getOpenPostsRoute, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), body)
    }

    successCallback(res) {
        // console.log('got:9999', res);
        this.props.openJobsStore.setOpenJobsList(res);
    }

    errorCallback(err) {
        console.warn('error in get open post in ChooseJob:', err);
        console.log('error in get open post in ChooseJob:', err);
    }

    onMarkerPress(openJob, index) {
        // this.props.modalsStore.showModal('proPhoneVerifyModal');
        console.warn(openJob);
        this.props.openJobsStore.focusJob(openJob);
        this.props.modalsStore.showModal('chooseJobModal');
    }

    render() {
        let openJobsList = this.props.openJobsStore.openJobsList
        if (openJobsList && openJobsList.length > 0) {
            return (
                <View style={{flex: 1}}>
                    <View style={{elevation: 5}}>
                        <Header/>
                    </View>

                    <MapComponent onMarkerPress={this.onMarkerPress.bind(this)}
                                  usersPlaces={this.props.openJobsStore.openJobsList}/>
                    <View style={{position: 'absolute', top: HH}}>
                        {/*Waiting for confirmation*/}

                        <TouchableOpacity onPress={() => Alert.alert('Will take you to ? soon')} style={{
                            width: SW,
                            height: SH / 15,
                            backgroundColor: 'rgba(244,244,244,1)',
                            flexDirection: 'row',
                            elevation: 3,
                            alignItems: 'center',
                            justifyContent: 'flex-end',

                        }}>
                            <View style={{flex: 1}}>
                                <Text style={{paddingLeft: 20,}}>3</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{paddingRight: 20,}}>מחכה לאישור</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Got Job*/}
                        <TouchableOpacity onPress={() => Alert.alert(`there are ${this.props.openJobsStore.openJobsList.length} Jobs On map`)}
                                          style={{
                                              width: SW,
                                              height: SH / 15,
                                              backgroundColor: 'rgba(255,255,255,1)',
                                              flexDirection: 'row',
                                              elevation: 2,
                                              alignItems: 'center',
                                              justifyContent: 'flex-end',
                                          }}>
                            <View style={{flex: 1}}>
                                <Text style={{paddingLeft: 20,}}>1</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{paddingRight: 20,}}>עבודה חדשה</Text>
                            </View>
                        </TouchableOpacity>
                        {/*Contact request*/}

                        <TouchableOpacity onPress={() => Alert.alert('Will take you to ? soon')}
                                          style={{
                                              width: SW,
                                              height: SH / 15,
                                              backgroundColor: 'rgba(244,244,244,1)',
                                              flexDirection: 'row',
                                              elevation: 1,
                                              alignItems: 'center',
                                              justifyContent: 'flex-end',
                                          }}>
                            <View style={{flex: 1}}>
                                <Text style={{paddingLeft: 20,}}>3</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{paddingRight: 20,}}>בקשת התחברות</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>

            )
        }
        else {
            return (
                <View>
                    <Text>
                        loading all Open Jobs
                    </Text>
                </View>
            )
        }
    }
}