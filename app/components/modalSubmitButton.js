import React, {Component} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {LinierBackground} from "../config/styles";
import {HH, SW, mainStyles} from "../config/styles";

export const submitButton = (title, color='red', onPress  ) => {
        switch (color) {
            case 'consumer':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                        <LinierBackground>
                            <Text style={mainStyles.buttonText}>{title}</Text>
                        </LinierBackground>
                    </TouchableOpacity>
                )
                break;

            case 'pro':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                        <View style={styles.button}>
                            <Text style={mainStyles.buttonText}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                )
                break;

            case 'red':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                        <View style={[styles.button, {backgroundColor: 'red'}]}>
                            <Text style={mainStyles.buttonText}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                )
                break;
        }
    }

const styles = StyleSheet.create({
    button:{
        width: SW / 1.55,
        height: HH /1.1,
        backgroundColor: '#FF8500',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});