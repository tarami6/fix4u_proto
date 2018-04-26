import React from 'react'
import {View,Text, StyleSheet, Platform} from 'react-native';

const Counter = () => {
    const isIOS = Platform.OS == 'ios' ? {} : {top: 5}
    const orderCounter = 10
    if (orderCounter == 0) {
        return (<View style={{position: 'absolute'}}/>)
    }
    return (
        <View style={[styles.counter, isIOS]}>
            <View style={styles.textWraper}>
                <Text style={{fontSize: 11, color: '#fd8724'}}>{orderCounter}</Text>
            </View>
        </View>
    )
}
export default Counter;

const styles = StyleSheet.create({


    counter: {
        position: 'absolute',
        right: 10,
        top: 30
    },
    textWraper: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fd8724'
    }
});