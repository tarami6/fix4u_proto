/* @flow
* here we have functionality for the choose service
* */

import React, {Component} from 'react';
import {
    View,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Text from '../../../../../components/text/Text'
import {inject, observer} from "mobx-react/native";
import {SW} from "../../../../../config/styles";

import {hebrewServices} from "../../../../../generalFunc/generalObjects";


const WIDTH_CARD = (SW / 2) - 50


@inject("addJobStore")
@observer
class CardRow extends Component {

    constructor(props) {
        super(props)
        this.scale = new Animated.Value(1)
    }

    onPressIn = () => {
        Animated.timing(
            // Animate value over time
            this.scale, // The value to drive
            {
                duration: 200,
                toValue: .8, // Animate to final value of 1
            }
        ).start();
    }

    onPressOut = () => {

        Animated.timing(
            // Animate value over time
            this.scale, // The value to drive
            {
                duration: 100,
                toValue: 1, // Animate to final value of 1
            }
        ).start();
    }

    //handle the choose service pree
    handlePress(serviceName) {
        this.props.addJobStore.editNewJobInfo({service: serviceName});
        this.props.nextStep()
    }

    render() {
        console.log("Sa", this.props.service.item)
        const service = this.props.service.item
        const animatedStyle = {transform: [{scale: this.scale}]}
        return (
            <TouchableOpacity
                onPressIn={() => {
                    this.onPressIn()
                }}
                onPressOut={() => {
                    this.onPressOut()
                }}
                onPress={() => {
                    this.handlePress(service.name)
                }}
                style={{ elevation: 5, borderRadius: 10, backgroundColor: '#ffffff'}}
                activeOpacity={1}>
                <View style={[styles.container]}>
                    <Animated.Image
                        resizeMode='contain'
                        style={[styles.image, animatedStyle]}
                        source={service.uri}
                    />
                    <Text style={styles.textName}>{hebrewServices[service.name]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default CardRow;

const styles = StyleSheet.create({
    container: {
        width: WIDTH_CARD,
        height: WIDTH_CARD,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
         borderRadius: 10,

    },
    image: {
        width: WIDTH_CARD / 2,
    },
    textName: {
        position: 'absolute',
        bottom: WIDTH_CARD / 10
    }
});
