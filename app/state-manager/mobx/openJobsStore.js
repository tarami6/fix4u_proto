import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class OpenJobsStore {
    //local image for displaying before saving the image on the aws
    @observable openJobsList = [];

    @action setOpenJobsList(arr: Array){
        this.openJobsList = arr;
    }

    @action addJob(job: Object){
        this.openJobsList.push(job)
    }

    @observable focusedJob = {};

    @action focusJob(job: Object){
        this.focusedJob = job
    }
}