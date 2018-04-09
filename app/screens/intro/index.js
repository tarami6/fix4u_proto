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
  {uri:require('../../../assets/intro/splash1.png')},
  {uri:require('../../../assets/intro/splash2.png')},
  {uri:require('../../../assets/intro/splash3.png')}
]


@inject("authStore")
@observer
export default class Intro extends Component {

  state = {
    activeSlide : 0
  }

  componentDidMount(){

  }

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
    this.setState({ activeSlide: index })
    if (index == 2) {
      //navigate to other screen
      // alert('navigate to other screen')
    }
  }

  render() {
    return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          autoplay={true}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          autoplayDelay={1000}
          data={images}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
        />
        { this.pagination }
        <TouchableOpacity style={styles.footer} onPress={()=>this.props.authStore.skipIntro()}>
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
