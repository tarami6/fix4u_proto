import React from 'react';
import LinearViewHeader from './LinearViewHeader';
import { SW } from "../../../../config/styles";
import {View, Image, TouchableOpacity, } from 'react-native';
import ArrowIcon from 'react-native-vector-icons/Ionicons';
const CustomHeaderAddJob = (props) => {
    console.warn(props);
    return (
        <LinearViewHeader>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row'/* only for IOS to give StatusBar Space */,
                    width: SW,
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity style={{justifyContent: 'flex-start', flex: 1}} onPress={()=>{
                    props.navigation.navigate('ChooseService');
                   }}>
                    <ArrowIcon name="ios-arrow-back" size={35} color="#fff" style={{paddingLeft: SW / 20}}/>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={{paddingRight: SW / 10}}
                        source={require('../assets/icons/fixU.png')}
                    />
                </View>
                <View style={{flex: 1}}></View>
            </View>
        </LinearViewHeader>
    )
}

export  default CustomHeaderAddJob;