/* @flow */

import React, {Component} from 'react';
import {
    Alert,
    BackHandler,
    Image,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {Icon} from 'native-base';
import Text from '../../../components/text/Text'
import LinearGradient from 'react-native-linear-gradient';
import {fontGrey, Pad, SH, SW} from "../../../config/styles";
import {submitButton} from "../../../components/modalSubmitButton";
import PlusIcon from 'react-native-vector-icons/Feather'
import ImagePicker from "react-native-image-picker";
import {fetcher} from "../../../generalFunc/fetcher";
import {editUserRoute} from "../../../config/apiRoutes";
import {inject, observer} from "mobx-react/native";

var options = {
    title: 'Upload profile picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


@inject("modalsStore")
@inject('userDataStore')
@observer
export default class AccountSettings extends Component {

    static navigationOptions = {
        header: null
    }
    handleBackButton = () => {
        console.warn('success??224');
        this.props.navigation.navigate("Home");
        this.props.navigation.navigate('DrawerOpen')
        return true;
    }

    constructor(props) {
        super(props);
        this.state = {
            male: true,
            feMale: false
        }
    }

    static successCB(res) {
        this.props.userDataStore.updateUser(res);
        this.props.modalsStore.hideModal('loaderModal');
        Alert.alert("שינויים נשמרו בהצלחה");
        console.log("update user response:", res);
    }

    static errorCallback(err) {
        this.props.modalsStore.hideModal('loaderModal');
        Alert.alert("אירעה בעיה והשינויים לא נשמרו");
        console.log('err in update user:', err);
    }

    componentDidMount() {
        //backHandler:
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // this.props.navigation.state.params.onClose()
    }

    changeGender() {
        let prevM = this.state.male;
        let prevF = this.state.feMale;
        this.setState({
            male: !prevM,
            feMale: !prevF
        })
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
                this.setState({
                    profilePic: source,
                    picData: data,
                });
            }
        });
    }

    saveChanges() {
        let sendObj = {};
        if (this.state.profilePic) {
            let newObj = this.state.picData;
            for (let item in this.state) {
                if (item !== "picData" && item !== "profilePic") {
                    newObj.append(item, this.state[item])
                }
            }

            sendObj = {
                type: 'pic',
                payload: newObj
            }
        }
        else {
            sendObj = Object.assign({}, this.state);
        }
        this.props.modalsStore.showModal('loaderModal');
        fetcher(editUserRoute, 'PATCH', AccountSettings.successCB.bind(this), AccountSettings.errorCallback.bind(this), sendObj, {token: this.props.userDataStore.userData.token})
    }

    render() {
        let user = this.props.userDataStore.userData.user;
        console.warn('this.state.name',this.state.name);
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <LinearGradient
                    colors={['#fd8824', '#fdb82c']}
                    start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                    style={styles.container}>
                    <Navbar
                        handleBackButton={this.handleBackButton.bind(this)}
                        profilePic={this.state.profilePic}
                        user={this.props.userDataStore.userData.user}
                        navigation={this.props.navigation}
                        selectPhotoTapped={this.selectPhotoTapped.bind(this)}/>
                </LinearGradient>
                <View style={{flex: 1, width: SW - (Pad * 2)}}>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1, justifyContent: 'center', width: SW - (Pad * 3)}}>
                            <Text>שם ושם משפחה</Text>
                            <TextInput
                                multiline={true}
                                selectionColor={fontGrey}
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                value={this.state.name? this.state.navigation: user.name || ""}
                                onChangeText={(name)=>this.setState({name})}
                            />
                        </View>
                        <View style={{flex: 1, width: SW - (Pad * 3)}}>
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
                            <View style={{alignItems: 'center',}}>
                                {submitButton('שמור שינויים', 'pro', () => {
                                    this.saveChanges();
                                })}
                            </View>
                        </View>

                    </View>

                    <View style={{flex: 0.5, borderTopWidth: 1, borderColor: 'grey'}}>
                        <View style={{flex: 0.5, justifyContent: 'center'}}>
                            <Text>אמצעי תשלום</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
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
                    <TouchableOpacity onPress={() => props.handleBackButton()}>
                        <Icon name='ios-arrow-back-outline' style={{color: '#fff', fontSize: 30, margin: 20}}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', paddingRight: Pad}}>
                    <Text>הגדרות חשבון</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', position: 'absolute', bottom: 10, right: 20, alignItems: 'center'}}>

                <TouchableOpacity
                    onPress={() => props.selectPhotoTapped("profile_pic")}
                >
                    <Text style={{color: '#ffffff', paddingRight: 10}}>העלה תמונה</Text>
                </TouchableOpacity>

                {props.profilePic ?
                    <Image
                        source={props.profilePic}
                        style={{height: 60, width: 60, borderRadius: 100}}/> :
                    props.user && props.user.profile_pic_thumb ?
                        <Image
                            source={{uri: props.user.profile_pic_thumb}}
                            style={{height: 60, width: 60, borderRadius: 100}}/> :
                        <TouchableOpacity style={{alignItems: 'center'}}
                                          onPress={() => props.selectPhotoTapped("profile_pic")}
                        >
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
