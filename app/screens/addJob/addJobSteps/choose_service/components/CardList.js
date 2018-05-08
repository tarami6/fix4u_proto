/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Card, CardItem } from 'native-base'

import { CardRow } from './index'

import {SW, mainStyles} from "../../../../../config/styles";

const data = [
    {service: 'חשמלאי', state: 'Electrician'},
    {service: 'אינסטלטור', state: 'Plumber'},
    {service: 'מנקה', state: 'Cleaner'},
    {service: 'שיפוצניק', state: 'Handyman'},
    {service: 'מנעולן', state: 'Locksmith'},
    {service: 'טכנאי מכונות כביסה', state: 'TechnicianWashingMachines'},
    {service: 'תכנאי מזגנים', state: 'AirConditioningTechnician'},
]

const services = [
  {
    name : 'Locksmith',
    qty : 0,
    uri : require('../../../../../../assets/services/broom.png')
  },
  {
    name : 'TechnicianWashingMachines',
    qty : 1,
    uri : require('../../../../../../assets/services/lamp.png')
  },
  {
    name : 'Electrician',
    qty : 17,
    uri : require('../../../../../../assets/services/brush.png')
  },
  {
    name : 'Cleaner',
    qty : 34,
    uri : require('../../../../../../assets/services/broom.png')
  },
  {
    name : 'Handyman',
    qty : 273,
    uri : require('../../../../../../assets/services/lamp.png')
  },
  {
    name : 'Plumber',
    qty : 17,
    uri : require('../../../../../../assets/services/brush.png')
  },
  {
    name : 'AirConditioningTechnician',
    qty : 34,
    uri : require('../../../../../../assets/services/broom.png')
  },
]

class CardList extends React.Component {
  render() {
      return (
          <View style={{marginTop: -105}}>
              <Text style={[mainStyles.whiteTitle,{marginBottom:20}]}>
                  איזה שירות תרצה לבחור היום?
              </Text>
              <View style={styles.containerServices}>
                  {services.map((service, i) => {
                      return (
                          <View style={styles.rowWrapper} key={i}>
                              <Card style={{borderRadius: 8}}>
                                  <CardItem style={styles.cardContainer}>
                                      <CardRow service={service} nextStep={this.props.nextStep}/>
                                  </CardItem>
                              </Card>
                          </View>
                      )
                  })}
              </View>
          </View>
      )
  }
}

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerServices : {

    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  cardContainer : {
    paddingLeft:5,
    paddingTop:5,
    paddingBottom:5,
    paddingRight:5,
    borderRadius: 20
  },
  rowWrapper : {
    margin:5,
    justifyContent:'center'
  }
});
