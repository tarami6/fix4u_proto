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


const services = [
  {
    name : 'Cleaner',
    qty : 0,
    uri : require('../../../../../../assets/services/serviceIcons/CleanerIconOrange.png')
  },
  {
    name : 'Doctor',
    qty : 1,
    uri : require('../../../../../../assets/services/serviceIcons/ElectricianIcon.png')
  },
  {
    name : 'Electrician',
    qty : 17,
    uri : require('../../../../../../assets/services/brush.png')
  },
  {
    name : 'GeneralService',
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
    name : 'Veterinarian',
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
