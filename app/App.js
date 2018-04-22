/**
 * The bottom component
 * also:
 * manages notifications data transfer to mobx
 * keeps the user logged on this phone as long as long as he didn't logout - asyncStorage/facebook login
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ScreensBase from './screens';
import {Provider} from "mobx-react";
import AuthStore from './state-manager/mobx/authStore';
import AddJobStore from './state-manager/mobx/addJobStore';
import UserDataStore from './state-manager/mobx/userDataStore';
import ProAuthStore from "./state-manager/mobx/proAuthStore";
import ModalsStore from './state-manager/mobx/modalsStore'
import NavigationStore from "./state-manager/mobx/navigationStore";
import OpenJobsStore from './state-manager/mobx/openJobsStore'
//the usual consumer costumer auth process happens here
let authStore = new AuthStore();
//pro Auth state manager:
let proAuthStore = new ProAuthStore()
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

type Props = {};
export default class App extends Component<Props> {


    render() {
        return (
            <Provider navigationStore={navigationStore} authStore={authStore} addJobStore={addJobStore}
                      userDataStore={userDataStore} proAuthStore={proAuthStore} modalsStore={modalsStore}
                      openJobsStore={openJobsStore}
            >
                <ScreensBase/>
            </Provider>
        )
    }
}
