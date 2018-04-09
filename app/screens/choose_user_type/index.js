/* @flow */


import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {observer, inject} from 'mobx-react/native'
import authStore from "../../state-manager/mobx/authStore";

const {width, height} = Dimensions.get('window')
const sliderWidth = width
const itemWidth = width
//static image for development
const images = [
    {uri: require('../../../assets/chooseUserType/choose_mode.png')}
]


@inject("authStore")
@observer
export default class Welcome extends Component {
    navigate = (key) => {
        const {navigate} = this.props.navigation
        switch (key) {
            case 'dashboard':
                navigate("Dashboard", {"title": "Dashboard"})
                break;
            case 'form':
                alert('under development')
                // navigate("Form", {"title": "Form"})
                break;
            default:
                return
        }
    }

    chooseUserType(type) {
        this.props.authStore.chooseUserType(type)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', margin: 40}}>אני</Text>
                <OrangeButton chooseUserType={this.chooseUserType.bind(this)}/>
                <Text style={{fontWeight: '100', fontSize: 12, color: '#9b9b9b', margin: 40}}>או</Text>
                <WhiteButton chooseUserType={this.chooseUserType.bind(this)}/>
            </View>
        );
    }
}

const OrangeButton = ({chooseUserType}) => {
    return (
        <TouchableOpacity onPress={() => {chooseUserType('consumer')}}>
            <LinierBackground>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>מחפש איש מקצוע</Text>
            </LinierBackground>
        </TouchableOpacity>
    )
}

const WhiteButton = ({chooseUserType}) => {
    return (
        <TouchableOpacity onPress={() => {chooseUserType('pro')}}>
            <LinierBackground>
                <View style={{
                    width: width - 122,
                    height: 46,
                    borderRadius: 30,
                    margin: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 40,
                    paddingLeft: 40
                }}>
                    <Text style={{color: '#fd8724', fontWeight: 'bold'}}>נותן שירות</Text>
                </View>
            </LinierBackground>
        </TouchableOpacity>
    )
}

const LinierBackground = (props) => {
    return (
        <LinearGradient
            colors={['#fd8824', '#fdb82c']}
            start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
            style={{
                height: 48,
                width: width - 120,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
