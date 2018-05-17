import {observable, action, extendObservable, observe} from 'mobx'
import {AsyncStorage} from 'react-native'

export default class OpenJobsStore {
    //local image for displaying before saving the image on the aws
    @observable openJobsList = [];

    @action appliedToPost(postId){
        for(let i=0; i<this.openJobsList.length; i++){
            if(this.openJobsList[i].id === postId){
                this.openJobsList[i].did_i_apply = true;

            }
        }
    }

    @action setOpenJobsList(arr: Array){
        this.openJobsList = arr;
    }

    @action addJob(job: Object){
        this.openJobsList.push(job)
    }

    @action removeJob(jobId: string){
        this.openJobsList = this.openJobsList.filter(post => post.id !== jobId);
    }

    @observable focusedJob = {};

    @action focusJob(job: Object){
        this.focusedJob = job
    }
}