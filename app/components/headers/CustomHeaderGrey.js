import React from 'react';
import {SH, SW, HH, Pad} from "../../config/styles";
import {View, Alert, TouchableOpacity,} from 'react-native';
import ArrowIcon from 'react-native-vector-icons/Ionicons';
import Cicons from '../../components/customIcons/CustomIcons'

const CustomHeaderGrey = (props) => {
    return (
        <View style={{backgroundColor: '#fff', height: HH,justifyContent: 'center',}}>
            <View
                style={{
                    flexDirection: 'row'/* only for IOS to give StatusBar Space */,
                    width: SW,
                }}
            >
                <TouchableOpacity
                    onPress={() => props.props.navigation.goBack()}
                    style={{flex: 1,}}>
                    <View style={{paddingLeft: Pad }}>
                        <Cicons name={"back"} size={25} color={"#ff8500"}/>
                    </View>

                </TouchableOpacity>
                <View style={{flex: 1, }}>
                </View>
                <View style={{flex: 1}}></View>
            </View>
        </View>

    )
}

export default CustomHeaderGrey;