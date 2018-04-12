/* @flow
*
* inside cardRow we activate the whatever
*
* */

import React, { Component } from 'react';
import {
  View,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Icon } from 'native-base';


import LinierView from '../../../../components/linierView'
import { CardList, CustomHeader } from './components/index'

const { width, height } = Dimensions.get('window')

export default class ChooseService extends Component {

  static navigationOptions = {
    header:null
  }

  x = () => {}

  nextStep(){
      this.props.navigation.navigate('ChooseAddress');
  }
  render() {
    return (
      <Container>
        <Content>
        <LinierView>
          <CustomHeader />
        </LinierView>
        <CardList nextStep={this.nextStep.bind(this)}/>
        </Content>
      </Container>
    );
  }
}