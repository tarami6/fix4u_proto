/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Circle = ({qty}) => {
  return (
     <View style={styles.container}>
        <View style={styles.childContainer}>
          <Text style={styles.qty}>{qty}</Text>
        </View>
     </View>
  )
}

export default Circle;

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    right: 0,
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
