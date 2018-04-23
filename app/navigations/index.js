import {StackNavigator, DrawerNavigator} from 'react-navigation'
import React from 'react'
import {Dimensions, Text} from 'react-native'

import CustomDrawer from '../components/customDrawer'
// Screens
import Intro from '../screens/intro'
import ChooseUserType from '../screens/choose_user_type'
import ChooseService from '../screens/addJob/addJobSteps'
import ChooseAddress from '../screens/addJob/addJobRamiScreens/screens/ChooseAddress';
import ChooseTime from '../screens/addJob/addJobRamiScreens/screens/ChooseTime';
import ExplainTheJob from '../screens/addJob/addJobRamiScreens/screens/ExplainTheJob';
import ApplyBaseScreen from '../screens/jobApplyConsumer/screens/ApplyBaseScreenConsumer'
//Pro Registration imports:
import PersonalInfo from '../screens/registrationPro/screens/PersonalInfo'
import AddressInfo from "../screens/registrationPro/screens/AddressInfo";
import ChoosingService from '../screens/registrationPro/screens/ChoosingService';
import ExplainThePro from "../screens/registrationPro/screens/ExplainThePro";
import DataConfirmPro from "../screens/registrationPro/screens/DataConfirmPro";
//general auth screens:
import PhoneInput from '../screens/generalAuth/phoneInput';
import PhoneVerify from '../screens/generalAuth/phoneVerify';

const {width} = Dimensions.get('window')
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
    ChooseTime: {
        screen: ChooseTime
    },
    ExplainTheJob: {
        screen: ExplainTheJob
    },
    ChooseAddress: {
        screen: ChooseAddress
    },
})

const AuctionJobConsumer = StackNavigator({
    ApplyBaseScreen: {
        screen: ApplyBaseScreen
    },
})


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

//all of screen who access drawer define on here
const DrawerNavigation = DrawerNavigator({
    Home: {
        screen: HomeNavigation,
    },
    B: {
        screen: B,
    },
}, {
    contentComponent: CustomDrawer,
    drawerWidth: width
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
    DrawerNavigation: {
        screen: DrawerNavigation
    },
    AuctionJobConsumer:{
        screen: AuctionJobConsumer
    }
}, {
    navigationOptions: {
        header: null
    }
})
