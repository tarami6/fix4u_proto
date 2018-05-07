import React from 'react';
import {Image, Text, View} from 'react-native';

import StarRating from 'react-native-star-rating'
import {SW, GOLD} from "../../config/styles";
import {hebrewServices, jobStepsInHeb} from "../../generalFunc/generalObjects";
import {getAvgRating} from "../../generalFunc/generalFunctions";



export default class ApplyRender extends React.Component {
    render(){
        let apply = this.props.apply;
        console.log("w3ew", apply)
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff' }}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                {
                    apply.user_pro && <View>
                        <Text style={{color: '#000'}}> היום {apply.time.slice(0, 5)}</Text>
                        <View>
                            <Text style={{textAlign: 'left'}}>{apply.service_fee} ש"ח </Text>
                        </View>
                    </View>
                }

            </View>
            <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{apply.name || apply.user_pro.name}</Text>
                <View style={{width: SW /4, }} >
                    <StarRating
                    disabled={true}
                    maxStars={5}
                    starSize={10}
                    fullStarColor={GOLD}
                    rating={apply.user_pro.price_rating_avg ? apply.user_pro.price_rating_avg : 0}
                />
                </View>

                <Text>{hebrewServices[apply.service]}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: 50, height: 50, borderRadius: 100,}}
                    source={{uri: apply.user_pro.profile_pic_thumb}}/>
            </View>
        </View>
        )
    }
}