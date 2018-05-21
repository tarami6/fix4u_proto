/**
 * The bottom component
 * also:
 * manages notifications data transfer to mobx
 * keeps the user logged on this phone as long as long as he didn't logout - asyncStorage/facebook login
 */

import React, {Component} from 'react';
import {Alert, AppState, PermissionsAndroid, ToastAndroid} from 'react-native';
import ScreensBase from './screens';
import {Provider} from "mobx-react";
import AuthStore from './state-manager/mobx/authStore';
import AddJobStore from './state-manager/mobx/addJobStore';
import UserDataStore from './state-manager/mobx/userDataStore';
import ProAuthStore from "./state-manager/mobx/proAuthStore";
import ModalsStore from './state-manager/mobx/modalsStore'
import NavigationStore from "./state-manager/mobx/navigationStore";
import OpenJobsStore from './state-manager/mobx/openJobsStore';
import NotificationsStore from './state-manager/mobx/notificationsStore';
import ProsListStore from './state-manager/mobx/prosListStore';

import Pushy from 'pushy-react-native';

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
//as it sounds:
let notificationsStore = new NotificationsStore();
//for when a user wants to see full prosList:
let prosListStore = new ProsListStore();


// // Ramistesting
// import LoadingPage from './screens/modals/Loader/LoadingPage';
// import ActionToNoApply from './screens/jobApplyConsumer/screens/ActionToNoApply'
// import ProsListToConnect from './screens/jobApplyConsumer/screens/ProsListToConnect'
// import Panels from './components/infoItem/Panels';
// import CancelTheJobModal from './screens/modals/cancelTheJob/pro/CancelJobModalPro';
// import CancelJobModalConsumer from './screens/modals/cancelTheJob/consumer/CancelJobModalConsumer';
// import AccountSettings from './screens/drawer/screens/AccountSettings'
//
// const HomeNavigation = StackNavigator({
//     Home: {
//         screen: ProsListToConnect
//     }
// })


let appState = '';

// Pushy.setNotificationListener(async (data) => {
//     // Print notification payload data
//     console.log('Received notification: ' + JSON.stringify(data));
//
//     // Notification title
//     let notificationTitle = 'MyApp';
//
//     // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
//     let notificationText = data.message || 'Test notification';
//
//     // Display basic system notification
//     Pushy.notify(notificationTitle, notificationText);
// });

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
        let notificationText = data.message;
        // Display basic system notification
        if (appState !== 'active') {
            if (data.message) {
                Pushy.notify(notificationTitle, notificationText);
            }
        }
        else {
            if (data.message) {
                ToastAndroid.showWithGravityAndOffset(
                    notificationText,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
        }
    }
);

let handleNotificationData = (type, payload) => {
    // notificationsStore.setNewNotification(true);
    switch (type) {
        case 'consumer_new_post': // a new post has been open, update for pro map
            notificationsStore.addPostsNotification('open', payload.id, 'pro');
            openJobsStore.addJob(payload);
            break;
        case 'pro_applied': // when a consumer get post apply
            userDataStore.focusConsumerJob(payload);
            userDataStore.updateOpenPost(payload);
            if (userDataStore.currentUserType === "consumer") {
                notificationsStore.removeOpenPostsNotifications('consumer', userDataStore.userData.token, payload.id, true)
            }
            else {
                notificationsStore.addPostsNotification('open', payload.id, 'consumer');
            }
            break;
        case 'consumer_chose_pro': // consumer chose pro for job
            userDataStore.removeAllSentApplies();
            userDataStore.addProPost(payload);
            notificationsStore.addPostsNotification('active', payload.id, 'pro');
            userDataStore.focusJob(payload);
            break;
        case 'pro_update_post':
            console.warn(userDataStore.focusedJob.id);
            if (payload.id === userDataStore.focusedJob.id) {
                userDataStore.focusJob(payload);
                notificationsStore.removePostNotifications('active', payload.id, 'consumer', userDataStore.userData.token)
            }
            else {
                notificationsStore.addPostsNotification('active', payload.id, 'consumer');
            }
            userDataStore.updateActivePost(payload);
            break;
        case 'consumer_paid': // this is the route for updating the pro_posts
            notificationsStore.removePostNotifications('active', payload.id, 'pro', userDataStore.userData.token)
            if (payload.id === userDataStore.focusedJob.id) {
                userDataStore.focusJob(payload);
                // notificationsStore.removePostNotifications('active', payload.id, 'pro', userDataStore.userData.token)
            }
            else {
                // notificationsStore.addPostsNotification('active', payload.id, 'pro');
            }
            userDataStore.removeProPost(payload.id);
        //    for pro that post he apliied to was closed
        case 'open_post_remove':
            if (openJobsStore.focusedJob.id === payload.post_id && modalsStore.chooseJobModal) {
                modalsStore.hideModal('chooseJobModal');
                Alert.alert('העבודה כבר לא רלוונטית(נתפסה על ידי מקצוען אחר או נמחקה על ידי המשתמש');
            }
            userDataStore.removeSentApply(payload.post_id);
            openJobsStore.removeJob(payload.post_id);
            break;
        //    for consumer after 6 minutes that he hasn't updated his post
        case 'user_post_closed':
            userDataStore.removeOpenPost(payload.post_id);
            userDataStore.focusConsumerJob({});
            break;

        //    consumer is getting this
        case 'pro_post_cancel':
            if (payload.id === userDataStore.focusedJob.id) {
                console.warn("pro canceled this post");
                // notificationsStore.removePostNotifications('active', payload.id, 'pro', userDataStore.userData.token)
            }
            console.warn("post with id: " + payload.post_id + " was canceled");
            userDataStore.removeActivePost(payload.post_id);
            break;

        //    the is getting this:
        case 'consumer_post_cancel':
            console.warn("post with id: " + payload.post_id + " was canceled");
            userDataStore.removeProPost(payload.post_id);

        default:
            console.warn("notification wasn't handled:", type);

    }
    console.warn('handle not:', 'type: ' + type, 'payload: ' + payload);
}

type Props = {};
export default class App extends Component<Props> {
    componentDidMount() {
        // Start the Pushy service
        Pushy.listen();
        //get the app state - background/foreground/active
        AppState.addEventListener('change', state => {
                console.log('AppState changed to', state);
                appState = state;
                }
            );


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
                      openJobsStore={openJobsStore} notificationsStore={notificationsStore} prosListStore={prosListStore}>
                <ScreensBase/>
            </Provider>
        )
    }
}
