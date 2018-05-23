import React from 'react';
import {Image, Text, View} from 'react-native';


import {hebrewServices, ServicesArrToHebString} from "../../generalFunc/generalObjects";


import {inject, observer} from "mobx-react/native";
import {msToHMS} from "../../generalFunc/generalFunctions";

@inject("timerStore")
@observer
export default class InProgressItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            timer: '...'
        }
    }

    componentDidMount() {

        // let currentTime = dateObjToTimeString()

        this.startTimer();
    }

    startTimer() {
        let jobId = this.props.job.id;
        if(!this.props.timerStore.timers[jobId]){
            let startDate = new Date(this.props.job.job_start_time);
            this.props.timerStore.startTimer(startDate, jobId);
        }
    }

    componentWillUnmount(){
        // clearInterval(this.interval);
        this.props.timerStore.stopTimer(this.props.job.id);
    }

    render(){
        let job = this.props.job;
        let pic = job.user_pro.profile_pic_thumb || job.user.profile_pic_thumb;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#ffffff',

            }}>

                <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{height: 65, width: 65, borderWidth: 3, borderRadius: 1000, alignItems: 'center', justifyContent: 'center', borderColor: '#fdb82c'}}>
    {job.status === 'consumer_payment' ?
        <Text style={{fontSize: 10}}>בתשלום</Text>
        :
        <Text
            style={{fontSize: 10}}>{this.props.timerStore.timers.get(job.id) ? this.props.timerStore.timers.get(job.id) : '...'}</Text>
    }
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: '#000', textAlign: 'right'}}>{job.user_pro && job.user_pro.name}</Text>
                    <Text style={{ textAlign: 'right'}}>{job.address}</Text>

                </View>
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    { job.user &&
                    <Image
                        style={{width: 60, height: 60, borderRadius: 100,}}
                        source={{uri: pic}}/>
                    }
                </View>
            </View>
        )
    }
}