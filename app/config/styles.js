import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const colors = {
    background: '#F5F2F9',
    errorText: '#FA3256',
    headerText: '#b78801',
    buttonBackground: '#fed143',
    buttonText: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputDivider: '#E4E2E5',
};

//absolute Screen Size container style
export let absoluteContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SW,
    height: SH
}

// COLOR
export let mainColor = '#F5A623';
export let secondaryColor = '#FB6717';
export let mainRed = '#D0021B' ;
export let grey  =  '#CCCCCC' ;
export let darkGrey = '#7f7f7f';
export let START = '#FFBA00';
export let END = '#FF8D00';
// SCREEN ZISE
export let SW = Dimensions.get('window').width;
export let SH = Dimensions.get('window').height;
export let HH = SH/11.625
export let PaddingSize = SW - SW / 16;
export let stretchMinimum = SH /16;
// FONT
export let basicIconFont = 30;
export let smallFont = 11;
export const
    LinierBackground = (props) => {
        return (
            <LinearGradient
                colors={['#fd8824', '#fdb82c']}
                start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                style={{
                    height: 48,
                    width: SW - 120,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 40,
                    paddingLeft: 40
                }}>
                {props.children}
            </LinearGradient>
        )
    }

