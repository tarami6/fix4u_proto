import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import {SH, SW} from "../config/styles";
import Cicons from '../../../../components/customIcons/CustomIcons'

export default class BoilerpPlate extends React.Component {
    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>

                    <View style={{marginTop: SH / 4}}>
                        <Cicons name={"logo"} size={350} color={"#fff"}/>
                    </View>
                    <Image
                        style={{marginTop: SH / 12}}
                        source={require('../../assets/intro/icons/fixLogo.png')}
                    />
                    <View style={{marginTop: SH / 3.5, alignItems: 'center'}}>
                        <Progress.Bar progress={0.5} height={2} width={100} color={"rgba(255, 255, 255, 1)"} unfilledColor={'#CACACA'}/>
                    </View>

                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});