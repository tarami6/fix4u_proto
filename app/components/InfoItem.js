import React from 'react';
import {Image, Text, View} from 'react-native';


// all render options for this component:
import InProgressItem from './infoItem/InProgressItem';
import JobRender from './infoItem/JobRender';
import UserProRender from './infoItem/UserProRender';
import ActiveJobRender from './infoItem/ActiveJobRender';

import ApplyRender from './infoItem/ApplyRender'
import ConsumerRender from './infoItem/ConsumerRender'
import ProListWithDistance from './infoItem/ProListWithDistance'

export default class InfoItem extends React.Component {

    render() {
        let data = this.props.info;
        console.log("Dsd", this.props)
        if (this.props.type === 'activeJob') {
            return (
                <ActiveJobRender job={this.props.info}/>
            )
        }
        else if(this.props.info.status ==="in_progress"){
            return(
            <InProgressItem  job={this.props.info} />
            )
        }

        else if (this.props.type === 'consumer') {
            return (
                <ConsumerRender user={this.props.info}/>
            )
        }
        if (this.props.type === 'proList') {
            return (
                <ProListWithDistance user={this.props.info}/>
            )
        }
        // data is a USER_PRO object
        else if (data.services) {
            return (
                <UserProRender pro={this.props.info}/>
            )
        }
        // data is a JOB/POST object
        else if (data.status) {
            return <JobRender job={this.props.info}/>
        }
        //data is an APPLY object
        else if (data.user_pro) {
            return (
                <ApplyRender apply={this.props.info}/>
            )
        }

        //data is a CONSUMER object
        else {
            return (
                <View/>
            )
        }

    }
}


// const ApplyScreen = (info) => {
//     let imageSize = info.price || info.time ? 50 : 60;
//     console.log('ApplyScreen', info)
//     return (
//         <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>
//
//             <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
//
//                 {
//                     info.user_pro && <View>
//                         <Text style={{color: '#000'}}> היום {info.time.slice(0, 5)}</Text>
//                         <View>
//                             <Text>{info.service_fee} ש"ח </Text>
//                         </View>
//                     </View>
//                 }
//
//             </View>
//             <View style={{flex: 0.8, justifyContent: 'center'}}>
//                 <Text style={{color: '#000', textAlign: 'right'}}>{info.name || info.user_pro.name}</Text>
//                 <StarRating
//                     disabled={true}
//                     maxStars={5}
//                     starSize={10}
//                     fullStarColor={GOLD}
//                     rating={info.user_pro.price_rating_avg ? info.user_pro.price_rating_avg : 0}
//                 />
//                 <Text>{hebrewServices[info.service]}</Text>
//             </View>
//             <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
//                 <Image
//                     style={{width: imageSize, height: imageSize, borderRadius: 100,}}
//                     source={{uri: info.user_pro.profile_pic_thumb}}/>
//             </View>
//         </View>
//     )
// }
//     const
//     JobList = (info) => {
//         console.log('jobLIST', info)
//
//         // rating 3 nums
//
//
//         let rating1 = info.user_pro ? getAvgRating(
//             info.user_pro.price_rating_avg,
//             info.user_pro.time_rating_avg,
//             info.user_pro.performance_rating_avg,
//         ) : 0;
//
//         let rating2 = info.user_pro.price_rating_avg ? getAvgRating(
//             info.user_pro.price_rating_avg,
//             info.user_pro.time_rating_avg,
//             info.user_pro.performance_rating_avg,
//         ) : rating1;
//
//         let imageSize = info.user_pro ? 50 : 60;
//         let time = info.appointment_time;
//         let name = info.user_pro.name || info.user.name
//         let image = info.user_pro.profile_pic_thumb || info.user.profile_pic_thumb;
//         return (
//             <View style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 backgroundColor: '#ffffff',
//                 zIndex: 2,
//                 borderBottomWidth: 0.5,
//                 borderColor: 'grey',
//                 elevation: 20
//             }}>
//
//                 <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
//
//                     <View>
//                         <Text style={{color: '#000'}}> היום {time ? time.slice(0, 5) : null}</Text>
//
//                         <View>
//                             <Text>{info.service_fee} ש"ח </Text>
//                         </View>
//                     </View>
//
//
//                 </View>
//                 <View style={{flex: 1, justifyContent: 'center'}}>
//                     <Text style={{color: '#000', textAlign: 'right'}}>{name}</Text>
//                     {info.user ? null :
//                         <View style={{width: SW / 5, alignSelf: 'flex-end'}}>
//                             <StarRating
//                                 disabled={true}
//                                 maxStars={5}
//                                 starSize={10}
//                                 fullStarColor={GOLD}
//                                 rating={rating2}
//                             />
//                         </View>
//                     }
//
//                     <Text>{hebrewServices[info.service]} {info.status === 'on_the_way' ? 'בדרך ' : null} </Text>
//                 </View>
//                 <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
//                     <Image
//                         style={{width: imageSize, height: imageSize, borderRadius: 100,}}
//                         source={{uri: image}}/>
//                 </View>
//             </View>
//         )
//     }
// const ProItemNoRating = (info) => {
//     let imageSize = info.price || info.time ? 50 : 60;
//     console.log("ProItemNoRating", info)
//     let image = info.profile_pic_thumb ? info.profile_pic_thumb : info.image_thumb;
//     let radius = info.profile_pic_thumb ? 100 : 0;
//     return (
//         <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>
//
//             <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
//
//                 <View>
//                     {/*<Text style={{color: '#000'}}> היום {info.appointment_time_start.slice(0, 5)}</Text>*/}
//                     <View>
//                         <Text> היום {info.appointment_time.slice(0, 5)} </Text>
//                         <Text> {info.service_fee} ש"ח </Text>
//                     </View>
//                 </View>
//
//
//             </View>
//             <View style={{flex: 1, justifyContent: 'center'}}>
//                 <Text style={{color: '#000', textAlign: 'right'}}>{info.name}</Text>
//                 <Text>{info.status === 'open' ? 'מחפש ...' : ''}</Text>
//                 <Text>{hebrewServices[info.service]}</Text>
//             </View>
//             <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
//                 <Image
//                     style={{width: imageSize, height: imageSize, borderRadius: radius,}}
//                     source={{uri: image}}/>
//             </View>
//         </View>
//     )
// }