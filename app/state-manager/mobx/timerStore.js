import {AsyncStorage} from 'react-native'
import {action, observable, extendObservable} from 'mobx'
import {msToHMS} from "../../generalFunc/generalFunctions";


export default class TimerStore {
    //This object is the response from the database stragiht after authentication

    @observable timer = false;

    timers = observable.map({});

    @observable intervals = {};

    @action startTimer(startTime, jobId){
        console.warn('start timer');

        // timer boolean false/String

        this.timers.set(jobId, 'loading now timer');
        let starterTime = startTime;
        this.intervals[jobId] = setInterval(()=>{
            if(!this.timers.get(jobId)){
                clearInterval(this.intervals[jobId])
            }
            else {
                let currentDate = new Date();
                let diff = currentDate-starterTime;
                let timer = msToHMS(diff);
                this.timers.set(jobId, timer);
            }
        },1000)
    }

    @action stopTimer(jobId){
        if (this.intervals[jobId]) {
            clearInterval(this.intervals[jobId])
            this.timers[jobId] = false;
        }
        // this.allowTimer = false;
    }
}