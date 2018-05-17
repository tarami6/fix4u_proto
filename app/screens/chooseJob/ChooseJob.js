import {inject, observer} from "mobx-react/index";
import React, {Component} from "react";
import {Alert, BackHandler, TouchableOpacity, View} from 'react-native';
import Text from '../../components/text/Text'
//header stuff:
import Header from '../../components/headers/Header'
//fetch allJobs
import {fetcher} from "../../generalFunc/fetcher";
import {getOpenPostsRoute} from "../../config/apiRoutes";
//google maps:
import MapComponent from '../../components/mapComponent/MarkersMap'
import {HH, SH, SW} from "../../config/styles";

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

//for the jobs fetch
let appJustLoaded = true

//we give the app time to fetch jobs before loading the map so we will have all markers on it - comment continue in successCallback
let loadEmptyMap = false

@inject("notificationsStore")
@inject("userDataStore")
@inject('openJobsStore')
@inject("modalsStore")
@observer
export default class ChooseJob extends Component {
    static navigationOptions = {
        header: null
    };
    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => {
                        BackHandler.exitApp()
                    }
                },], {
                cancelable: false
            }
        );
        return true;
    };

    constructor(props) {
        super(props);
        this.state = {
            openJobsList: []
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        //remove all pro open notifications since he is now seeing the jobs
        // **** should later be removed each open notification when he actually observe the new post/job ****
        this.props.notificationsStore.removeOpenPostsNotifications('pro');

        this.mounted = true;
        this.getOpenJobs(this.props.openJobsStore.openJobsList);
        let body = {
            token: this.props.userDataStore.userData.token
        }
        if(appJustLoaded) {
            appJustLoaded = false;
            this.props.modalsStore.showModal('loaderModal');
            fetcher(getOpenPostsRoute, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), body);
        }

        this.checkJobsInterval();
    }

    componentDidMount() {
        if (this.props.userDataStore.currentUserType === "consumer") {
            this.props.navigation.navigate('AddJob')
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    // here we set the state to choose what sjobs to display to the user:
    getOpenJobs(jobs: Array) {
        let newJobs = [];
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].status === 'open') {
                //Here I set the jobs I want to show to the user:
                // console.log('this.checkIfUserApplied(jobs[i])', this.checkIfUserApplied(jobs[i]));
                // console.log('newJobs:', newJobs);
                if (!jobs[i].did_i_apply) {
                    newJobs.push(jobs[i]);
                }
            }
        }
        if (this.mounted) {
            this.setState({openJobsList: newJobs}, () => {
                // console.warn('got jobs!');
            })
        }
    }


    successCallback(res) {
        this.props.modalsStore.hideModal('loaderModal');
        if (res.length === 0) {
            loadEmptyMap = true;
        }
        this.props.openJobsStore.setOpenJobsList(res);
    }

    errorCallback(err) {
        this.props.modalsStore.hideModal('loaderModal');
        console.warn('error in get open post in ChooseJob:', err);
        console.log('error in get open post in ChooseJob:', err);
    }

    onMarkerPress(openJob, index) {
        this.props.openJobsStore.focusJob(openJob);
        this.props.modalsStore.showModal('chooseJobModal');
    }

    //as it sounds
    checkJobsInterval() {
        this.jobsInterval = setInterval(() => {
            this.getOpenJobs(this.props.openJobsStore.openJobsList);
            if (!this.mounted) {
                clearInterval(this.jobsInterval);
            }
        }, 2000)
    }


    render() {
        let openJobsList = this.props.openJobsStore.openJobsList;
        let proApplies = this.props.userDataStore.userData.user.pro_applies? this.props.userDataStore.userData.user.pro_applies.slice(0): [];
        // if (openJobsList && openJobsList.length > 0 || loadEmptyMap) {
        return (
            <View style={{flex: 1}}>
                <View style={{elevation: 5, backgroundColor: '#FFBA00'}}>
                    <Header head={'proHome'} {...this.props}/>
                </View>
                {/*Map component: */}
                <MapComponent onMarkerPress={this.onMarkerPress.bind(this)}
                              usersPlaces={this.state.openJobsList}/>
                <View style={{position: 'absolute', top: HH}}>
                    {/*Waiting for confirmation*/}

                    {proApplies.length > 0 &&
                    <View
                        style={{
                            width: SW,
                            height: SH / 15,
                            backgroundColor: '#f6f6f6',
                            flexDirection: 'row',
                            elevation: 3,
                            alignItems: 'center',
                            justifyContent: 'flex-end',

                        }}>
                        <View style={{flex: 1}}>
                            <Text style={{paddingLeft: 20,}}>{proApplies.length}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{paddingRight: 20,}}>מחכה לאישור</Text>
                        </View>
                    </View>
                    }
                    {/*Got Job*/}
                    {this.props.userDataStore.focusedJob.status === 'on_the_way' ?
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('ActiveJob')}
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
                        </TouchableOpacity> : <View/>}
                </View>
            </View>
        )

    }
}