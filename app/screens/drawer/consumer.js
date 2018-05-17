/* @flow */

import React, {Component} from 'react';
import {
    Alert,
    AsyncStorage,
    BackHandler,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {Icon, List, ListItem} from 'native-base';
import Text from '../../components/text/Text'
import LinearGradient from 'react-native-linear-gradient';
import Circle from '../../components/circle'
import {inject, observer} from "mobx-react/native";
import {logOutRoute} from "../../config/apiRoutes";
import {fetcher} from "../../generalFunc/fetcher";
import PlusIcon from 'react-native-vector-icons/Feather'
import {NavigationActions} from "react-navigation";


const {width, height} = Dimensions.get('window');
@inject("userDataStore")
@observer
export default class Consumer extends Component {

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        console.warn("Drawer consumer backHandler")
        this.props.navigation.navigate('DrawerClose');
        return true;
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
        this.props.navigation.navigate('DrawerClose');
        AsyncStorage.setItem('GetServiceUser', JSON.stringify(''
        ));
        // this.props.navigation.navigate('Intro');
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
        this.props.userDataStore.logout();
    }

    errorLogout(err) {
        console.warn('logout error:', err);
        console.log('logout error:', err);
        Alert.alert('there was a problem with the internet connection')
    }

    render() {
        return (
            <View>
                <LinearGradient
                    colors={['#fd8824', '#fdb82c']}
                    start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                    style={styles.container}>
                    <Navbar navigation={this.props.navigation} user={this.props.userDataStore.userData.user}/>
                </LinearGradient>
                <List>
                    <ListItem style={{justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <View style={{width, justifyContent: 'space-between',alignItems:'center', flexDirection: 'row'}}>
                            <View style={{marginLeft: 50}}>
                                <Circle qty={0}/>
                            </View>
                            <TouchableOpacity onPress={() => {
                                Alert.alert('בפיתוח... כאן יהיו כל חשבוניות שלך')
                            }}>
                                <Text style={{color: 'gray', fontWeight: 'bold'}}>חשבוניות שלי</Text>
                            </TouchableOpacity>
                        </View>
                    </ListItem>
                    <ListItem style={{borderWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('AccountSettings')
                        }}>
                            <Text style={{color: 'gray', fontWeight: 'bold'}}>הגדרות חשבון</Text>
                        </TouchableOpacity>
                    </ListItem>
                    <ListItem style={{borderWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('בפיתוח... כאן תוכל ליצור קשר עם תמיכה טכנית לכל שאלה')
                        }}>
                            <Text style={{color: 'gray', fontWeight: 'bold'}}>תמיכה טכנית</Text>
                        </TouchableOpacity>
                    </ListItem>

                    <ListItem style={{borderBottomWidth: 0, justifyContent: 'flex-end', paddingLeft: 0, marginLeft: 0}}>
                        <View>
                            <TouchableOpacity onPress={this.logout.bind(this)}>
                                <Text>
                                    התנתק
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
            <TouchableOpacity onPress={() => props.navigation.navigate('DrawerClose')}>
                <Icon name='ios-arrow-back-outline' style={{color: '#fff', fontSize: 30, margin: 20}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 20, right: 20, alignItems: 'center'}}>
                {props.user && props.user.name ?
                    <Text style={{
                        color: '#fff',
                        marginRight: 20
                    }}>{props.user.name}</Text> :
                    <TouchableOpacity>
                        <Text style={{color: '#ffffff', paddingRight: 10}}> הכנס פרטים</Text>
                    </TouchableOpacity>
                }
                {props.user && props.user.profile_pic_thumb ?
                    <Image
                        source={{uri: props.user.profile_pic_thumb}}
                        style={{height: 60, width: 60, borderRadius: 100}}/> :

                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <View style={{borderRadius: 200, backgroundColor: '#D8D8D8', padding: 15}}>
                             <PlusIcon name="plus" size={40} color={"#ffffff"}/>
                        </View>

                    </TouchableOpacity>
                }
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
