/* @flow */

import React, {Component} from 'react';
import {
    View,
    Platform,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import {Content, List, ListItem, Text, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Circle from '../../components/circle'
import {inject, observer} from "mobx-react/native";
import {logOutRoute} from "../../config/apiRoutes";
import {fetcher} from "../../generalFunc/fetcher";




const {width, height} = Dimensions.get('window')

@inject("authStore")
@observer
export default class Consumer extends Component {
    changeToPro() {
        this.props.authStore.changeNavigation('pro');
    }


    logout() {
        fetcher(logOutRoute, 'PATCH', this.successLogout.bind(this), this.errorLogout.bind(this), {push_token: ""}, {token: this.props.userDataStore.userData.token})
        // console.warn(this.props.navigation);
        // AsyncStorage.setItem('GetServiceUser', JSON.stringify(''
        // ));
        // this.props.userDataStore.logout()
        // this.props.navigation.navigate('Intro');
    }

    successLogout(res) {
        AsyncStorage.setItem('GetServiceUser', JSON.stringify(''
        ));
        this.props.userDataStore.logout()
        this.props.navigation.navigate('Intro');
        console.warn('success cb at logout:', res);
    }

    errorLogout(err) {
        console.warn('logout error:', err);
        console.log('logout error:', err);
        Alert.alert('there was a problem with the internet connection')
    }

    render() {
        console.log('drawer1', this.props.authStore)
        return (
            <View>
                <LinearGradient
                    colors={['#fd8824', '#fdb82c']}
                    start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                    style={styles.container}>
                    <Navbar navigation={this.props.navigation}/>
                </LinearGradient>
                <List>
                    <ListItem style={{justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <View style={{width, justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{marginLeft: 50}}>
                                <Circle qty={22}/>
                            </View>
                            <TouchableOpacity>
                                <Text style={{color: 'gray', fontWeight: 'bold'}}>Simon Mignoletss2</Text>
                            </TouchableOpacity>
                        </View>
                    </ListItem>
                    <ListItem style={{borderWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}
                              onPress={this.changeToPro.bind(this)}>
                        <Text style={{color: 'gray', fontWeight: 'bold'}}>Mignoletss</Text>
                    </ListItem>
                    <ListItem style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <Text style={{color: 'gray', fontWeight: 'bold'}}>Simon</Text>
                    </ListItem>
                    <ListItem style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <View>
                            <TouchableOpacity onPress={this.logout.bind(this)}>
                                <Text>
                                    LogOut
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ListItem>

                </List>
            </View>
        );
    }
}

const Navbar = (props) => {
    return (
        <View style={{width, height: Platform.OS == 'ios' ? 150 : 135,}}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('DrawerClose')}>
            <Icon name='ios-arrow-back-outline' style={{color: '#fff', fontSize: 30, margin: 20}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 20, right: 20, alignItems: 'center'}}>
                <Text style={{color: '#fff', marginRight: 20}}>asdasd</Text>
                <Image
                    source={require('../../../assets/drawer/icon-user.png')}
                    style={{height: 60, width: 60}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS == 'ios' ? 150 : 135,
        width
    }
});
