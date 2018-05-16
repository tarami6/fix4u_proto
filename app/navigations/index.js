import {StackNavigator, DrawerNavigator} from 'react-navigation'
import React, {Component} from 'react'
import {Dimensions, Text} from 'react-native'

import CustomDrawer from '../components/customDrawer'
// Screens
import ChoosePro from '../screens/jobApplyConsumer/screens/ChoosePro';
import Intro from '../screens/intro';
import ChooseUserType from '../screens/choose_user_type';

//AddJobScreens:
//in LoadingScreen we check if the user have an open job or not and navigate hime through the addJob navigator accordingly
//while displaying "LoadingScreen"
import LoadingScreen from "../screens/loadingScreen/LoadingScreen";
import ChooseService from '../screens/addJob/addJobSteps'
import ChooseAddress from '../screens/addJob/addJobSteps/ChooseAddress';
import ChooseTime from '../screens/addJob/addJobSteps/ChooseTime';
import ExplainTheJob from '../screens/addJob/addJobSteps/ExplainTheJob';
//open job handling:
import ApplyBaseScreen from '../screens/jobApplyConsumer/screens/ApplyBaseScreenConsumer';
import ActionToNoApply from '../screens/jobApplyConsumer/screens/ActionToNoApply';
import ProsListToConnect from '../screens/jobApplyConsumer/screens/ProsListToConnect';
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
import ActiveJob from '../screens/activeJob';
// Drawer
import AccountSettings from '../screens/drawer/screens/AccountSettings'


const {width} = Dimensions.get('window')


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
            title: 'Choose Address'
        }
    },

})
// for consumer mode picking the pro
const ChooseApplyNavigator = StackNavigator({
    ApplyBaseScreen: {
        screen: ApplyBaseScreen,
        navigationOptions: ({navigation}) => {
            title: 'ApplyBaseScreen'
        }
    },
    ChoosePro: {
        screen: ChoosePro
    }
})

//stack navigator for 5 minutes after job has posted to reavluate post
const NoAppliesNavigator = StackNavigator({
    ActionToNoApply: {
        screen: ActionToNoApply,
    },
    ProsListToConnect: {
        screen: ProsListToConnect
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
    ApplyBaseScreen: {
        screen: ChooseApplyNavigator
    },
    NoAppliesNavigator: {
        screen: NoAppliesNavigator
    },
    AccountSettings: {
        screen: AccountSettings
    }
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
    ApplyBaseScreen: {
        screen: ChooseApplyNavigator
    },
    NoAppliesNavigator: {
        screen: NoAppliesNavigator
    }
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
    },

}, {
    navigationOptions: {
        header: null
    }
})
