import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HH, START, END} from "../../../../config/styles";

const { width, height } = Dimensions.get('window')

const LinearBelowHeaderConsumer = (props) => {
  return (

    <LinearGradient start={{x: 1, y: 0}}
                            locations={[0, 1]}
                            end={{x: 0, y: 1}} colors={['#FFBA00', '#FF8D00']}
                            style={{flex: 1, alignItems: 'center'}}>
      {props.children}
    </LinearGradient>
  )
}

export default LinearBelowHeaderConsumer;

