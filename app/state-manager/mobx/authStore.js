import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class AuthStore {
    //AUTH:
    @observable showAuthModal = false;

    @observable setShowAuthModal(bol: boolean){
        this.showAuthModal = bol
    }

    //authentication user info:
    @observable user = {
        type: '',
        phone_number: '',
        token: '',
        fbToken: '',
        password: '', //just for now, later it will only be in the asyncStorage
    }

    @action updateUser(data: Object) {
        if(data.type){
            this.user.type = data.type
        }
        if (data.phone_number) {
            this.user.phone_number = data.phone_number
        }
        if (data.password) {
            this.user.password = data.password
        }
        if (data.token) {
            this.user.token = data.token;
            //got token start token refresher
            if (!this.tokenRefresherActive) {
                // this.tokenRefresher();
                this.tokenRefresherActive = true;
            }
        }
        if (this.user.token && this.user.password) {
            AsyncStorage.setItem('GetServiceUserInfo', JSON.stringify(this.user))
        }
    }

    // authSteps handler:
    @observable authStep = 'phone_number';

    @action updateAuthStep(str) {
        this.authStep = str
    }

    //////////////////// end of AUTH ////////////

    //DrawerNavigator handler start:
    @observable currentNavigationDrawer = 'pro';

    @action changeNavigation(newNavigation){
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

    @action chooseUserType(type){
        if(type==='consumer'){
            this.changeScreen('consumerNavigator')
        }
        else {
            this.changeScreen('proNavigator')
        }
    }
    ///////////
}
