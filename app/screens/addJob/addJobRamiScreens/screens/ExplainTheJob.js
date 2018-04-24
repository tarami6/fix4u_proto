import React from 'react';
import {
    View,
    Text,
    Image,
    Alert,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import {SH, SW, HH} from "../../../../config/styles";
import CustomHeaderAddJobStepsConsumer from '../../../../components/headers/CustomHeaderAddJobStepsConsumer'
import {submitButton} from "../../../../components/modalSubmitButton";
import CustomHeaderAddJob from '../../../../components/headers/CustomHeaderAddJob'
import {inject, observer} from "mobx-react/native";
import ImagePicker from "react-native-image-picker";
import LinierView from '../../../../components/linierView';

//image picker options:
var options = {
    title: 'Upload profile picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

@inject("addJobStore")
@observer
export default class ChooseTime extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    selectPhotoTapped(fieldName = 'image') {


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
                this.props.addJobStore.editNewJobInfo({'image': data});
                this.setState({
                    profilePic: source,
                    picData: data,
                });
            }
        });
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
                    <LinierView>
                        <CustomHeaderAddJobStepsConsumer props={this.props}/>
                        <View style={{flex: 1, marginLeft: SW / 30,  alignItems: 'center'}}>
                            <Image
                                    source={require('../../../../../assets/addJob/icons/stepIndicatorConsumer2.png')}
                                />
                        </View>
                        <View style={styles.explainTitleView}>
                                <Text style={styles.explainText}>
                                    תאר את הבעיה
                                </Text>
                            </View>

                    </LinierView>



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
                            <TouchableOpacity onPress={() => {
                                this.selectPhotoTapped()
                            }}>
                                {this.state.profilePic ?
                                    <Image style={{height: 100, width: 100}} source={this.state.profilePic}/> :
                                    <Image
                                        source={require('../../../../../assets/addJob/icons/addPic.png')}
                                    />}
                            </TouchableOpacity>
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
        marginBottom: SH /10,
        marginRight: (SW - (SW / 1.16)) / 1.5
    },
    explainText: {
        color: '#fff',
        fontSize: 18
    },
    textInputView: {
        position: 'absolute',
        top: SW / 3.5,
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
        marginTop: SH /20,
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