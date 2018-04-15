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


import authStore from "../../../state-manager/mobx/authStore";

const { width, height } = Dimensions.get('window')
const sliderWidth = width
const itemWidth = width

//static image for development
const images = [
    {uri:require('../../../../assets/intro/splash1.png')},
    {uri:require('../../../../assets/intro/splash2.png')},
    {uri:require('../../../../assets/intro/splash3.png')}
]


@inject("authStore")
@observer
export default class Intro1 extends Component {

    state = {
        activeSlide : 0
    }

    // componentDidMount(){
    //     this._carousel.snapToItem(2, false)
    // }

    _renderItem ({item, index}) {
        return (
            <View style={styles.containerItem}>
                <Image style={{width, height: height - 150}} resizeMode="cover"
                       source={item.uri}/>
            </View>
        );
    }

    get pagination () {
        const { activeSlide } = this.state;
        const entries = images
        return (
            <Pagination
                firstItem={2}
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: '#fd9126', height:150 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    onSnapToItem = (index) => {
        const { navigate } = this.props.navigation
        this.setState({ activeSlide: index })
        if (index == 2) {
            //navigate to other screen
            setTimeout(()=>{
                // this.skipIntro();
                navigate('ChooseUserType')
            }, 3000);

        }
    }

    skipIntro(){
        const { navigate } = this.props.navigation;
        navigate('ChooseUserType')
        // this.props.authStore.skipIntro();
    }

    render() {
        return (
            <View>
                {/*how can we set so the carousel will start from index 2 to 0? in hebrew all writing is from right to left unlike english*/}
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    autoplay={true}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    autoplayDelay={1500}
                    data={images}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={this.onSnapToItem}
                />
                { this.pagination }
                <TouchableOpacity style={styles.footer} onPress={this.skipIntro.bind(this)}>
                    <Text style={styles.textFooter}>דלג</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerItem: {
        width,
        height: height - 150,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
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
