/* @flow */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {observer, inject} from 'mobx-react/native'
import authStore from "../../state-manager/mobx/authStore";

const { width, height } = Dimensions.get('window')
const sliderWidth = width
const itemWidth = width
//static image for development
const images = [
    {uri:require('../../../assets/chooseUserType/choose_mode.png')}
]


@inject("authStore")
@observer
export default class ChooseUserType extends Component {

    state = {
        activeSlide : 0
    }

    componentDidMount(){

    }

    render() {
        return (
            <View style={styles.containerItem}>
                <TouchableOpacity onPress={()=>this.props.authStore.chooseUserType('consumer')}>
                <Image style={{width, height: height - 150}} resizeMode="cover"
                       source={images[0].uri}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerItem: {
        width,
        height: height,
        // borderWidth:1,
        // justifyContent:'center',
        // alignItems:'center'
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textFooter : {
        color :'#fff'
    }
});
