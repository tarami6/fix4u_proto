import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
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
export let mainRed = '#FF4343';
export let grey = '#CCCCCC';
export let backgroundGrey = '#f6f6f6'
export let fontGrey = '#7f7f7f';
export let START = '#FFBA00';
export let END = '#FF8D00';
export let GOLD = "#ffd700"
// SCREEN ZISE
export let SW = Dimensions.get('window').width;
export let SH = Dimensions.get('window').height;
export let HH = SH / 11.625
export let PaddingSize = SW - SW / 16;
export let stretchMinimum = SH / 16;
export let Pad = SW /20;
// FONT
export let basicIconFont = 30;
export let largeFont = 20;
export let buttonFont = 18;
export let infoWhiteFont = 16;
export let mediumFont = 14
export let smallFont = 11;
let mainFontBold = 'Rubik-Bold';
let mainFont = 'Rubik';

export const
    LinierBackground = (props) => {
        return (
            <LinearGradient
                colors={['#FF8600', '#FFBA00']}
                start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                style={{
                    height: HH,
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

export let mainStyles = StyleSheet.create({
    // Text
    whiteTitle:{
        fontFamily: mainFontBold,
        fontSize: largeFont,
        color: '#ffffff',
        textAlign: 'center'
    },
    button:{
        fontFamily: mainFontBold,
        color: '#ffffff',
        fontSize: largeFont,
    },
    greySmallNote:{
        fontFamily: mainFont,
        fontSize: mediumFont,
    },
    p:{
        fontFamily: mainFont,
    },
    greyTitle: {
        fontFamily: mainFontBold,
        fontSize: 18,
        color: fontGrey,
    },
    buttonText: {
        color: '#fff',
        fontFamily: mainFontBold,
        fontSize: buttonFont,

    },

    infoWhiteText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: mainFontBold,
    },
    threeStepsIndicator:{
        width: '30%', height: '45%',
    },
    fourStepsIndicator: {
        marginTop: 0,
        width: SW / 2,
        height: SH /31,
    }

});

