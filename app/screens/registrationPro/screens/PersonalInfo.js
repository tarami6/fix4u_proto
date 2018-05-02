import React from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearViewBelowHeaderPro from '../components/LinearViewBelowHeaderPro';
import {submitButton} from "../../../components/modalSubmitButton";
import {HH, SH, SW} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import Header from '../../../components/headers/Header'

@inject("modalsStore")
@inject("proAuthStore")
@observer
export default class PersonalInfo extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone_number: this.props.proAuthStore.proUser.phone_number,
            company_name: '',
            company_id: '',

        };
    }



    handleSubmit() {
        let formFilled = true;
        for (let item in this.state) {
            if (!this.state[item]) {
                Alert.alert('please fill in ' + item);
                formFilled = false;
            }
        }
        if(formFilled)
        {
            //update the user at mobx
            this.props.proAuthStore.updatePro(this.state);
            this.props.navigation.navigate('AddressInfo');
            //send fetch to get verification code
            // let sendObj = {
            //     phone_number: this.state.phone_number
            // }
            // fetcher('api/sms/verify/', 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj)
            // this.props.navigation.navigate('AddressInfo');
        }
    }
    successCallback(obj){
        if(obj["success"]){
            this.props.modalsStore.showModal('proPhoneVerifyModal');
        }
        else {
            Alert.alert('please fill in a proper phone number');
        }
        console.warn('success callback got:', obj);
        console.log('asdadadadadadada', obj);
    }

    errorCallback(err){
        console.warn('personalInfo err cb got :', err)
    }

    componentDidMount(){
        this.nameField.focus();
    }

    render() {
        // if(this.props.proAuthStore.proUser.uid){
        //     this.props.navigation.navigate('AddressInfo');
        // }
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View style={styles.linear}>
                        <LinearViewBelowHeaderPro>
                            <Header head={'AddJob'} previousPage={'ChooseUserType'} props={this.props} />
                            {/*step indicator*/}
                            <View>
                                <Image
                                    style={{marginTop: 0}}
                                    source={require('../../../../assets/registration/icons/proStepImdicator1.png')}
                                />
                            </View>
                            <View style={{marginTop: SH / 30}}>
                                <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                                    פרטים אישיים
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    ref={(ref=> this.nameField = ref)}
                                    underlineColorAndroid={'transparent'}
                                    style={{
                                        marginTop: SW / 30,
                                        borderColor: '#ECECEC',
                                        borderWidth: 2,
                                        backgroundColor: '#fcfcfc',
                                        borderRadius: 10,
                                        width: SW / 1.16,
                                        textAlign: 'right',
                                        paddingRight: 10,
                                        color: '#6e6e6e'
                                    }}
                                    placeholder={'הכנס שם'}
                                    onChangeText={(text) => this.setState({name: text})}
                                    value={this.state.name}
                                    returnKeyType={'next'}
                                    onSubmitEditing={()=>{this.companyNameInput.focus()}}
                                />
                            </View>


                        </LinearViewBelowHeaderPro>
                    </View>
                    <View style={styles.contactForm}>
                        <View>
                            <Text>נא לציין כפי שרשום ברשויות</Text>
                        </View>
                        {/*business name Input*/}
                        <TextInput
                            ref={(ref) => this.companyNameInput = ref}
                            underlineColorAndroid={'transparent'}
                            style={{
                                marginTop: SW / 30,
                                borderColor: '#ECECEC',
                                borderWidth: 2,
                                backgroundColor: '#fcfcfc',
                                borderRadius: 10,
                                width: SW / 1.16,
                                textAlign: 'right',
                                paddingRight: 10,
                                color: '#9b9b9b'
                            }}
                            placeholder={'שם החברה'}
                            onChangeText={(text) => this.setState({company_name: text})}
                            value={this.state.company_name}
                            returnKeyType={'next'}
                            onSubmitEditing={()=>{this.companyIdInput.focus()}}
                        />
                        {/*business id input*/}
                        <TextInput
                            ref={(ref) => this.companyIdInput = ref}
                            underlineColorAndroid={'transparent'}
                            style={{
                                marginTop: SW / 30,
                                borderColor: '#ECECEC',
                                borderWidth: 2,
                                backgroundColor: '#fcfcfc',
                                borderRadius: 10,
                                width: SW / 1.16,
                                textAlign: 'right',
                                paddingRight: 10,
                                color: '#9b9b9b'
                            }}
                            placeholder={'הכנס מספר חברה'}
                            onChangeText={(text) => this.setState({company_id: text})}
                            value={this.state.company_id}
                            returnKeyType={'go'}
                            onSubmitEditing={()=>{this.handleSubmit()}}

                        />
                        {/*Password Label */}


                    </View>
                    <View style={styles.footer}>
                        <View style={{alignItems: 'center'}}>
                            {submitButton('המשך','consumer', () => {
                                this.handleSubmit()
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
        flex: 1,
        height: SW - HH
    },
    linear: {
        height: SH/3,
        // backgroundColor: 'green'
    },
    contactForm: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: SH / 40
    }

})