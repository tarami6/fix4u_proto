import {AsyncStorage} from 'react-native'
import {action, observable} from 'mobx'
import {msToHMS} from "../../generalFunc/generalFunctions";


export default class TimerStore {
    //This object is the response from the database stragiht after authentication

    @observable timer = false;

    @observable allowTimer = false;

    @observable startTime;

    @action startTimer(startTime){
        this.startTime = startTime;
        this.allowTimer = true
        let timerInterval = setInterval(()=>{
            if(!this.allowTimer){
                clearInterval(timerInterval)
            }
            else {
                let currentDate = new Date();
                let diff = currentDate-this.startTime;
                let timer = msToHMS(diff);
                this.timer = timer;
            }
        },1000)
    }

    @action stopTimer(){
        this.allowTimer = false;
    }
}