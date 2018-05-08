import React from 'react'
import {TouchableOpacity,Image,StyleSheet, View, Alert} from 'react-native';
import Counter from './Counter';
import {HH, PaddingSize} from "../../../config/styles";

const HeaderConsumer = (props) => {
    color = props.background
    return (

        <View style={[styles.customHeader,{backgroundColor: color}]}>
            <TouchableOpacity  onPress={() => {
                props.navigation.navigate('DrawerOpen')
                props.navigation.setParams({
                    drawerOpen: true,
                });
            }}>
                <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../../assets/icons/Menu.png')}/>
            </TouchableOpacity>

            <Image
                style={{width: 65, height: 20, marginLeft: 10}}
                source={require('../../../../assets/icons/fix4U.png')}/>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Schedule')}
                style={styles.rightButton}>
                <Image
                    style={{width: 30, height: 30}}
                    source={require('../../../../assets/icons/noteMan.png')}/>
            </TouchableOpacity>
            <Counter/>
        </View>
    )
}

export default HeaderConsumer;
const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: HH,
        width: PaddingSize,
        alignSelf: 'center',
        alignItems: 'center'
    },


});