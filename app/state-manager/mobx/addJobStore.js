import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class AddJobStore {
    @observable newJobInfo = {};
    @action editNewJobInfo(data: Object){
        //step 1 collect type of service
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
        //step 3: description and optional image
        if(data.description) {
            this.newJobInfo.description = data.description
        }
        if(data.image){
            this.newJobInfo.image = data.image
        }
        //step 4: address, lat,lan, payment_type, service_fee
        if(data.address){
            this.newJobInfo.address = data.address
        }
        if(data.lat){
            this.newJobInfo.lat = data.lat
        }
        if(data.lon){
            this.newJobInfo.lon = data.lon
        }
        if(data.payment_type){
            this.newJobInfo.payment_type = data.payment_type
        }
        if(data.service_fee){
            this.newJobInfo.service_fee = data.service_fee
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