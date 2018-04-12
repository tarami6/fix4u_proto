import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {SH, SW, HH} from "../../../../config/styles";
import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderConsumer';
import {submitButton} from "../../../../components/modalSubmitButton";
import CustomHeaderAddJob from '../components/CustomHeaderAddJob'

export default class ChooseAddress extends React.Component {
    static navigationOptions = {
        header: ( /* Your custom header */
            <CustomHeaderAddJob/>
        ),


    };

    constructor(props) {
        super(props);
        this.state = {text: 'כתובת'};
    }

    render() {
        return (
            <View style={styles.container}>
                {/*Linear under header*/}
                <View style={styles.linear}>
                    <LinearViewBelowHeaderConsumer>
                        {/*step indicator*/}
                        <View>
                            <Image
                                source={require('../assets/icons/stepIndicatorConsumer3.png')}
                            />
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                multiline={true}
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                        </View>
                    </LinearViewBelowHeaderConsumer>
                </View>

                {/*Map Component*/}
                <View style={{flex: 1.2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        Map Component
                    </Text>
                </View>

                {/*Footer with payment method and button*/}
                <View style={styles.footer}>
                    <View style={{flex: 1}}>
                        <View style={styles.paymentMethodView}>
                            <View style={styles.iconViewLeft}>
                                <Image
                                    source={require('../assets/icons/CashPayIcon.png')}
                                />
                            </View>
                            <View style={styles.borderViewMiddle}/>
                            <View style={styles.iconViewRight}>
                                <Image
                                    source={require('../assets/icons/CreadiPayIcon.png')}
                                />
                            </View>
                        </View>
                    </View>

                    {/*Button*/}
                    <View style={styles.container}>
                        <View style={{alignItems: 'center'}}>
                            {submitButton('המשך', () => {
                                console.log("warn")
                            })}
                        </View>
                    </View>

                </View>

            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    linear: {
        flex: 0.8
    },
    textInputView: {
        marginTop: SH / 10
    },
    textInput: {
        borderColor: '#ECECEC',
        borderWidth: 2,
        backgroundColor: '#fcfcfc',
        borderRadius: 5,
        width: SW / 1.16,
        textAlign: 'right',
        paddingRight: 10,
        color: '#9b9b9b'
    },
    // Footer
    footer: {
        flex: 0.8,
        justifyContent: 'center',
        backgroundColor: '#f4f4f4'
    },
    paymentMethodView: {
        height: SH / 12,
        marginTop: SW / 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    iconViewLeft: {
        alignSelf: 'center',
        marginRight: SW / 8,
    },
    borderViewMiddle: {
        height: SH / 15,
        width: 3,
        borderLeftWidth: 2,
        borderColor: '#979797',
        alignSelf: 'center',
    },
    iconViewRight: {
        alignSelf: 'center',
        marginLeft: SW / 8,
    }
})