import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SH, SW} from "../../../../config/styles";
import Cicons from '../../../../components/customIcons/CustomIcons'

export default class OpenScreen3 extends React.Component {
    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{marginTop: SH / 35}}>
                        <Cicons name={"logo"} size={50} color={"#fff"}/>
                    </View>
                    <View style={{marginTop: SH / 35}}>
                        <Cicons name={"3"} size={300} color={"#fff"}/>
                    </View>
                    <View style={{paddingTop: SW / 14}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                            שלם באשראי או מזומן{"\n"}
                            וקבל חשבונית מס.
                        </Text>
                        <View style={{marginTop:SH / 70, marginBottom: SH / 100,  width: 40, borderTopWidth:2, borderColor: '#fff', alignSelf: 'center'}}/>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                            מעכשיו זה קל

                        </Text>
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