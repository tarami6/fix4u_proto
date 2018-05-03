import React from 'react';
import LinearViewHeader from '../LinearViewHeader';
import { SW } from "../../config/styles";
import {View, Image, TouchableOpacity, Alert} from 'react-native';
import ArrowIcon from 'react-native-vector-icons/Ionicons';
import {NavigationActions} from "react-navigation";
import {inject, observer} from "mobx-react/native";


const CustomHeaderAddJobSteps = inject("navigationStore")(observer((props) => {


    const {dispatch} = props.navigationStore;
    // const {navigationState} = props.navigationStore;
    // const routeName = navigationState.routes[0].routeName
    return (

            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row'/* only for IOS to give StatusBar Space */,
                    width: SW,
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity onPress={()=> {
                    dispatch(NavigationActions.back());

                }}
                                  style={{justifyContent: 'flex-start', flex: 1}}>
                    <ArrowIcon name="ios-arrow-back" size={35} color="#fff" style={{paddingLeft: SW / 20}}/>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={{paddingRight: SW / 10}}
                        source={require('../../../assets/addJob/icons/fixU.png')}
                    />
                </View>
                <View style={{flex: 1}}></View>
            </View>
    )
}))

export  default CustomHeaderAddJobSteps;

