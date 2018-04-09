import { StackNavigator, DrawerNavigator } from 'react-navigation'
import React from 'react'
import { Dimensions } from 'react-native'
import { Text } from 'react-native'

import CustomDrawer from '../components/customDrawer'

import Intro from '../screens/intro'
import ChooseUserType from '../screens/choose_user_type'

const { width } = Dimensions.get('window')
//it is just example
const A = () => (<Text>screen choose as consumenr</Text>)
const B = () => (<Text>screen choose as PRO</Text>)

//all of screen who access drawer define on here
const DrawerNavigation = DrawerNavigator({
  A: {
      screen: A,
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
