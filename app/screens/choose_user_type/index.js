/* @flow */

import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationActions} from 'react-navigation';
import {inject, observer} from 'mobx-react';
import authStore from '../../state-manager/mobx/authStore';
import {LinierBackground} from "../../config/styles";

const {width, height} = Dimensions.get('window')

@inject("authStore")
@observer
export default class ChooseUserType extends Component {
    static navigationOptions = {
        header: null
    }
    navigate = (key) => {
        const {navigate} = this.props.navigation
        switch (key) {
            case 'Consumer':
                this.props.authStore.changeNavigation('consumer');
                this.props.authStore.updateUser({type: 'consumer'});
                const actionToDispatch = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'DrawerNavigation',
                            action: NavigationActions.navigate({routeName: 'ChooseService'}),
                        })
                    ],
                });
                this.props.navigation.dispatch(actionToDispatch);
                break;
            case 'Pro':
                this.props.authStore.changeNavigation('pro');
                this.props.authStore.updateUser({type: 'pro'});
                alert('under development')
                // navigate("Form", {"title": "Form"})
                break;
            default:
                return
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', margin: 40}}>אני</Text>
                <ConsumerButton navigate={this.navigate}/>
                <Text style={{fontWeight: '100', fontSize: 12, color: '#9b9b9b', margin: 40}}>או</Text>
                <ProButton navigate={this.navigate}/>
            </View>
        );
    }
}

const
    ConsumerButton = ({navigate}) => {
        return (
            <TouchableOpacity onPress={() => navigate('Consumer')}>
                <LinierBackground>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>מחפש איש מקצוע</Text>
                </LinierBackground>
            </TouchableOpacity>
        )
    }

const
    ProButton = ({navigate}) => {
        return (
            <TouchableOpacity onPress={() => navigate('Pro')}>
                <LinierBackground>
                    <View style={{
                        width: width - 122,
                        height: 46,
                        borderRadius: 30,
                        margin: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: 40,
                        paddingLeft: 40
                    }}>
                        <Text style={{color: '#fd8724', fontWeight: 'bold'}}>נותן שירות</Text>
                    </View>
                </LinierBackground>
            </TouchableOpacity>
        )
    }


const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f6f6f6',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });


// /* @flow */
//
// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     StyleSheet,
//     Dimensions,
//     TouchableOpacity
// } from 'react-native';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
// import {observer, inject} from 'mobx-react/native'
// import { NavigationActions } from 'react-navigation';
//
// import authStore from "../../state-manager/mobx/authStore";
//
// const { width, height } = Dimensions.get('window')
// const sliderWidth = width
// const itemWidth = width
// //static image for development
// const images = [
//     {uri:require('../../../assets/chooseUserType/choose_mode.png')}
// ]
//
//
// @inject("authStore")
// @observer
// export default class ChooseUserType extends Component {
//
//     state = {
//         activeSlide : 0
//     }
//
//     componentDidMount(){
//
//     }
//
//     handlePress = () => {
//       // this.props.authStore.chooseUserType('consumer')
//       const actionToDispatch = NavigationActions.reset({
//         index: 0,
//         key: null,
//         actions: [
//           NavigationActions.navigate({
//             routeName: 'DrawerNavigation',
//             action: NavigationActions.navigate({ routeName: 'B' }),
//           })
//         ],
//       });
//       this.props.navigation.dispatch(actionToDispatch);
//     }
//
//     render() {
//         return (
//             <View style={styles.containerItem}>
//                 <TouchableOpacity onPress={this.handlePress}>
//                 <Image style={{width, height: height - 150}} resizeMode="cover"
//                        source={images[0].uri}/>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     containerItem: {
//         width,
//         height: height,
//         // borderWidth:1,
//         // justifyContent:'center',
//         // alignItems:'center'
//     },
//     footer: {
//         position: 'absolute',
//         bottom: 30,
//         width,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     textFooter : {
//         color :'#fff'
//     }
// });
