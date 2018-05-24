import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SH, SW} from "../../../../config/styles";
import Cicons from '../../../../components/customIcons/CustomIcons'
import Text from '../../../../components/text/Text'
export default class OpenScreen1 extends React.Component {
    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{marginTop: SH / 14, paddingBottom: SH/40}}>
                        <Cicons name={"logo"} size={150} color={"#fff"}/>
                    </View>
                    <View style={{paddingTop: SW / 14}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 24}}
                              type={"introText"}>ברוך\ה הבא
                            לFIX4U</Text>
                    </View>
                    <View style={{marginRight: SH / 20}}>
                        <Image
                            style={{marginTop: SH / 15, marginBottom: SH/30}}
                            source={require('../../../../../assets/intro/icons/Group1.png')}
                        />
                        <View style={{position: 'absolute', bottom: SW / 400, right: SH / 40}} type={"introText"}>
                            <Text style={{textAlign: 'center',alignContent: 'center', color: '#fff',}}
                                  type={"introText"} >כאן תוכל למצוא אנשי שירות
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