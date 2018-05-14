import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from 'react-native';
import {inject, observer} from "mobx-react/index";

@inject("userDataStore")
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
        let activeNotLength = this.props.userDataStore.currentUserType === 'pro'?
            this.props.notificationsStore.proNotifications.active.length:
            this.props.notificationsStore.consumerNotifications.active.length;
        if (activeNotLength === 0) {
            return (<View style={{position: 'absolute'}}/>)
        }
        return (
            <View style={styles.counter}>
                <View style={styles.textWraper}>
                    <Text style={{fontSize: 11, color: '#fd8724'}}>{activeNotLength}</Text>
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