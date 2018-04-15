import {fetcher} from "../config/fetcher";

const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

export const tryLogin = (authStore, userDataStore, callbackFunc = () => {
}) => {
    //consumer autoLogin:
    AccessToken.getCurrentAccessToken().then((data) => {
        //updating store with fbToken:
        let item = data.accessToken.toString();
        authStore.updateUser({fbToken: item});
        console.warn('item: ', item)
        //////

        // server fetching the Login info with the fbToken:
        let sendObj = {
            access_token: item
        };

        //fetcher callback funcs inside so the will have access to stores
        const successCallback = (response) => {
            console.warn('success autoLogin');
            // type: '',
            //     phone_number: '',
            //     token: '',
            //     fbToken: '',
            //     password: '',
            console.log('userData:', response)
            let updateObj = {
                token: response.token,
                phone_number: response.user.phone_number,
                type: 'consumer'
            };
            authStore.updateUser(updateObj);
            userDataStore.setUserData(response);
            callbackFunc();
            console.warn(authStore.user.type)
            return 1; //success
        };
        const errorCallback = (err) => {
            console.log('error in tryLogin func:', err)
            return 0; //err
        };


        fetcher('api/rest-auth/facebook/login/', 'POST', successCallback, errorCallback, sendObj)


    }).catch(err => console.warn('no token:', err))
}


