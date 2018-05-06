import React from 'react';
import {Image, Text, View} from 'react-native';

import StarRating from 'react-native-star-rating'
import {SW, GOLD} from "../config/styles";
import {hebrewServices} from "../generalFunc/generalObjects";

const InfoItem = (props) => {
    let info = props.info;
    console.log('info', info)
    let imageSize = props.info.price || props.info.time ? 50 : 60;
    // console.log('Userprofe', info.user_pro.price_rating_avg)
    if (info.user_pro) {
        return <JobList {...info} />;
    }
    else if (info.time) {
        return <ApplyScreen {...info} />;
    }
    else {
        return <ProItemNoRating {...info} />;
    }
}

export default InfoItem;

const ApplyScreen = (info) => {
    let imageSize = info.price || info.time ? 50 : 60;
    console.log('ApplyScreen', info)
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
                    starSize={10}
                    fullStarColor={GOLD}
                    rating={info.user_pro.price_rating_avg ? info.user_pro.price_rating_avg : 0}
                />
                <Text>{hebrewServices[info.service]}</Text>
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
    let imageSize = info.price || info.time ? 50 : 60;
    let time = info.time || info.appointment_time || info.appointment_time_start;
    return (
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <View>
                    <Text style={{color: '#000'}}> היום {time.slice(0, 5)}</Text>

                    <View>
                        <Text>{info.service_fee} ש"ח </Text>
                    </View>
                </View>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{info.user_pro.name || info.user.name}</Text>
                {info.user.name ? null :
                    <View style={{width: SW / 5, alignSelf: 'flex-end'}}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={10}
                            fullStarColor={GOLD}
                            rating={info.user_pro.price_rating_avg ? info.user_pro.price_rating_avg : 0}
                        />
                    </View>
                }

                <Text>{hebrewServices[info.service]}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                {info.user.name ?

                    <Image
                        style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                        source={{uri: info.user.profile_pic_thumb}}/>

                    :
                    <Image
                        style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                        source={{uri: info.user_pro.profile_pic_thumb}}/>
                }

            </View>
        </View>
    )
}
const ProItemNoRating = (info) => {
    let imageSize = info.price || info.time ? 50 : 60;
    console.log("ProItemNoRating", info)
    return (
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>

            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                <View>
                    {/*<Text style={{color: '#000'}}> היום {info.appointment_time_start.slice(0, 5)}</Text>*/}
                    <View>
                        <Text>{info.status === 'open' ? 'מחפש בעל מקצוע' : ''}</Text>
                    </View>
                </View>


            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: '#000', textAlign: 'right'}}>{info.name}</Text>
                <Text>{hebrewServices[info.service]}</Text>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                    source={{uri: info.profile_pic_thumb}}/>
            </View>
        </View>
    )
}