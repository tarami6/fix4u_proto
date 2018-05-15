/* @flow */

import React, {Component} from 'react';
import {
    TextInput,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Icon, List, ListItem} from 'native-base';
import Text from '../../../components/text/Text'
import LinearGradient from 'react-native-linear-gradient';
import {Pad, SW, fontGrey, SH} from "../../../config/styles";
import {submitButton} from "../../../components/modalSubmitButton";
import PlusIcon from 'react-native-vector-icons/Feather'


export default class AccountSettings extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            male: true,
            feMale: false
        }
    }

    changeGender() {
        let prevM = this.state.male;
        let prevF = this.state.feMale;
        this.setState({
            male: !prevM,
            feMale: !prevF
        })
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <LinearGradient
                    colors={['#fd8824', '#fdb82c']}
                    start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                    style={styles.container}>
                    <Navbar navigation={this.props.navigation}/>
                </LinearGradient>
                <View style={{flex: 1,  width: SW - (Pad * 2)}}>

                    <View style={{flex: 1,  alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', width: SW - (Pad * 3)}}>
                            <Text>שם ושם משפחה</Text>
                            <TextInput
                                multiline={true}
                                selectionColor={fontGrey}
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                value={''}
                            />
                        </View>
                        <View style={{flex: 1,  width: SW - (Pad * 3)}}>
                            <Text>מין</Text>
                            <View style={{flexDirection: 'row', paddingTop: SH / 40}}>
                                <View style={{flex: 1}}/>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.changeGender()
                                }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                    }}>


                                        <Text style={{paddingRight: 10}}>נקבה</Text>
                                        {this.state.feMale ?
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../assets/registration/icons/Vee.png')}/> :
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../assets/registration/icons/square.png')}/>}

                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.changeGender()
                                }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end'
                                        }}>
                                        <Text style={{paddingRight: 10}}>זכר</Text>
                                        {this.state.male ?
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../assets/registration/icons/Vee.png')}/> :
                                            <Image
                                                style={{width: 20, height: 20}}
                                                source={require('../../../../assets/registration/icons/square.png')}/>}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{alignItems: 'center', }}>
                                {submitButton('שמור שינויים', 'pro', () => {
                                    Alert.alert('אושר')
                                })}
                            </View>
                        </View>

                    </View>

                    <View style={{flex: 0.5, borderTopWidth: 1, borderColor: 'grey'}}>
                        <View style={{flex: 0.5,  justifyContent: 'center'}}>
                            <Text>אמצעי תשלום</Text>
                        </View>
                        <View style={{flex: 1,  justifyContent: 'center'}}>
                            <View style={{alignItems: 'center',}}>
                                {submitButton('הגדר', 'orangeBorder', () => {
                                    Alert.alert('אושר')
                                })}
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
}

const Navbar = (props) => {
    return (
        <View style={{width: SW, height: Platform.OS == 'ios' ? 150 : 135,}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('DrawerClose')}>
                        <Icon name='ios-arrow-back-outline' style={{color: '#fff', fontSize: 30, margin: 20}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', paddingRight: Pad}}>
                    <Text>הגדרות חשבון</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', position: 'absolute', bottom: 10, right: 20, alignItems: 'center'}}>

                <TouchableOpacity>
                    <Text style={{color: '#ffffff', paddingRight: 10}}>העלה תמונה</Text>
                </TouchableOpacity>

                {props.user && props.user.profile_pic_thumb ?
                    <Image
                        source={{uri: props.user.profile_pic_thumb}}
                        style={{height: 60, width: 60, borderRadius: 100}}/> :

                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <View style={{borderRadius: 200, backgroundColor: '#D8D8D8', padding: 15}}>
                            <PlusIcon name="plus" size={40} color={"#ffffff"}/>
                        </View>

                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS == 'ios' ? 150 : 135,
        width: SW
    },
    textInput: {
        borderColor: '#ECECEC',
        borderWidth: 2,
        backgroundColor: '#fcfcfc',
        borderRadius: 5,
        textAlign: 'right',
        width: SW - (Pad * 3),
        alignSelf: 'center'
    },
});
