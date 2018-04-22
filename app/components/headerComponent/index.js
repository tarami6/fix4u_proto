import React from 'react';
import {
    View,
    Text,
    Platform,
    Dimensions,
    StyleSheet,
} from 'react-native';
import CustomHeader from './CustomHeader'
import LinearGradient from 'react-native-linear-gradient';
import { HH } from "../../config/styles";

const { width, height } = Dimensions.get('window')

const Header = (props) => {
    return (
        <LinearGradient
            colors={['#fd8824', '#fdb82c']}
            start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
            style={styles.container}>
            <CustomHeader/>
        </LinearGradient>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        height:Platform.OS == 'ios' ? HH+15 : HH,
        width
    }
});