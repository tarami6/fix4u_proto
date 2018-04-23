/* @flow */

import React, {Component} from 'react';
import {
    View,
    Platform,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {Content, List, ListItem, Text, Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Circle from '../../components/circle'
import {inject, observer} from "mobx-react/native";


const {width, height} = Dimensions.get('window')

@inject("userDataStore")
@observer
export default class Pro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDrawer: 'pro',
        }
    }

    handleSwitch(switchTo){
        this.setState({
            currentDrawer: switchTo
        })
        if(switchTo==='pro') {
            this.props.navigation.navigate('Home')
        }
        else {
            this.props.navigation.navigate('AddJob')
        }
    }

    logout() {
        console.warn(this.props.navigation);
        AsyncStorage.setItem('GetServiceUser', JSON.stringify(''
        ));
        this.props.userDataStore.logout()
        this.props.navigation.navigate('Intro');
    }

    render() {
        if(this.state.currentDrawer==='pro') {
            ////////// PRO MODE //////////
            return (
                <View>
                    <LinearGradient
                        colors={['#fd8824', '#fdb82c']}
                        start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                        style={styles.container}>
                        <Navbar/>
                    </LinearGradient>
                    <List>
                        <ListItem style={{justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                            <View style={{width, justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{marginLeft: 50}}>
                                    <Circle qty={22}/>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{color: 'gray', fontWeight: 'bold'}}>Simon Mignoletss</Text>
                                </TouchableOpacity>
                            </View>
                        </ListItem>
                        {/*Switch drawer type consumer/pro*/}
                        <ListItem style={{borderWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                            <TouchableOpacity onPress={()=>this.handleSwitch('consumer')}>
                                <Text style={{color: 'gray', fontWeight: 'bold'}}>Switch to Consumer mode</Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem
                            style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                            <Text style={{color: 'gray', fontWeight: 'bold'}}>Simon</Text>
                        </ListItem>
                        <ListItem
                            style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
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
        else {
        //    ///////// CONSUMER MODE ///////////
            return (
                <View>
                    <LinearGradient
                        colors={['#fd8824', '#fdb82c']}
                        start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                        style={styles.container}>
                        <Navbar/>
                    </LinearGradient>
                    <List>
                        <ListItem style={{justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                            <View style={{width, justifyContent: 'space-between', flexDirection: 'row'}}>
                                <View style={{marginLeft: 50}}>
                                    <Circle qty={22}/>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{color: 'gray', fontWeight: 'bold'}}>Simon Mignoletss</Text>
                                </TouchableOpacity>
                            </View>
                        </ListItem>
                        {/*Switch drawer type consumer/pro*/}
                        <ListItem style={{borderWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                            <TouchableOpacity onPress={()=>this.handleSwitch('pro')}>
                                <Text style={{color: 'gray', fontWeight: 'bold'}}>Switch to pro mode</Text>
                            </TouchableOpacity>
                        </ListItem>
                        <ListItem
                            style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                            <Text style={{color: 'gray', fontWeight: 'bold'}}>Simon</Text>
                        </ListItem>
                        <ListItem
                            style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
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
            )
        }
    }
}

const Navbar = () => {
    return (
        <View style={{width, height: Platform.OS == 'ios' ? 150 : 135,}}>
            <Icon name='ios-arrow-back-outline' style={{color: '#fff', fontSize: 30, margin: 20}}/>
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
