import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {LinierBackground} from "../config/styles";

export const
    submitButton = (title, onPress) => {
        return (
            <TouchableOpacity onPress={()=>onPress()}>
                <LinierBackground>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>{title}</Text>
                </LinierBackground>
            </TouchableOpacity>
        )
    }