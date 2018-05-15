import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Alert} from 'react-native';
import Text from '../../../components/text/Text'
import {SH, HH, SW, LinierBackground, mainStyles, mainRed} from "../../../config/styles";
import {submitButton} from "../../../components/modalSubmitButton";

export default class ActionToNoApply extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={{flex: 1, }}>
                    <View style={{flex: 1,alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Image
                            style={{width: SW / 10, height: SW / 10, marginBottom: SH / 20}}
                            source={require('../../../../assets/icons/canceling.png')}
                        />
                        <Text type={'greyTitle'}>
                            מתנצלים,
                        </Text>
                        <Text type={'greyTitle'}>
                            אף אחד לא פנוי בזמן הזה
                        </Text>
                    </View>
                    <View style={{flex: 1,  alignItems: 'center',}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => Alert.alert('Five minutes again')}>
                                <LinierBackground>
                                    <Text style={mainStyles.buttonText}>חפש שוב 05:00</Text>
                                </LinierBackground>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => Alert.alert('Show me List of Pros')}>
                                <LinierBackground>
                                    <View style={{
                                        width: SW - 124,
                                        height: HH - 4,
                                        borderRadius: 30,
                                        margin: 1,
                                        backgroundColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingRight: 40,
                                        paddingLeft: 40
                                    }}>
                                        <Text style={[mainStyles.buttonText, {color: '#fd8724'}]}> לרשימת אנשים
                                            רלוונטיים</Text>
                                    </View>
                                </LinierBackground>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <View style={{flex: 0.4,  alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => Alert.alert('Show me List of Pros')}>
                            <View style={{
                                width: SW - 124,
                                height: HH - 4,
                                borderRadius: 30,
                                margin: 1,
                                backgroundColor: mainRed,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingRight: 40,
                                paddingLeft: 40
                            }}>
                                <Text style={[mainStyles.buttonText, {color: '#fff'}]}> בטל </Text>
                            </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
});