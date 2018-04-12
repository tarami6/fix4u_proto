import {fetcher} from "../config/fetcher";

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

export const tryLogin = (authStore, userDataStore) => {
    AccessToken.getCurrentAccessToken().then((data)=>{
        //updating store with fbToken:
        let item = data.accessToken.toString();
        authStore.updateUser({fbToken: item});
        //////

        // server fetching the Login info with the fbToken:
        let sendObj = {
            access_token: item
        };

        //fetcher callback funcs inside so the will have access to stores
        const successCallback = (response) => {
            console.warn('success autoLogin');
            authStore.updateUser({token: response.token});
            userDataStore.setUserData(response);
            return 1; //success
        };
        const errorCallback = (err) => {
            console.log('error in tryLogin func:', err)
            return 0; //err
        };


        fetcher('api/rest-auth/facebook/login/', 'POST', successCallback, errorCallback, sendObj)






    }).catch(err => console.warn('no token:', err))
}


