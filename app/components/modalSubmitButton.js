import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {LinierBackground} from "../config/styles";
import {HH, SW, mainStyles, mainRed} from "../config/styles";
import Text  from "../components/text/Text"  ;
export const submitButton = (title, color='red', onPress  ) => {
        switch (color) {
            case 'consumer':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                        <LinierBackground>
                            <Text type={'button'}>{title}</Text>
                        </LinierBackground>
                    </TouchableOpacity>
                )
                break;

            case 'pro':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                        <View style={styles.button}>
                            <Text type={'button'}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                )
                break;

            case 'orangeBorder':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                <LinierBackground>
                    <View style={{
                        width: SW - 124,
                        height: HH - 4 ,
                        borderRadius: 30,
                        margin: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: 40,
                        paddingLeft: 40
                    }}>
                        <Text style={[mainStyles.buttonText,{color: '#fd8724'}]}>{title}</Text>
                    </View>
                </LinierBackground>
            </TouchableOpacity>
                )
                break;

            case 'red':
                return (
                    <TouchableOpacity onPress={() => onPress()}>
                        <View style={[styles.button, {backgroundColor: mainRed}]}>
                            <Text type={'button'}>{title}</Text>
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