import React from 'react'
import {View, Text, StyleSheet,} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

const OrangeCircle = (props) => {
    let propStyle = props.style ? props.style : {};
    let sizeHeight = props.size ? propStyle.height - 10 : propStyle.height -5;
    let sizeWidth = props.size ? propStyle.width - 10 : propStyle.width -5;
    return (
        <LinearGradient
            colors={['#fdb82c', '#fdb82c']}
            start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
            style={[styles.container, propStyle]}>
            <View style={{
                height:sizeHeight,
                width: sizeWidth,
                backgroundColor: '#fff',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {props.children}
            </View>
        </LinearGradient>
    )
}


export default OrangeCircle;

const styles = StyleSheet.create({
    container: {
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
});