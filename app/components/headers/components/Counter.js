import React, {Component} from "react";
import {Platform, StyleSheet, Text, View} from 'react-native';
import {inject, observer} from "mobx-react/index";
import {SW} from "../../../config/styles";

@inject("userDataStore")
@inject("notificationsStore")
@observer
export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0}
    }

    componentDidMount() {
        if (this.props.notificationsStore.newNotification) {
            this.setState({counter: 1})
        }
    }

    render() {
        let activeNotLength = this.props.userDataStore.currentUserType === 'pro' ?
            this.props.notificationsStore.proNotifications.active.length :
            this.props.notificationsStore.consumerNotifications.active.length;
        console.log('activeNotLength', activeNotLength);
        // if (activeNotLength === 0) {
        //     return (<View style={{position: 'absolute'}}/>)
        // }
        if(activeNotLength > 0){
        return (

            <View style={styles.counter}>
                <View style={styles.textWraper}>
                    <Text style={{fontSize: 11, color: '#fd8724'}}>{activeNotLength}</Text>
                </View>
            </View>

        )
        } else {
            return (<View/>)
        }
    }
}
// export default Counter;

const styles = StyleSheet.create({


    counter: {
        position: 'absolute',
        right: SW /30,
        top: 0
    },
    textWraper: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderColor: '#fd8724',
        alignItems: 'center',
        justifyContent: 'center'
    }
});