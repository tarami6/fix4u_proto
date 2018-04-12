//this component is mainly for the auth part
import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

export default class InputComponent1 extends React.Component {
    focus(){
        this.input.focus();
    }
    render(){
        return (
                <TextInput
                    ref={component => this.input = component}
                    style={[styles.inputButtonStyle, this.props.style]}
                    keyboardType={this.props.keyboardType}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    onSubmitEditing={this.props.onSubmitEditing}
                />
        );
    }
};

InputComponent1.defaultProps = {
    keyboardType: 'default',
    style: {},
    placeholder: '',
    secureTextEntry: false,
    onSubmitEditing: (some='some')=>{
        console.warn('no onSubmitEditing was supllied to this input tho should!');
    }
};


