import React from 'react';
import {
    View,
    BackHandler,
    AsyncStorage
} from 'react-native';
import Pushy from 'pushy-react-native';
import {mainRoute} from "../config/apiRoutes";

//this function handle the pushy token-:(happens every manual login/register)
//1 - register the device to pushy and get a token back
//2 - sends the pushy token to the server for saving it in the db(in update token to server func
export const handlePushyToken = (serverToken) => {
    AsyncStorage.getItem('GetServiceUserPushyToken', (err, result) => {
            let pushyTokenObj = JSON.parse(result);
            if (!pushyTokenObj) {
                Pushy.register().then(async (deviceToken) => {
                    // Print device token to console
                    console.log('Pushy device token: ' + deviceToken);
                    pushyTokenObj = {push_token: deviceToken};
                    updateTokenToServer(pushyTokenObj, serverToken);
                    AsyncStorage.setItem('GetServiceUserPushyToken', JSON.stringify(deviceToken));
                })
            }
            else {
                console.log('Pushy token:', pushyTokenObj);
                pushyTokenObj = {push_token: JSON.parse(result)};
                updateTokenToServer(pushyTokenObj, serverToken);
            }

        }
    );
}
const updateTokenToServer = (tokenObj, serverToken) => {
    console.log('tokenObj',tokenObj, serverToken);
    fetch(`${mainRoute}/api/rest-auth/user/`, {
        method: 'PATCH',
        headers: {
            'Accept': `application/json`,
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + serverToken
        },
        body: JSON.stringify(tokenObj)
    })
        .then(response => response.json())
        .then(responseJson => {
            console.log('registration finished fetch');
        }).catch(error => {
        console.log('RegisterSteps error pushy notification', error);
    });
}