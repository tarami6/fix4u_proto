import React from 'react';
import {Text, StyleSheet} from 'react-native';

// Style
import {mainStyles} from "../../config/styles";

export default class TextUs extends React.Component {
    constructor(props){
        super(props)
  }
    render() {
        if (this.props.type == 'whiteTitle') {
            return (
                <Text style={[mainStyles.whiteTitle, this.props.style]}>
                    {this.props.children}
                </Text>
            )
        }else if(this.props.type == 'button'){
            return(
                <Text style={[mainStyles.button, this.props.style]}>
                    {this.props.children}
                </Text>
            )
        } else if(this.props.type == 'greyTitle'){
            return(
                <Text style={[mainStyles.greyTitle, this.props.style ]}>
                    {this.props.children}
                </Text>
            )
        }else if(this.props.type == 'greySmallNote'){
            return(
                <Text style={[mainStyles.greySmallNote, this.props.style ]}>
                    {this.props.children}
                </Text>
            )
        }
        else {
            return (
                <Text style={[mainStyles.p, this.props.style]}>
                    {this.props.children}
                </Text>
            )
        }

    }
}


