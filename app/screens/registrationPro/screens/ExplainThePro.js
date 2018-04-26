import React from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {submitButton} from "../../../components/modalSubmitButton";
import {SH, SW, HH} from "../../../config/styles";
import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderPro';
import CustomHeaderAddJob from '../components/CustomHeaderRegPro'
import {fetcher} from "../../../generalFunc/fetcher";
import ImagePicker from "react-native-image-picker";
import {inject, observer} from "mobx-react/native";
import Header from "../../../components/headers/Header";

var options = {
    title: 'Upload profile picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

@inject("modalsStore")
@inject("proAuthStore")
@observer
export default class ExplainThePro extends React.Component {
    static navigationOptions = {
        header: null


    };

    handleSubmit() {
        let company_description = this.state.text;
        let sendObj = {
            company_description: this.state.text,
            profile_pic: this.state.picData
        }
        this.props.proAuthStore.updatePro(sendObj);
        this.props.navigation.navigate('DataConfirmPro');
    }

    selectPhotoTapped(fieldName = 'profile_pic') {


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                let source = {uri: response.uri};
                let data = new FormData();
                data.append(fieldName, {uri: response.uri, name: response.fileName, type: response.type});
                // You can also display the image using data:
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.props.proAuthStore.updatePro({'profile_pic': data})
                this.props.proAuthStore.setLocalImage(source);
                this.setState({
                    profilePic: source,
                    picData: data,
                });
            }
        });
    }

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
                        <Header head={'AddJob'} previousPage={'ChoosingService'} props={this.props} />
                        {/*step indicator*/}
                        <View>
                            <Image
                                source={require('../../../../assets/registration/icons/proStepImdicator4.png')}
                            />
                        </View>
                        {/*explain the job title*/}
                        <View style={styles.explainTitleView}>
                            <Text style={styles.explainText}>
                                תאר את העסק
                            </Text>
                            <Text style={styles.explainTextOptional}>
                                לא חובה אך מומלץ
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
                    </View>
                    {/*add pic icon*/}
                    <View style={styles.addPicIconView}>
                        <TouchableOpacity onPress={() => {
                            this.selectPhotoTapped()
                        }}>
                            {this.state.profilePic ?
                                <Image style={{height: 100, width: 100}} source={this.state.profilePic}/> :
                                <Image
                                    source={require('../../../../assets/addJob/icons/addPic.png')}
                                />}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('סיום', () => {
                            this.handleSubmit();
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
        alignSelf: 'center',
        marginTop: SW / 25,

    },
    explainText: {
        color: '#fff',
        fontSize: 18,
        alignSelf: 'center'
    },
    explainTextOptional: {
        color: '#fff',
        fontSize: 12,
        alignSelf: 'center'
    },
    textInputView: {
        position: 'absolute',
        top: SW / 3,
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