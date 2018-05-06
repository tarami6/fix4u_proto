import {fetcher} from "./fetcher";
import {AsyncStorage} from 'react-native'
import {loginRoute, getAppliesRoute} from "../config/apiRoutes";

export const tryLogin = (userDataStore, callbackFunc) => {
    console.log('tryLogin initiated');

    //fetch callbacks:
    const successCallback = (response) => {
        let userType = response.user.services ? 'pro' : 'consumer';
        //setting the user type:

        userDataStore.setUserType(userType);
        userDataStore.setUserData(response);
        if(userType === 'pro'){
            let gotApplies = (res)=>{
                userDataStore.setLoading(false);
                // console.warn('success cb applies:', res)
                userDataStore.setSentApplies(res);
                callbackFunc(response);
            };
            userDataStore.setLoading(true);
            fetcher(getAppliesRoute, 'GET', gotApplies, errorCallback, {token: response.token})
        }
        else {
            callbackFunc(response);
        }
        return 1; //success
    };
    const errorCallback = (err) => {
        userDataStore.setLoading(false);
        console.log('error in tryLogin func:', err)
        return 0; //err
    };


    AsyncStorage.getItem('GetServiceUser', (err, result) => {
        let userInfoOnPhone = JSON.parse(result);
        if (userInfoOnPhone) {
            let sendObj = {
                username: userInfoOnPhone.phone_number,
                password: userInfoOnPhone.uid
            }
            fetcher(loginRoute, 'POST', successCallback, errorCallback, sendObj);
        }
        else {
            userDataStore.setLoading(false);
            console.warn('no user info on phone');
        }
    })
}


