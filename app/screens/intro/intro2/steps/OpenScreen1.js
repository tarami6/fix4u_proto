import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SH, SW} from "../../../../config/styles";
import Cicons from '../../../../components/customIcons/CustomIcons'

export default class OpenScreen1 extends React.Component {
    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{marginTop: SH / 7}}>
                        <Cicons name={"logo"} size={150} color={"#fff"}/>
                    </View>
                    <View style={{paddingTop: SW / 14}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold'}}>ברוך\ה הבא
                            לFIX4U</Text>
                    </View>
                    <View style={{marginRight: SH / 22}}>
                        <Image
                            style={{marginTop: SW / 14}}
                            source={require('../../../../../assets/intro/icons/Group1.png')}
                        />
                        <View style={{position: 'absolute', bottom: SW / 400, right: SH / 40}}>
                            <Text style={{textAlign: 'center',alignContent: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold', fontWeight: 'bold'}}>כאן תוכל למצוא אנשי שירות
                           {"\n"} מדקה לדקה עד הבית</Text>
                        </View>

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