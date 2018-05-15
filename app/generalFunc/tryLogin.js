// here we get all the data from the login
import {fetcher} from "./fetcher";
import {AsyncStorage} from 'react-native'
import {loginRoute, getAppliesRoute} from "../config/apiRoutes";

export const tryLogin = (notificationsStore, userDataStore, callbackFunc, errCB=(err)=>console.warn('err:', err)) => {
    console.log('tryLogin initiated');

    //fetch callbacks:
    const successCallback = (response) => {
        console.warn('success tryLogin');
        console.log('response tryLogin', response);

        // here we are setting the notifications:
        notificationsStore.setNotificationsFromLogin(response.user.notifications)


        let userType = response.user.services ? 'pro' : 'consumer';
        //setting the user type:
        userDataStore.setUserType(userType);
        userDataStore.setUserData(response);
        if(userType === 'pro'){
            // let gotApplies = (res)=>{
            //     userDataStore.setLoading(false);
            //     // console.warn('success cb applies:', res)
            //     callbackFunc(response);
            // };
            userDataStore.setLoading(true);
            callbackFunc(response);
            // fetcher(getAppliesRoute, 'GET', gotApplies, errorCallback, {token: response.token})
        }
        else {
            callbackFunc(response);
        }
        return 1; //success
    };
    const errorCallback = (err) => {
        // userDataStore.setLoading(false);
        errCB(err);
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
            errCB('no user data on phone');
            // userDataStore.setLoading(false);
            console.warn('no user info on phone');
        }
    })
}


