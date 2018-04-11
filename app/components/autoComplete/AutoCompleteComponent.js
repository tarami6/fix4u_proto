import React from 'react';
import {View, Text} from 'react-native';
import InputComponent from '../inputComponent';
export default class AutoCompleteComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {text: 'enter password'}
    }

    render(){
        return(
            <View>
                <InputComponent
                    style={{height: 40, borderColor: 'green', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    secureTextEntry={true}
                    value={this.state.text}
                />
            </View>

        )
    }
}