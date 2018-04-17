import React from 'react';
import LinearViewHeader from './LinearViewHeader';
import {SH, SW, HH} from "../../../config/styles";
import {View, Image, TouchableOpacity,} from 'react-native';
import ArrowIcon from 'react-native-vector-icons/Ionicons';

const CustomHeaderGrey = (props) => {
    return (
        <View style={{backgroundColor: '#fff', height: HH}}>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row'/* only for IOS to give StatusBar Space */,
                    width: SW,
                    justifyContent: 'space-between',
                    backgroundColor: '#fff'
                }}
            >
                <TouchableOpacity style={{justifyContent: 'flex-start', flex: 1}}>
                    <ArrowIcon name="ios-arrow-back" size={35} color="#ff8500" style={{paddingLeft: SW / 20}}/>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                </View>
                <View style={{flex: 1}}></View>
            </View>
        </View>

    )
}

export default CustomHeaderGrey;