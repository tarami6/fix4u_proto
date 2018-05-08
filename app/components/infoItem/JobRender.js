import React from 'react';
import {Image, Text, View} from 'react-native';

import StarRating from 'react-native-star-rating'
import {SW, GOLD} from "../../config/styles";
import {hebrewServices, jobStepsInHeb} from "../../generalFunc/generalObjects";
import {getAvgRating} from "../../generalFunc/generalFunctions";



export default class JobRender extends React.Component {





    render(){
        let job = this.props.job;

        return (
             <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
        }}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <View>
                    <Text style={{color: '#000'}}> היום {job.appointment_time? job.appointment_time.slice(0, 5) : null}</Text>

                    <View>
                        <Text>{job.service_fee} ש"ח </Text>
                    </View>
                </View>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{job.user_pro.name}</Text>


                <Text>{hebrewServices[job.service]} {jobStepsInHeb[job.status]} </Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: 60, height: 60, borderRadius: 100,}}
                    source={{uri: job.user_pro.profile_pic_thumb}}/>
            </View>
        </View>
        )
    }
}