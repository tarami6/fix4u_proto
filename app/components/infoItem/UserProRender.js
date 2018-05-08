import React from 'react';
import {Image, Text, View} from 'react-native';

import StarRating from 'react-native-star-rating'
import {SW, GOLD} from "../../config/styles";
import {hebrewServices, ServicesArrToHebString} from "../../generalFunc/generalObjects";
import {getAvgRating} from "../../generalFunc/generalFunctions";

import {inject, observer} from "mobx-react/native";

@inject('userDataStore')
@observer
export default class UserProRender extends React.Component {

    render(){
        let pro = this.props.pro;
        console.log('pro object:', pro);
        console.log('pro object3232:', pro.services[0]);
        let rating = getAvgRating(
        pro.price_rating_avg,
        pro.time_rating_avg,
        pro.performance_rating_avg,
    );
        return (
             <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#ffffff',

        }}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <View>
                    <Text style={{color: '#000'}}>  {}</Text>

                    <View>
                        {/*<Text>{job.service_fee} ש"ח </Text>*/}
                    </View>
                </View>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{pro.name}</Text>
                    {/*<View style={{width: SW / 5, alignSelf: 'flex-end'}}>*/}
                        {/*<StarRating*/}
                            {/*disabled={true}*/}
                            {/*maxStars={5}*/}
                            {/*starSize={10}*/}
                            {/*fullStarColor={GOLD}*/}
                            {/*rating={rating}*/}
                        {/*/>*/}
                    {/*</View>*/}

                <Text>{ServicesArrToHebString(pro.services)}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: 60, height: 60, borderRadius: 100,}}
                    source={{uri: pro.profile_pic_thumb}}/>
            </View>
        </View>
        )
    }
}