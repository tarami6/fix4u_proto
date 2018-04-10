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

const { width, height } = Dimensions.get('window')
const services = [
  {
    name : 'cleaner',
    qty : 0,
    uri : require('../../../../../../assets/services/serviceIcons/CleanerIconOrange.png')
  },
  {
    name : 'electrician',
    qty : 1,
    uri : require('../../../../../../assets/services/serviceIcons/ElectricianIcon.png')
  },
  {
    name : 'brush',
    qty : 17,
    uri : require('../../../../../../assets/services/brush.png')
  },
  {
    name : 'broom',
    qty : 34,
    uri : require('../../../../../../assets/services/broom.png')
  },
  {
    name : 'lamp',
    qty : 273,
    uri : require('../../../../../../assets/services/lamp.png')
  },
  {
    name : 'brush',
    qty : 17,
    uri : require('../../../../../../assets/services/brush.png')
  },
  {
    name : 'broom',
    qty : 34,
    uri : require('../../../../../../assets/services/broom.png')
  },
  {
    name : 'lamp',
    qty : 273,
    uri : require('../../../../../../assets/services/lamp.png')
  },
]

const CardList = () => {
  return (
    <View style={{marginTop: -105}}>
      <Text style={styles.title}>
        איזה שירות תרצה לבחור היום?
      </Text>
      <View style={styles.containerServices}>
        {services.map((service, i) => {
          return (
            <View style={styles.rowWrapper} key={i}>
              <Card style={{borderRadius:8}}>
                <CardItem style={styles.cardContainer}>
                  <CardRow service={service}/>
                </CardItem>
              </Card>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{alignSelf:'center',
    color:'#fff',
    marginBottom:20
  },
  containerServices : {
    width,
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
