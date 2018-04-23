import {StackNavigator, DrawerNavigator} from 'react-navigation'
import React, {Component} from 'react'
import {Dimensions, Text} from 'react-native'

import CustomDrawer from '../components/customDrawer'
// Screens
import Intro from '../screens/intro'
import ChooseUserType from '../screens/choose_user_type'

//AddJobScreens:
import ChooseService from '../screens/addJob/addJobSteps'
import ChooseAddress from '../screens/addJob/addJobRamiScreens/screens/ChooseAddress';
import ChooseTime from '../screens/addJob/addJobRamiScreens/screens/ChooseTime';
import ExplainTheJob from '../screens/addJob/addJobRamiScreens/screens/ExplainTheJob';
<<<<<<< HEAD
import ApplyBaseScreen from '../screens/jobApplyConsumer/screens/ApplyBaseScreenConsumer'
=======
import ApplyBaseScreen from '../screens/addJob/addJobRamiScreens/screens/ApplyBaseScreen'
>>>>>>> 17f05babf85cb22ace75dc4a6fe5bbc6cbd37aa8
//Pro Registration imports:
import PersonalInfo from '../screens/registrationPro/screens/PersonalInfo'
import AddressInfo from "../screens/registrationPro/screens/AddressInfo";
import ChoosingService from '../screens/registrationPro/screens/ChoosingService';
import ExplainThePro from "../screens/registrationPro/screens/ExplainThePro";
import DataConfirmPro from "../screens/registrationPro/screens/DataConfirmPro";
//general auth screens:
import PhoneInput from '../screens/generalAuth/phoneInput';
import PhoneVerify from '../screens/generalAuth/phoneVerify';
//HomePage stuff:
import HomeNavigation from './HomeNavigation'
import ChooseJob from '../screens/chooseJob'

import {inject, observer} from "mobx-react/native";

const {width} = Dimensions.get('window')
//it is just example
// const A = (props) => (
//   <Icon
//     style={{position:'absolute', left:20, top:20}}
//     onPress={()=>props.navigation.navigate('DrawerOpen')} name="menu"/>)
const B = () => (<Text>screen choose as PRO</Text>)


const AddJobNavigation = StackNavigator({
    ChooseService: {
        screen: ChooseService
    },
    ChooseTime: {
        screen: ChooseTime
    },
    ExplainTheJob: {
        screen: ExplainTheJob
    },
    ChooseAddress: {
        screen: ChooseAddress
    },
    ApplyBaseScreen: {
        screen: ApplyBaseScreen
    }
})

<<<<<<< HEAD
const AuctionJobConsumer = StackNavigator({
    ApplyBaseScreen: {
        screen: ApplyBaseScreen
    },
})

=======
//main drawer navigators : (after auth )

const ProNavigator = DrawerNavigator({
    Home: {
        screen: ChooseJob,
    },
    AddJob: {
        screen: AddJobNavigation,
    },
}, {
    contentComponent: CustomDrawer,
    drawerWidth: width
})

const ConsumerNavigator = DrawerNavigator({
    Home: {
        screen: AddJobNavigation,
    },
    B: {
        screen: B,
    },
}, {
    contentComponent: CustomDrawer,
    drawerWidth: width
})

//auth navigators:
>>>>>>> 17f05babf85cb22ace75dc4a6fe5bbc6cbd37aa8

const ProRegistrationNavigator = StackNavigator({
    PersonalInfo: {
        screen: PersonalInfo
    },
    AddressInfo: {
        screen: AddressInfo
    },
    ChoosingService: {
        screen: ChoosingService
    },
    ExplainThePro: {
        screen: ExplainThePro
    },
    DataConfirmPro: {
        screen: DataConfirmPro
    }
})



// //all screen dont access drawer
// const IntroNavigation = StackNavigator({}, {
//     navigationOptions: {
//         header: null
//     }
// })

//general authentication at app start with phone input and verify code
const GeneralAuth = StackNavigator({
    PhoneInput: {
        screen: PhoneInput
    },
    PhoneVerify: {
        screen: PhoneVerify
    }
})

export default AppNavigation = StackNavigator({
    Intro: {
        screen: Intro
    },
    GeneralAuth: {
        screen: GeneralAuth
    },
    ChooseUserType: {
        screen: ChooseUserType
    },
    ProRegistrationNavigator: {
        screen: ProRegistrationNavigator
    },
    ProNavigator: {
        screen: ProNavigator
    },
    ConsumerNavigator: {
        screen: ConsumerNavigator
    },
    AuctionJobConsumer:{
        screen: AuctionJobConsumer
    }
}, {
    navigationOptions: {
        header: null
    }
})
