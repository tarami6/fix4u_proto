import React from 'react';
import LinearViewHeader from '../LinearViewHeader';
import { SW } from "../../config/styles";
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import ArrowIcon from 'react-native-vector-icons/Ionicons';


const CustomHeaderAddJobSteps = (props) => {

    return (

            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row'/* only for IOS to give StatusBar Space */,
                    width: SW,
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity onPress={()=> Alert.alert('Go back')} style={{justifyContent: 'flex-start', flex: 1}}>
                    <ArrowIcon name="ios-arrow-back" size={35} color="#fff" style={{paddingLeft: SW / 20}}/>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={{paddingRight: SW / 10}}
                        source={require('../../screens/addJob/addJobRamiScreens/assets/icons/fixU.png')}
                    />
                </View>
                <View style={{flex: 1}}></View>
            </View>
    )
}

export  default CustomHeaderAddJobSteps;