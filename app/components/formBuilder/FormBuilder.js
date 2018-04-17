//this component is a form builder
//it gets a type: textInput/date/time/picker/switch
//and an onSubmit function as prop to collect all data gathered
//there is also an option to get a specific field by getField prop
import React from 'react';
import {View, Text, Picker, TouchableOpacity, Image} from 'react-native';
import InputComponent from '../inputComponent';
import DatePicker from 'react-native-datepicker';
import SubmitButton from '../submitButton';
import styles from './styles';
import ImagePicker from "react-native-image-picker";

var options = {
    title: 'Upload profile picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    selectPhotoTapped(fieldName) {


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

    submit() {

        //if the form include an image we need to put the data in form data instead of a simple object
        if (!this.state.profilePic) {
            this.props.onSubmit(this.state)
            console.log('store submit with', this.state)
        }
        else {
            let formDataObj = this.state.picData
            for (let item in this.state) {
                if (item !== 'profilePic' && item !== 'picData') {
                    formDataObj.append(item, this.state[item])
                }
            }
            if (this.props.getField) {
                let field = this.state[this.props.getField];
                this.props.onSubmit(formDataObj, field)
            }
            else {
                this.props.onSubmit(formDataObj)
            }
            console.log('store submit with', formDataObj)
        }
    }

    inputSubmit(index){
        let nextIndex = index+1;
        // nextIndex = 'index'+nextIndex;
        console.log('nextIndex',nextIndex);
        if(index < this.props.fields.length-1) {
            switch (this.props.fields[index + 1].type) {
                case 'textInput':
                    let nextIndex = index+1;
                    this[nextIndex].focus();
            }
        }
    }

    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
                {this.props.fields.map((field, index) => {
                    switch (field.type) {
                        case 'textInput':
                            return (
                                <InputComponent
                                    ref={component => this[index] = component}
                                    key={index}
                                    style={{height: 40, borderColor: 'green', borderWidth: 1}}
                                    keyboardType={field.keyboardType}
                                    onChangeText={(text) => this.setState({[field.name]: text})}
                                    onSubmitEditing={()=>{this.inputSubmit(index)}}
                                    value={this.state[field.name]}
                                    placeholder={field.placeholder}
                                    secureTextEntry={field.secureTextEntry}
                                />
                            )
                        case 'timePicker':
                            return (
                                <View key={index}>
                                    <Text>
                                        {field.placeholder}:
                                    </Text>
                                    <DatePicker
                                        is24Hour={false}
                                        style={{height: 40, borderColor: 'green', borderWidth: 1, width: 200}}
                                        onDateChange={(time) => {
                                            this.setState({[field.name]: time})
                                        }}
                                        date={this.state[field.name]}
                                        mode="time"
                                        placeholder={field.placeholder}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                    />
                                </View>
                            );
                        case 'dateTimePicker':
                            return (
                                <View key={index}>
                                    <Text>
                                        {field.placeholder}:
                                    </Text>
                                    <DatePicker
                                        is24Hour={false}
                                        style={{height: 40, borderColor: 'green', borderWidth: 1, width: 200}}
                                        onDateChange={(time) => {
                                            this.setState({[field.name]: time})
                                        }}
                                        minDate={new Date()}
                                        date={this.state[field.name]}
                                        mode="datetime"
                                        placeholder={field.placeholder}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                    />
                                </View>
                            )
                        case 'picker':
                            // if (!this.state[field.name]) {
                            //     this.setState({[field.name]: field.items[0].value})
                            // }
                            return (
                                <Picker
                                    key={index}
                                    style={{height: 40, width: 200}}
                                    onValueChange={(value) => {
                                        this.setState({[field.name]: value})
                                    }}
                                    selectedValue={this.state[field.name]}
                                    itemStyle={styles.pickerItem}>
                                    {field.items.map((item, index) => {
                                        return (
                                            <Picker.Item label={item.label} value={item.value} key={index}/>
                                        )
                                    })}
                                </Picker>
                            )
                        case 'image':
                            return (
                                <TouchableOpacity onPress={()=>{this.selectPhotoTapped(field.name)}} key={index}>
                                    <View style={[styles.avatar, styles.avatarContainer]}>
                                        {this.state.profilePic === null ?
                                            <View style={styles.iconText}><Text>Select a Photo</Text>
                                                <Icon name="add-a-photo" size={30} color="#F5A623"/>
                                            </View>
                                            :
                                            <Image style={styles.avatar} source={this.state.profilePic}/>
                                        }
                                    </View>
                                </TouchableOpacity>

                            )
                    }
                })}
                <SubmitButton
                    onPress={this.submit.bind(this)}
                />

            </View>
        );
    }
};

FormBuilder.defaultProps = {
    keyboardType: 'default',
    style: {},
    placeholder: ''
};


