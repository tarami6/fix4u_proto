/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

const { width, height } = Dimensions.get('window')

export default class ChooseUserType extends Component {

  static navigationOptions = {
    header:null
  }

  navigate = (key) => {
    const {navigate} = this.props.navigation
    switch (key) {
      case 'Consumer':
        const actionToDispatch = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNavigation',
              action: NavigationActions.navigate({ routeName: 'B' }),
            })
          ],
        });
        this.props.navigation.dispatch(actionToDispatch);
        break;
      case 'Pro':
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
        <Text style={{fontWeight:'bold', margin:40}}>LOR</Text>
        <ConsumerButton navigate={this.navigate}/>
        <Text style={{fontWeight:'100', fontSize:12, color:'#9b9b9b', margin:40}}>LO</Text>
        <ProButton  navigate={this.navigate}/>
      </View>
    );
  }
}

const ConsumerButton = ({navigate}) => {
  return (
    <TouchableOpacity onPress={()=> navigate('Consumer')}>
      <LinierBackground >
        <Text style={{color:'#fff', fontWeight:'bold'}}>LOREM IPSUM DOLOR</Text>
      </LinierBackground>
    </TouchableOpacity>
  )
}

const ProButton = ({navigate}) => {
  return (
    <TouchableOpacity onPress={()=> navigate('Pro')}>
      <LinierBackground>
        <View style={{width: width - 122, height:46, borderRadius:30, margin:1, backgroundColor:'#fff', alignItems:'center', justifyContent:'center',paddingRight: 40, paddingLeft:40}}>
          <Text style={{color:'#fd8724', fontWeight:'bold'}}>LOREM IPSUM</Text>
        </View>
      </LinierBackground>
    </TouchableOpacity>
  )
}

const LinierBackground = (props) => {
  return (
    <LinearGradient
      colors={['#fd8824', '#fdb82c']}
      start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
      style={{height:48, width: width - 120, borderRadius:30, justifyContent:'center', alignItems:'center', paddingRight: 40, paddingLeft:40}}>
      {props.children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
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
