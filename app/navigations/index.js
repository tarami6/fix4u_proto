import {StackNavigator, DrawerNavigator} from 'react-navigation'
import React, {Component} from 'react'
import {Dimensions, Text} from 'react-native'

import CustomDrawer from '../components/customDrawer'
// Screens
import Intro from '../screens/intro'
import ChooseUserType from '../screens/choose_user_type'

//AddJobScreens:
//in LoadingScreen we check if the user have an open job or not and navigate hime through the addJob navigator accordingly
//while displaying "LoadingScreen"
import LoadingScreen from "../screens/loadingScreen/LoadingScreen";
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
//HomePage stuff:
import HomeNavigation from './HomeNavigation'
import ChooseJob from '../screens/chooseJob'

import {inject, observer} from "mobx-react/native";
//Schedule
import Schedule from "../screens/schedule";
//Active job
import ActiveJob from '../screens/activeJob'

const {width} = Dimensions.get('window')
//it is just example
// const A = (props) => (
//   <Icon
//     style={{position:'absolute', left:20, top:20}}
//     onPress={()=>props.navigation.navigate('DrawerOpen')} name="menu"/>)
const B = () => (<Text>screen choose as PRO</Text>)


const AddJobNavigation = StackNavigator({
    LoadingScreen: {
        screen: LoadingScreen
    },
    ChooseService: {
        screen: ChooseService,
        navigationOptions: ({navigation}) => {
            title: 'Choose Service'
        }
    },
    ChooseTime: {
        screen: ChooseTime,
        navigationOptions: ({navigation}) => {
            title: 'Choose Time'
        }
    },
    ExplainTheJob: {
        screen: ExplainTheJob,
        navigationOptions: ({navigation}) => {
            title: 'Explaing The Job'
        }
    },
    ChooseAddress: {
        screen: ChooseAddress,
        navigationOptions: ({navigation}) => {
            title: 'Choose Time'
        }
    },
    ApplyBaseScreen: {
        screen: ApplyBaseScreen,
        navigationOptions: ({navigation}) => {
            title: 'ApplyBaseScreen'
        }
    }
})



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
    AddJob: {
        screen: AddJobNavigation,
    },
}, {
    contentComponent: CustomDrawer,
    drawerWidth: width
})


//auth navigators:
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
    Schedule: {
        screen: Schedule
    },
    ActiveJob: {
        screen: ActiveJob
    }

}, {
    navigationOptions: {
        header: null
    }
})
