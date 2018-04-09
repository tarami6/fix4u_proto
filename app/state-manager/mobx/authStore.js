import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class AuthStore {

    // screensBase options:
    //screen options: loadingScreen/intro/auth/navigator
    @observable currentScreen = 'intro';

    @action changeScreen(newScreen) {
        this.currentScreen = newScreen;
    }

    @action skipIntro() {
        this.changeScreen('home')
    }
}
