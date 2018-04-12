import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class UserDataStore {
    //This object is the response from the database stragiht after authentication
    @observable userData = {};
    @action setUserData(data: Object){
        this.userData = data;
    }
}
//AUTH: