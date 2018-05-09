import React from 'react';
import LinearViewHeader from '../LinearViewHeader';
import {HH, SW, SH} from "../../config/styles";
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import ArrowIcon from 'react-native-vector-icons/Ionicons';


const ArrowHeaderOrangeBackground = (props) => {

    return (
        <View
            style={{
                flexDirection: 'row'/* only for IOS to give StatusBar Space */,
                width: SW,
                justifyContent: 'space-between',
                height: HH,
            }}
        >
            <TouchableOpacity onPress={() => props.props.navigation.goBack()}
                              style={{justifyContent: 'center', flex: 1}}>
                <ArrowIcon name="ios-arrow-back" size={35} color="#fff" style={{paddingLeft: SW / 20}}/>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image
                style={{width: SW / 5.5, height: SH / 33, marginLeft: 10}}
                source={require('../../../assets/icons/fix4U.png')}/>
            </View>

            <View style={{flex: 1}}></View>
        </View>
    )
}

export default ArrowHeaderOrangeBackground;