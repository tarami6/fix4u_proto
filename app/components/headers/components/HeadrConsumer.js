import React, {Component} from 'react'
import {TouchableOpacity, Image, StyleSheet, View, Alert, Text} from 'react-native';
import Counter from './Counter';
import {HH, mainRed, PaddingSize, SH, SW} from "../../../config/styles";
import {inject, observer} from "mobx-react/index";

@inject("userDataStore")
@inject("notificationsStore")
@observer
export default class HeadrConsumer extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0}
    }

    render() {
        let props = this.props;
        let color = props.background;
        let numNotification = this.props.userDataStore.userType === "pro" ? (
            this.props.userDataStore.currentUserType === "consumer" ?
                this.props.notificationsStore.proNotifications.active.length +
                this.props.notificationsStore.proNotifications.open.length :
                this.props.notificationsStore.consumerNotifications.active.length +
                this.props.notificationsStore.consumerNotifications.open.length) : null
        return (

            <View style={[styles.customHeader, {backgroundColor: color}]}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('DrawerOpen')
                    props.navigation.setParams({
                        drawerOpen: true,
                    });

                }}
                >
                    <Image
                        style={{width: SW / 20, height: SW / 20}}
                        source={require('../../../../assets/icons/Menu.png')}/>


                </TouchableOpacity>
                {numNotification > 0 ?
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('DrawerOpen')
                        props.navigation.setParams({
                            drawerOpen: true,
                        });

                    }}
                                      pointerEvents="none"
                                      style={{
                                          position: 'absolute',
                                          left: SW / 30,
                                          top: SW / 30,
                                          height: 25,
                                          width: 25,
                                      }}>
                        <Text
                            pointerEvents="none"
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: 100,
                                borderWidth: 0.5,
                                borderColor: '#fff',
                                backgroundColor: mainRed,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: '#fff',
                            }}>
                            {numNotification}
                        </Text></TouchableOpacity> : null
                }
                <Image
                    style={{width: SW / 5.1, height: SH / 33, margin: 1, marginLeft: 10 + SW /30}}
                    source={require('../../../../assets/icons/fix4U.png')}/>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Schedule')}
                    style={{paddingLeft: SW / 30}}>
                    <Image
                        style={{width: SW / 15, height: SW / 15}}
                        source={require('../../../../assets/icons/noteMan.png')}/>
                    <Counter/>
                </TouchableOpacity>


            </View>
        )
    }
}

const HeaderConsumer = (props) => {

}

// export default HeaderConsumer;
const styles = StyleSheet.create({
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: HH,
        width: PaddingSize,
        alignSelf: 'center',
        alignItems: 'center'
    },


});