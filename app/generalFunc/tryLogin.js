// here we get all the data from the login
import {fetcher} from "./fetcher";
import {AsyncStorage} from 'react-native'
import {loginRoute, getAppliesRoute} from "../config/apiRoutes";

export const tryLogin = (notificationsStore, userDataStore, callbackFunc, errCB=(err)=>console.log('err:', err)) => {

    //fetch callbacks:
    const successCallback = (response) => {

        //setting allData
        userDataStore.setUserData(response);

        // here we are setting the notifications:
        notificationsStore.setNotificationsFromLogin(response.user.notifications)

        //now setting user type - also for check what was last currentUserType for pro to open app on last known state

        let userType = response.user.services ? 'pro' : 'consumer';
        //setting the user type:
        if(userType === "pro"){

            userDataStore.setUserType(userType);
            AsyncStorage.getItem("GetServiceUserType").then((value) => {
                let lastUserType = JSON.parse(value);
                userDataStore.setCurrentUserType(lastUserType)
                callbackFunc(response);
            }).catch((err) => {
                userDataStore.setCurrentUserType(userType);
                callbackFunc(response);
            })
        }
        else {
            userDataStore.setUserType(userType);
            userDataStore.setCurrentUserType(userType);
            callbackFunc(response);
        }
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
            // console.warn('no user info on phone');
        }
    })
}


