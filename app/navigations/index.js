import { StackNavigator, DrawerNavigator } from 'react-navigation'
import React from 'react'
import { Dimensions, Text } from 'react-native'

import { Icon } from 'native-base'

import CustomDrawer from '../components/customDrawer'

import Intro from '../screens/intro'
import ChooseUserType from '../screens/choose_user_type'
import ChooseService from '../screens/addJob/addJobSteps'
import ChooseAddress from '../screens/addJob/addJobRamiScreens/screens/ChooseAddress';
import ChooseTime from '../screens/addJob/addJobRamiScreens/screens/ChooseTime';
import ExplainTheJob from '../screens/addJob/addJobRamiScreens/screens/ExplainTheJob'
const { width } = Dimensions.get('window')
//it is just example
// const A = (props) => (
//   <Icon
//     style={{position:'absolute', left:20, top:20}}
//     onPress={()=>props.navigation.navigate('DrawerOpen')} name="menu"/>)
const B = () => (<Text>screen choose as PRO</Text>)


const HomeNavigation = StackNavigator({
    ChooseService: {
        screen: ChooseService
    },
    ChooseAddress: {
      screen: ChooseAddress
    },
    ChooseTime: {
      screen: ChooseTime
    },
    ExplainTheJob: {
      screen: ExplainTheJob
    }

})


//all of screen who access drawer define on here
const DrawerNavigation = DrawerNavigator({
  ChooseService: {
      screen: HomeNavigation,
    },
  B: {
    screen: B,
  },
},{
  contentComponent: CustomDrawer,
  drawerWidth : width
})


//all screen dont access drawer
const IntroNavigation = StackNavigator({
  Intro : {
    screen : Intro
  },
  ChooseUserType : {
    screen : ChooseUserType
  },
},{
  navigationOptions : {
    header:null
  }
})

export default AppNavigation = StackNavigator({
  IntroNavigation : {
    screen : IntroNavigation
  },
  DrawerNavigation : {
    screen : DrawerNavigation
  }
},{
  navigationOptions : {
    header:null
  }
})
