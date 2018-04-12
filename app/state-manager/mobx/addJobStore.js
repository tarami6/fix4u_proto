import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class AddJobStore {
    @observable newJobInfo = {};
    @action editNewJobInfo(data: Object){
        //step 1
        if(data.service){
            this.newJobInfo.service = data.service;
        }
        //step 2 collect time and date info
        if(data.appointment_date) {
            this.newJobInfo.appointment_date = data.appointment_date
        }
        if(data.appointment_time_start) {
            this.newJobInfo.appointment_time_start = data.appointment_time_start
        }
        if(data.appointment_time_end) {
            this.newJobInfo.appointment_time_end = data.appointment_time_end
        }
        //step 3:
        if(data.description) {
            this.newJobInfo.description = data.description
        }
        if(data.image){
            this.newJobInfo.image = data.image
        }
        if(data.address){
            this.newJobInfo.address = data.address
        }

    }

    @action returnFetchObj(){
        if(this.newJobInfo.image){
        //    handle image sending
        }
        else {
            return this.newJobInfo;
        }
    }

}