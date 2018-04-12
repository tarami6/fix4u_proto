/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window')

const LinierView = (props) => {
  return (
    <LinearGradient
      colors={['#fd8824', '#fdb82c']}
      start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
      style={styles.container}>
      {props.children}
    </LinearGradient>
  )
}

export default LinierView;

const styles = StyleSheet.create({
  container: {
    height:Platform.OS == 'ios' ? 200 : 185,
    width
  }
});