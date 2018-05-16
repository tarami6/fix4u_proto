import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class ProsListStore {
    @observable prosList = [];

    @action setProsList(prosList: Array){
        this.prosList = prosList;
    }
}