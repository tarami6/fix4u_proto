import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SH, SW} from "../../../../config/styles";

export default class OpenScreen2 extends React.Component {
    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>
                    <Image
                        style={{marginTop: SH / 35}}
                        source={require('../../../../../assets/intro/icons/Group3.png')}
                    />
                    <View style={{paddingTop: SW / 7}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                            פשוט תבחר איזה תחום אתה מחפש.{"\n"}
                            זמן, תאר את הבעיה,{"\n"}
                            הוא יהיה כבר בדרך אלייך!
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