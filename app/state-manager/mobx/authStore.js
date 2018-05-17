import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'
import {mainRoute} from "../../config/apiRoutes";

export default class AuthStore {
    //AUTH MODAL:
    // @observable showAuthModal = false;
    //
    // @observable setShowAuthModal(bol: boolean) {
    //     this.showAuthModal = bol
    // }

    //authentication user info:
    @observable user = {
        type: '',
        phone_number: '',
        token: '',
        uid: '',
    }

    @action updateUser(data: Object) {
        if (data.type) {
            this.user.type = data.type
        }
        if (data.phone_number) {
            this.user.phone_number = data.phone_number
        }
        if (data.uid) {
            this.user.uid = data.uid
        }
        if (data.token) {
            this.user.token = data.token;
            //got token start token refresher
            this.tokenRefresher();

        }
        if (this.user.token && this.user.password) {
            AsyncStorage.setItem('GetServiceUserInfo', JSON.stringify(this.user))
        }
    }


    //////////////////// end of AUTH ////////////
    @action saveToAsync(){
        AsyncStorage.setItem('GetServiceUser', JSON.stringify({
            phone_number: this.user.phone_number,
            uid: this.user.uid
        }))
    }

    //DrawerNavigator handler start:
    @observable currentNavigationDrawer = 'pro';

    @action changeNavigation(newNavigation) {
        this.currentNavigationDrawer = newNavigation;
    }

    //////////////////////

    // screensBase options:
    //screen options: loadingScreen/intro/chooseUserType/consumerNavigator/proNavigator
    @observable currentScreen = 'intro';

    @action changeScreen(newScreen) {
        this.currentScreen = newScreen;
    }

    @action skipIntro() {
        console.log('skipped?');
        this.changeScreen('chooseUserType')
    }

    @action chooseUserType(type) {
        if (type === 'consumer') {
            this.changeScreen('consumerNavigator')
        }
        else {
            this.changeScreen('proNavigator')
        }
    }

    ///////////
    // token refreshing:
    //flag to know if the tokenRefresher is active
    tokenRefresherActive = false;
    //I refresh the token base on the last date it was refreshed
    lastTokenRefresh = new Date();
    //so there wont be 2 fetches no matter what:
    tokenFetching = false;

    tokenRefresher() {
        this.tokenRefresherActive = true;

        // if (!this.tokenRefresherActive) {
        //     this.tokenRefresherActive = true;
        //     let refresherInterval = setInterval(
        //         () => {
        //             //no more token no more refresher
        //             if (!this.user.token) {
        //                 console.warn('no token, stoped token-refresher')
        //                 this.tokenRefresherActive = false;
        //                 clearInterval(refresherInterval);
        //             }
        //             let currentTime = new Date();
        //             //diff is the difference between last refresh to current time
        //             let diff = Math.floor((currentTime.getTime() - this.lastTokenRefresh.getTime()) / 1000)
        //             if (diff >= 60 * 4) {
        //                 // if (diff >= 0) {
        //                 let tokenObj = {
        //                     token: this.user.token
        //                 }
        //                 this.tokenFetching = true;
        //                 fetch(`${mainRoute}/api/refresh-token/`, {
        //                     method: 'POST',
        //                     headers: {
        //                         'Accept': `application/json`,
        //                         'Content-Type': 'application/json',
        //                     },
        //                     body: JSON.stringify(tokenObj)
        //                 })
        //                     .then(response => response.json())
        //                     .then(responseJson => {
        //                         this.tokenFetching = false;
        //                         let date = new Date();
        //                         this.lastTokenRefresh = date;
        //                         console.log('token was refreshed, from first to second:', this.user.token, responseJson.token)
        //                         this.user.token = responseJson.token;
        //                     })
        //                     .catch(error => {
        //                         this.tokenFetching = false
        //                         if (this._mounted) {
        //                             console.warn('here I need to relogin');
        //                         }
        //                         else {
        //                             setTimeout(() => {
        //                                 this.tokenRefresher();
        //                             }, 1000)
        //                         }
        //                         console.log('token refresher error', error);
        //                     });
        //                 //    here I need to refresh the token
        //             }
        //
        //         },
        //         30 * 1000 //every 30 second it checks
        //     );
        // }
    }
}
