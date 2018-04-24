/* @flow weak */

import React from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Icon} from 'native-base'
import {withNavigation} from 'react-navigation';

const CustomHeader = (props) => {
    return (
        <View style={styles.customHeader}>
            <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')}>
                <Icon name='ios-menu' style={styles.leftIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>fix4U</Text>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Schedule')}
                style={styles.rightButton}>
                <Icon name='ios-person-outline' style={styles.rightIcon}/>
            </TouchableOpacity>
            <Counter/>
        </View>
    )
}

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

export default withNavigation(CustomHeader);

const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Platform.OS == 'ios' ? 30 : 10,
        elevation: 5,
        zIndex:2,
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '300',
    },
    leftIcon: {
        color: '#fff',
        paddingLeft: 20,
        fontSize: 35
    },
    rightIcon: {
        color: '#fff',
        fontSize: 35,
    },
    rightButton: {
        paddingRight: 20,
        // paddingLeft: 20,
    },
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

[{
    id: '1',

}]
