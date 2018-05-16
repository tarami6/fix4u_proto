/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {mainRed} from "../config/styles";

const Circle = ({qty}) => {
  let hasNotiBorder = {
    backgroundColor: '#fff'
  }
  let hasNotiBackg = {
    backgroundColor: mainRed
  }
  let colorW = {
    color: '#fff'
  }

  return (
     <View style={[styles.container, qty > 0 ? hasNotiBorder : null]}>
        <View style={[styles.childContainer, qty > 0 ? hasNotiBackg : null]}>
          <Text style={[styles.qty,qty > 0 ? colorW : null]}>{qty}</Text>
        </View>
     </View>
  )
}

export default Circle;

const styles = StyleSheet.create({
  container: {
    // position:'absolute',
    // top:0,
    // right: 0,
    width:36,
    height: 36,
    borderRadius : 36,
    backgroundColor:'#9b9b9b',
    justifyContent:'center',
    alignItems:'center'
  },
  childContainer : {
    width:32,
    height: 32,
    borderRadius : 20,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  qty : {
    color:'#9b9b9b',
    fontSize:14
  }
});
