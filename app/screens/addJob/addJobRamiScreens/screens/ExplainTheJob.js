import React from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {SH, SW, HH} from "../../../../config/styles";
import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderConsumer';
import {submitButton} from "../../../../components/modalSubmitButton";
import CustomHeaderAddJob from '../components/CustomHeaderAddJob'

export default class ChooseTime extends React.Component {
    static navigationOptions = {
        header: ( /* Your custom header */
            <CustomHeaderAddJob/>
        ),


    };

    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={styles.container}>
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

                {/*text input*/}
                <View style={styles.textInputView}>
                    <TextInput
                        multiline={true}
                        numberOfLines={20}
                        underlineColorAndroid={'transparent'}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                </View>
                {/*middle*/}
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

                <View style={styles.footer}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('המשך', () => {
                            console.log("warn")
                        })}
                    </View>
                </View>

            </View>


        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    // Middle
    middleView:{
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addTitleView:{
        alignSelf: 'flex-end',
        marginTop: SW / 5,
        marginRight: (SW - (SW / 1.16)) / 1.5
    },
    addPicText:{
        color: '#4a4a4a',
        fontSize: 16,
    },
    optionalTitleText:{
        color: '#9b9b9b',
        fontSize: 12
    },
    addPicIconView:{
        alignSelf: 'flex-end',
        marginTop: SW / 20,
        marginRight: (SW - (SW / 1.16)) / 1.5
    },
    // Footer
    footer:{
        flex: 0.5,
        justifyContent: 'center'
    }
})