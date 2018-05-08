/**
 * AddJob loading screen
 * here we check if the user have an open job or not and navigate him through the addJob navigator accordingly while displaying "LoadingScreen"
 **/

/**
 * this is AddJob loading screen, here it check if the user have open job, and if he does it navigates to this openJob page
 **/

import {inject, observer} from "mobx-react/native";
import React, {Component} from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import {fetcher} from "../../generalFunc/fetcher";
import {checkForOpenPost} from "../../config/apiRoutes";
//component import:
import LoadinPage from '../../screens/modals/Loader/LoadingPage';


@inject("navigationStore")
@inject("userDataStore")
@observer
export default class LoadingScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentWillMount(){
        // this.props.userDataStore.setLoading(true);
        this.props.userDataStore.findAndFocusConsumerJob();
    //    check for open posts made by the user
        fetcher(checkForOpenPost, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), {token: this.props.userDataStore.userData.token})
    }

    successCallback(res){
        // this.props.userDataStore.setLoading(false);
        if(res.length>0) {
            // res is the openPost
            //case job is open
            if(res[0].status==='open') {
                this.props.navigation.navigate('ApplyBaseScreen');
            }
            //job is no open so home is AddJob
            else {
                this.props.navigation.navigate('ChooseService');
            }
        }
        else{
            this.props.navigation.navigate('ChooseService');
        }
    }

    errorCallback(err){
        // this.props.userDataStore.setLoading(false);
        this.props.navigation.navigate('Home');
        console.warn('error cb at addJob LoadingScreen:', err);
        console.log('error cb at addJob LoadingScreen:', err);
    }

    render(){
        return(
            <LoadinPage />
        )
    }
}