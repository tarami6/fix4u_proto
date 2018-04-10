import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class AddJobStore {
    @observable newJobInfo = {};
    @action editNewJobInfo(data: Object){
        if(data.service){
            this.newJobInfo.service = data.service;
        }
    }

}