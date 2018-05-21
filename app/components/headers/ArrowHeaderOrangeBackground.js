import React from 'react';
import {HH, SW, SH} from "../../config/styles";
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import Cicons from '../../components/customIcons/CustomIcons'

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
               <View style={{ margin: 20}}>
                    <Cicons name={"back"} size={25} color={"#fff"}/>
                </View>
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