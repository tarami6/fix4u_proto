import React from 'react';
import {View, Text, Image} from 'react-native';
import OrangeCircle from './OrangeCircle';

import StarRating from 'react-native-star-rating'

const InfoItem = (props) => {
    let info = props.info;
    let imageSize = props.info.price || props.info.time ? 50 : 60;
    // console.log('Userprofe', info.user_pro.price_rating_avg)
    if(info.user_pro){
                    return <JobList {...info} />;
    }
    else if(info.time){
        return <ApplyScreen {...info} />;
    }
    else {
        return <ProItemNoRating {...info} />;
    }
}

export default InfoItem;

const ApplyScreen = (info) => {
    let imageSize = info.price || info.time ? 50 : 60;
    return (
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                {/*{info.jobStatus || info.price ?*/}
                {/*/!*<View>*!/*/}
                {/*/!*{console.warn('info3', props.info)}*!/*/}
                {/*/!*{info.jobStatus === "progress" ?*!/*/}
                {/*/!*<OrangeCircle style={{height: 50, width: 50}}>*!/*/}
                {/*/!*<Text style={{color: '#000'}}>{info.time}</Text>*!/*/}
                {/*/!*</OrangeCircle> :*!/*/}
                {/*/!*<View>*!/*/}
                {/*/!*<Text>{info.time}</Text>*!/*/}
                {/*/!*{info.price ? <Text>{info.price} ש"ח </Text> : <View/>}*!/*/}
                {/*/!*</View>*!/*/}
                {/*/!*}</View>*!/*/}
                {/*: <View/>}*/}
                {
                    info.user_pro && <View>
                        <Text style={{color: '#000'}}> היום {info.time.slice(0, 5)}</Text>
                        <View>
                            <Text>{info.service_fee} ש"ח </Text>
                        </View>
                    </View>
                }


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{info.name || info.user_pro.name}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={info.user_pro.price_rating_avg ? info.user_pro.price_rating_avg : 0}
                />
                <Text>{info.service && info.service}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                    source={{uri: info.user_pro.profile_pic_thumb}}/>
            </View>
        </View>
    )
}
const JobList = (info) => {
    console.log('jobLIST', info)
    console.log('jobLIST1', info.user_pro)
    let imageSize = info.price || info.time ? 50 : 60;
    return (
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <View>
                    <Text style={{color: '#000'}}> היום {info.appointment_time_start.slice(0, 5)}</Text>
                    <View>
                        <Text>{info.service_fee} ש"ח </Text>
                    </View>
                </View>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{info.user_pro.name}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={info.user_pro.price_rating_avg ? info.user_pro.price_rating_avg : 0}
                />
                <Text>{info.service && info.service}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                    source={{uri: info.user_pro.profile_pic_thumb}}/>
            </View>
        </View>
    )
}
const ProItemNoRating = (info) => {
    let imageSize = info.price || info.time ? 50 : 60;
    return (
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <View>
                    {/*<Text style={{color: '#000'}}> היום {info.appointment_time_start.slice(0, 5)}</Text>*/}
                    <View>
                        {/*<Text>{info.service_fee} ש"ח </Text>*/}
                    </View>
                </View>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{info.name}</Text>
                <Text>{info.service && info.service}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                    source={{uri: info.profile_pic_thumb}}/>
            </View>
        </View>
    )
}