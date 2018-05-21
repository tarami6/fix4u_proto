/* @flow */

import React, {Component} from 'react';
import {Alert, AsyncStorage, Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../../components/text/Text'
import LinearGradient from 'react-native-linear-gradient';
import Circle from '../../components/circle'
import {inject, observer} from "mobx-react/native";
import ArrowIcon from 'react-native-vector-icons/Ionicons';
import {SH, SW, Pad} from "../../config/styles";
//func and config
import {fetcher} from "../../generalFunc/fetcher";
import {logOutRoute} from "../../config/apiRoutes";
import {NavigationActions} from "react-navigation";

import Cicons from '../../components/customIcons/CustomIcons'

const {width, height} = Dimensions.get('window')


@inject("notificationsStore")
@inject("userDataStore")
@observer
export default class Pro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDrawer: 'pro',
        }
    }

    // componentDidMount(){
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }
    //
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }
    //
    // handleBackButton = () => {
    //     this.props.navigation.navigate('DrawerClose');
    //     return true;
    // }


    //switchTo is the new current user type for the pro, changes mobx state as well (changes currentUserType)
    handleSwitch(switchTo) {
        console.log('handleSwitch drawer pro:', switchTo, this.props.userDataStore)
        this.props.userDataStore.setCurrentUserType(switchTo)
        this.setState({
            currentDrawer: switchTo
        })
        if (switchTo === 'pro') {
            this.props.navigation.navigate('Home')
        }
        else {
            this.props.navigation.navigate('AddJob')
        }
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
        this.props.userDataStore.logout();
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Intro',
                })
            ],
        });
        this.props.navigation.dispatch(actionToDispatch)
    }

    errorLogout(err) {
        console.warn('logout error:', err);
        console.log('logout error:', err);
        Alert.alert('there was a problem with the internet connection')
    }

    render() {
        if (!this.props.userDataStore.userData.user) {
            console.log('err in drawer pro, this.props.userDataStore.userData=', this.props.userDataStore.userData)
            return (
                <View>
                    <Text>
                        no store data in drawer pro
                    </Text>
                </View>
            )
        }

        if (this.props.userDataStore.currentUserType === 'pro') {
            let consumerNotificationsLength = this.props.notificationsStore.consumerNotifications.active.length +
                this.props.notificationsStore.consumerNotifications.open.length;
            ////////// PRO MODE //////////
            return (
                <View style={{flex: 1}}>
                    <LinearGradient
                        colors={['#fd8824', '#fdb82c']}
                        start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                        style={styles.container}>
                        {console.log('DRAWERPRO', this.props.userDataStore.userData.user)}
                        <Navbar name={this.props.userDataStore.userData.user.name}
                                pic={this.props.userDataStore.userData.user.profile_pic_thumb}
                                navigation={this.props.navigation}/>
                    </LinearGradient>
                    <View style={{flex: 1}}>
                        {/*Switch drawer type consumer/pro*/}
                        <TouchableOpacity
                            onPress={() => this.handleSwitch('consumer')}
                            style={styles.listItem}>
                            <View style={{
                                width,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View style={styles.notificationCircle}>
                                    <Circle qty={consumerNotificationsLength}/>
                                </View>
                                <View>
                                    <Text style={styles.textList}>החלף למצב לקוח</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            Alert.alert('בפיתוח... כאן יהיו כל חשבוניות שלך')
                        }}
                                          style={styles.listItem}>
                            <View style={{
                                width,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View style={styles.notificationCircle}>
                                    <Circle qty={0}/>
                                </View>
                                <View>
                                    <Text style={styles.textList}>חשבוניות שלי</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('AccountSettings')
                            }}
                            style={styles.listItem}>
                            <View>
                                <Text style={styles.textList}>הגדרות חשבון</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('בפיתוח... כאן תוכל ליצור קשר עם תמיכה טכנית לכל שאלה')
                            }}
                            style={styles.listItem}>
                            <View>
                                <Text style={styles.textList}>תמיכה טכנית</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.logout.bind(this)}
                            style={styles.listItem}>
                            <View>
                                <Text style={styles.textList}>
                                    התנתק
                                </Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
            );
        }
        else {
            let proNotificationsLength = this.props.notificationsStore.proNotifications.active.length +
                this.props.notificationsStore.proNotifications.open.length;
            //    ///////// CONSUMER MODE ///////////
            return (
                <View style={{flex: 1}}>
                    <LinearGradient
                        colors={['#fd8824', '#fdb82c']}
                        start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                        style={styles.container}>
                        <Navbar name={this.props.userDataStore.userData.user.name}
                                navigation={this.props.navigation}
                                pic={this.props.userDataStore.userData.user.profile_pic_thumb}
                        />
                    </LinearGradient>
                    <View style={{flex: 1}}>
                        {/*Switch drawer type consumer/pro*/}
                        <TouchableOpacity
                            onPress={() => this.handleSwitch('pro')}
                            style={styles.listItem}>
                            <View style={{
                                width,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View style={styles.notificationCircle}>
                                    <Circle qty={proNotificationsLength}/>
                                </View>
                                <View>
                                    <Text style={styles.textList}>החלף למצב איש מקצוע</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert('בפיתוח... כאן יהיו כל חשבוניות שלך')
                            }}
                            style={styles.listItem}>
                            <View style={{
                                width,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View style={styles.notificationCircle}>
                                    <Circle qty={0}/>
                                </View>
                                <View>
                                    <Text style={styles.textList}>חשבוניות שלי</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() => {
                                this.props.navigation.navigate('AccountSettings');
                            }}>
                            <Text style={styles.textList}> הגדרות חשבון</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.listItem} onPress={() => {
                            Alert.alert('בפיתוח... כאן תוכל ליצור קשר עם תמיכה טכנית לכל שאלה')
                        }}>
                            <Text style={styles.textList}>תמיכה טכנית</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.logout.bind(this)}
                            style={styles.listItem}>
                            <View>
                                <Text style={styles.textList}>
                                    התנתק
                                </Text>
                            </View>

                        </TouchableOpacity>


                    </View>
                </View>
            )
        }
    }
}

const Navbar = (props) => {
    return (
        <View style={{width, height: Platform.OS == 'ios' ? 150 : 135,}}>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('DrawerClose')
                props.navigation.setParams({
                    drawerOpen: false,
                })
            }
            }>
                <View style={{ margin: 20}}>
                    <Cicons name={"back"} size={25} color={"#fff"}/>
                </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 20, right: 20, alignItems: 'center'}}>
                <Text style={{color: '#fff', marginRight: 20}}>{props.name}</Text>
                <Image
                    source={{uri: props.pic}}
                    style={{height: 60, width: 60, borderRadius: 30}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS == 'ios' ? 150 : 135,
        width
    },
    listItem: {
        borderBottomWidth: 0.5,
        width: SW,
        height: SH / 10,
        justifyContent: 'center',
        paddingLeft: 0,
        marginLeft: 0,
    },
    notificationCircle: {
        marginLeft: Pad,
    },
    textList: {
        paddingRight: Pad,
    },
});
