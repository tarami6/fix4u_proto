import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from 'react-native';
import {inject, observer} from "mobx-react/index";

@inject("notificationsStore")
@observer
export default class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {counter: 0}
    }
    componentDidMount(){
        if(this.props.notificationsStore.newNotification){
            this.setState({counter: 1})
        }
    }
    render() {
        const isIOS = Platform.OS == 'ios' ? {} : {top: 5}
        const orderCounter = 0
        if (this.state.counter == 0) {
            return (<View style={{position: 'absolute'}}/>)
        }
        return (
            <View style={[styles.counter, isIOS]}>
                <View style={styles.textWraper}>
                    <Text style={{fontSize: 11, color: '#fd8724'}}>{this.state.counter}</Text>
                </View>
            </View>
        )
    }
}
// export default Counter;

const styles = StyleSheet.create({


    counter: {
        position: 'absolute',
        right: 10,
        top: 30
    },
    textWraper: {
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fd8724'
    }
});