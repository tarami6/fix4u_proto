/* @flow
* here we have functionality for the choose service
* */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Circle} from './index';
import {inject, observer} from "mobx-react/native";


const {width, height} = Dimensions.get('window')
const WIDTH_CARD = (width / 2) - 50


@inject("authStore")
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
        //  first we edit the newJobInfo with the service
        this.props.addJobStore.editNewJobInfo({service: serviceName});
        //here we also check if user is authenticated to move on,
        if (this.props.authStore.user.token) {
            this.props.nextStep()
        }
        else {
            //and then if user is not authenticated we send him to auth
            this.props.authStore.setShowAuthModal(true);
        }
    }

    render() {
        const {service} = this.props
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
                activeOpacity={1}>
                <View style={[styles.container]}>
                    <Circle qty={service.qty}/>
                    <Animated.Image
                        resizeMode='contain'
                        style={[styles.image, animatedStyle]}
                        source={service.uri}
                    />
                    <Text style={styles.textName}>{service.name}</Text>
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
        alignItems: 'center'
    },
    image: {
        width: WIDTH_CARD / 2.5,
    },
    textName: {
        position: 'absolute',
        bottom: WIDTH_CARD / 10
    }
});
