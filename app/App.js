/**
 * The bottom component
 * also:
 * manages notifications data transfer to mobx
 * keeps the user logged on this phone as long as long as he didn't logout - asyncStorage/facebook login
 */

import React, {Component} from 'react';
import {AppState, PermissionsAndroid, ToastAndroid} from 'react-native';
import ScreensBase from './screens';
import {Provider} from "mobx-react";
import AuthStore from './state-manager/mobx/authStore';
import AddJobStore from './state-manager/mobx/addJobStore';
import UserDataStore from './state-manager/mobx/userDataStore';
import ProAuthStore from "./state-manager/mobx/proAuthStore";
import ModalsStore from './state-manager/mobx/modalsStore'
import NavigationStore from "./state-manager/mobx/navigationStore";
import OpenJobsStore from './state-manager/mobx/openJobsStore';


import {StackNavigator} from 'react-navigation';

import Pushy from 'pushy-react-native';


// Ramistesting
import ChooseJob from './screens/chooseJob';
import ScheduleConsumer1 from './screens/schedule/scheduleConsumer/ScheduleConsumer1';
import OnTheWayConsumer1 from './screens/activeJob/onTheWay/onTheWayConsumer/OnTheWayConsumer1';
import InProgressConsumer1 from './screens/activeJob/inProgress/inProgressConsumer/InProgressConsumer1';
import Review from './screens/activeJob/consumerReview/consumerReviewConsumer/Review';
import SchedulePro1 from './screens/schedule/schedulePro/SchedulePro1';

//the usual consumer costumer auth process happens here
let authStore = new AuthStore();
//pro Auth state manager:
let proAuthStore = new ProAuthStore();
//CRUD for the response from user authentication
let userDataStore = new UserDataStore();
// addJob state manager for the process
let addJobStore = new AddJobStore();
//modals state manage - manages the displays of all of our app modals:
let modalsStore = new ModalsStore();
//navigation store
let navigationStore = new NavigationStore();
//choose Job and all openJobs handling store:
let openJobsStore = new OpenJobsStore();


const HomeNavigation = StackNavigator({
    Home: {
        screen: Review
    }
})


let appState = '';

Pushy.setNotificationListener(async (data) => {
        // Print notification payload data
        console.log('Received notification: ' + JSON.stringify(data));
        if (data.type) {
            let payload = JSON.parse(data.payload);
            if (appState === 'active') {
                handleNotificationData(data.type, payload);
            }
            else {
                let updateAppInterval = setInterval(() => {
                    if (appState === 'active') {
                        clearInterval(updateAppInterval);
                        handleNotificationData(data.type, payload);
                    }
                }, 5000)
            }
        }
        let notificationTitle = 'Fix4u';
        // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
        let notificationText = data.message || 'Test notification';
        // Display basic system notification
        if (appState !== 'active') {
            Pushy.notify(notificationTitle, notificationText);
        }
        else {
            ToastAndroid.showWithGravityAndOffset(
                notificationText,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }
);

let handleNotificationData = (type, payload) => {
    switch (type) {
        case 'active_post_update':
            if (payload.id === userDataStore.focusedJob.id) {
                userDataStore.focusJob(payload);
            }
            userDataStore.updatePost(payload);
            break;

        case 'post_update': // when a consumer get post apply
            if (payload.id === userDataStore.focusedJob.id) {
                userDataStore.focusJob(payload);
            }
            userDataStore.updatePost(payload);
            break;
        case 'pro_post_update': // this is the route for updating the pot_posts
            if (payload.id === userDataStore.focusedJob.id) {
                userDataStore.focusJob(payload);
            }
            userDataStore.updateProPost(payload);
        case 'post_open': // a new post has been open
            openJobsStore.addJob(payload);
            break;
        case 'post_add': // only for pro, new post for pro
            userDataStore.addProPost(payload);
            userDataStore.focusJob(payload);
            break;
        default:
            console.warn("notification wasn't handled:", type);

    }
    console.warn('handle not:', 'type: ' + type, 'payload: ' + payload);
}

type Props = {};
export default class App extends Component<Props> {
    componentDidMount() {
        //get the app state - background/foreground/active
        AppState.addEventListener('change', state => {
                console.log('AppState changed to', state);
                appState = state;
            }
        );

        // Start the Pushy service
        Pushy.listen();
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((granted) => {
            if (!granted) {
                // Request the WRITE_EXTERNAL_STORAGE permission so that the Pushy SDK will be able to persist
                // the device token in the external storage
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
                    // User denied permission?
                    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                        // Possibly ask the user to grant the permission
                    }
                });
            }
        });
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((granted) => {
            if (!granted) {
                // Request the WRITE_EXTERNAL_STORAGE permission so that the Pushy SDK will be able to persist
                // the device token in the external storage
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
                    // User denied permission?
                    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                        // Possibly ask the user to grant the permission
                    }
                });
            }
        });
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((granted) => {
            if (!granted) {
                // Request the WRITE_EXTERNAL_STORAGE permission so that the Pushy SDK will be able to persist
                // the device token in the external storage
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
                    // User denied permission?
                    if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                        // Possibly ask the user to grant the permission
                    }
                });
            }
        });


    }

    render() {
        return (
            <Provider navigationStore={navigationStore} authStore={authStore} addJobStore={addJobStore}
                      userDataStore={userDataStore} proAuthStore={proAuthStore} modalsStore={modalsStore}
                      openJobsStore={openJobsStore}>
                <ScreensBase/>
            </Provider>
        )
    }
}
