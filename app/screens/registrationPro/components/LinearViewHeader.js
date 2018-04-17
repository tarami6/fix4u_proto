import React from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HH, START, END} from "../../../config/styles";

const { width, height } = Dimensions.get('window')

const LinearView = (props) => {
  return (
    <LinearGradient start={{x: 1, y: 0}}
                            locations={[0, 1]}
                            end={{x: 0, y: 1}} colors={[START, START]}
                            style={{height: HH, alignItems: 'center'}}>
      {props.children}
    </LinearGradient>
  )
}

export default LinearView;

const styles = StyleSheet.create({
  container: {
    height:Platform.OS == 'ios' ? 200 : 185,
    width
  }
});