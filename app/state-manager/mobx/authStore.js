import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class AuthStore {

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
}
