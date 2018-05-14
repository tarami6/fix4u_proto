import React from 'react';
import {Image, Text, View} from 'react-native';


import {hebrewServices, ServicesArrToHebString} from "../../generalFunc/generalObjects";


import {inject, observer} from "mobx-react/native";
import {msToHMS} from "../../generalFunc/generalFunctions";


export default class InProgressItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            timer: 'טוען סטופר...'
        }
    }

    componentDidMount() {

        // let currentTime = dateObjToTimeString()
        this.startTimer();
    }

    startTimer() {
        this.interval = setInterval(() => {
            let basicDate = new Date(this.props.job.job_start_time);
            let currentDate = new Date();
            let x = currentDate-basicDate;
            let timer = msToHMS(x)
            this.setState({timer: timer})
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        let job = this.props.job;



        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#ffffff',

            }}>

                <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{height: 60, width: 60, borderWidth: 3, borderRadius: 1000, alignItems: 'center', justifyContent: 'center', borderColor: '#fdb82c'}}>
                        <Text>{this.state.timer}</Text>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: '#000', textAlign: 'right'}}>{job.user && job.user.name}</Text>
                    <Text style={{ textAlign: 'right'}}>{job.address}</Text>

                </View>
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    { job.user &&
                    <Image
                        style={{width: 60, height: 60, borderRadius: 100,}}
                        source={{uri: job.user.profile_pic_thumb}}/>
                    }
                </View>
            </View>
        )
    }
}