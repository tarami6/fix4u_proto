import React from 'react';
import {StyleSheet, Text, View, Platform, TouchableOpacity, Image} from 'react-native';
import HeaderConsumer from './components/HeadrConsumer';
import ArrowHeaderOrangeBackground from './ArrowHeaderOrangeBackground';
import CustomHeaderGrey from './CustomHeaderGrey';
import {inject} from "mobx-react/native";


@inject("navigationStore")
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head: this.props.head,
            previousPage: this.props.previousPage
        }
    }


    header = ( props) => {
        switch (props.head) {
            case 'consumerHome':
                return (<HeaderConsumer {...props}/>)
                break;
            case 'proHome':
                return (<HeaderConsumer userType={'pro'} background={'#FFBA00'} {...props}/>)
                break;

            case 'AddJob':
                return (<ArrowHeaderOrangeBackground {...props} />)
                break;
            case 'Grey':
                return (<CustomHeaderGrey {...props} />)
                break;
        }
    }


    render() {

        return (
            <View>
                {this.header(this.props)}
            </View>
        )
    }
}


