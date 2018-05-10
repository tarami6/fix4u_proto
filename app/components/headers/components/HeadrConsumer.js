import React from 'react'
import {TouchableOpacity,Image,StyleSheet, View, Alert} from 'react-native';
import Counter from './Counter';
import {HH, PaddingSize, SH, SW} from "../../../config/styles";

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
                    style={{width: SW / 20, height: SW / 20}}
                    source={require('../../../../assets/icons/Menu.png')}/>
            </TouchableOpacity>

            <Image
                style={{width: SW / 5.1, height: SH / 33, margin:1, marginLeft: 10}}
                source={require('../../../../assets/icons/fix4U.png')}/>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Schedule')}
                style={styles.rightButton}>
                <Image
                    style={{width: SW / 15, height: SW / 15}}
                    source={require('../../../../assets/icons/noteMan.png')}/>
            </TouchableOpacity>
            {/*<Counter/>*/}
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