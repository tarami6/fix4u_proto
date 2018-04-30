import React from 'react';
import {View, Text, Image} from 'react-native';
import OrangeCircle from './OrangeCircle'

const InfoItem = (props) => {
    let info = props.info;
    let imageSize = props.info.price || props.info.time ? 50 : 60;

    return(
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff'}}>
                <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                    {info.jobStatus || info.price ?
                        <View>
                            {info.jobStatus === "progress" ?
                                <OrangeCircle style={{height: 50, width: 50}}>
                                    <Text style={{color: '#000'}}>{info.time}</Text>
                                </OrangeCircle> :
                                <View>
                                    <Text>{info.time}</Text>
                                    {info.price ? <Text>{info.price} ש"ח </Text> : <View/>}
                                </View>
                            }</View>
                        : <View/>}


                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{color: '#000'}}>{info.name}</Text>
                    <Text>{info.service}</Text>
                </View>
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        style={{width: imageSize, height: imageSize, borderRadius: 100,}}
                        source={info.profilePic}/>
                </View>
            </View>
    )
}

export default InfoItem;