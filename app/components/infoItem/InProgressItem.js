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
        // this.setState({jobStartTime: new Date(this.props.job.job_start_time)});
        let startTime = new Date(this.props.job.job_start_time);
        this.props.timerStore.startTimer(startTime);

        // this.interval = setInterval(() => {
        //     let basicDate = this.state.jobStartTime;
        //     let currentDate = new Date();
        //     let x = currentDate-basicDate;
        //     let timer = msToHMS(x)
        //     this.setState({timer: timer})
        // }, 1000);
    }

    componentWillUnmount(){
        // clearInterval(this.interval);
        this.props.timerStore.stopTimer();
    }

    render(){
        let job = this.props.job;
        let pic = job.user_pro.profile_pic_thumb || job.user.profile_pic_thumb
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#ffffff',

            }}>

                <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{height: 65, width: 65, borderWidth: 3, borderRadius: 1000, alignItems: 'center', justifyContent: 'center', borderColor: '#fdb82c'}}>
                        <Text style={{fontSize: 10}}>{this.props.timerStore.timer}</Text>
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