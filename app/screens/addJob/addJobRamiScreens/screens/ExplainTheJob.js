import React from 'react';
import {View, Text, Image, Alert, TextInput, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {SH, SW, HH} from "../../../../config/styles";
import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderConsumer';
import {submitButton} from "../../../../components/modalSubmitButton";
import CustomHeaderAddJob from '../components/CustomHeaderAddJob'
import {inject, observer} from "mobx-react/native";

@inject("addJobStore")
@observer
export default class ChooseTime extends React.Component {
    static navigationOptions = {
        header: (/* Your custom header */
            <CustomHeaderAddJob/>
        ),


    };

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    submitJob() {
        // console.log('addJobStore info collected:', this.props.addJobStore.newJobInfo)
        if (!this.state.text) {
            Alert.alert('please fill in description')
        }
        else {
            let sendObj = {
                description: this.state.text,
            };
            this.props.addJobStore.editNewJobInfo(sendObj);
            this.props.navigation.navigate('ChooseAddress');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                    this.textField.blur()
                }}>
                    {/*Linear*/}
                    <View style={styles.linear}>
                        <LinearViewBelowHeaderConsumer>
                            {/*step indicator*/}
                            <View>
                                <Image
                                    source={require('../assets/icons/stepIndicatorConsumer2.png')}
                                />
                            </View>
                            {/*explain the job title*/}
                            <View style={styles.explainTitleView}>
                                <Text style={styles.explainText}>
                                    תאר את הבעיה
                                </Text>
                            </View>

                        </LinearViewBelowHeaderConsumer>
                    </View>
                </TouchableWithoutFeedback>


                {/*text input*/}
                <View style={styles.textInputView}>
                    <TextInput
                        ref={(ref) => this.textField = ref}
                        multiline={true}
                        numberOfLines={20}
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                </View>
                {/*middle*/}
                <TouchableWithoutFeedback style={{zIndex: 1}} onPress={() => {
                    this.textField.blur()
                }}>
                    <View style={styles.middleView}>
                        {/*add pic title & optional title*/}
                        <View style={styles.addTitleView}>
                            <Text style={styles.addPicText}>
                                הוסף תמונה
                            </Text>
                            <Text style={styles.optionalTitleText}>
                                לא חובה
                            </Text>
                        </View>
                        {/*add pic icon*/}
                        <View style={styles.addPicIconView}>
                            <Image
                                source={require('../assets/icons/addPic.png')}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.footer}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('המשך', this.submitJob.bind(this))}
                    </View>
                </View>
            </View>


        );
    }
}

let styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: SH - HH,
        width: SW,
        top: 0,
        left: 0,
        flex: 1
    },
    linear: {
        flex: 0.8
    },
    explainTitleView: {
        alignSelf: 'flex-end',
        marginTop: SW / 15,
        marginRight: (SW - (SW / 1.16)) / 1.5
    },
    explainText: {
        color: '#fff',
        fontSize: 18
    },
    textInputView: {
        position: 'absolute',
        top: SW / 6,
        alignSelf: 'center'
    },
    textInput: {
        height: SH / 3.2,
        marginTop: SH / 31,
        borderColor: '#ECECEC',
        borderWidth: 2,
        backgroundColor: '#fcfcfc',
        borderRadius: 5,
        width: SW / 1.16,
        textAlign: 'right',
        paddingRight: 10,
        textAlignVertical: 'top',
        zIndex: 3
    },
    // Middle
    middleView: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTitleView: {
        alignSelf: 'flex-end',
        marginTop: SW / 5,
        marginRight: (SW - (SW / 1.16)) / 1.5
    },
    addPicText: {
        color: '#4a4a4a',
        fontSize: 16,
    },
    optionalTitleText: {
        color: '#9b9b9b',
        fontSize: 12
    },
    addPicIconView: {
        alignSelf: 'flex-end',
        marginTop: SW / 20,
        marginRight: (SW - (SW / 1.16)) / 1.5
    },
    // Footer
    footer: {
        flex: 0.5,
        justifyContent: 'center'
    }
})