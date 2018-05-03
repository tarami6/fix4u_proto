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

    @action removeJob(jobId: string){
        for(let i=0; i<this.openJobsList.length; i++){
            if(this.openJobsList[i].id === jobId){
                this.openJobsList.splice(0,1);
            }
        }
    }

    @observable focusedJob = {};

    @action focusJob(job: Object){
        this.focusedJob = job
    }
}