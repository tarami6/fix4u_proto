/**
 * AddJob loading screen
 * here we check if the user have an open job or not and navigate him through the addJob navigator accordingly while displaying "LoadingScreen"
 **/


import {inject, observer} from "mobx-react/native";
import React, {Component} from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import {fetcher} from "../../generalFunc/fetcher";
import {checkForOpenPost} from "../../config/apiRoutes";

@inject("navigationStore")
@inject("userDataStore")
@observer
export default class LoadingScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentWillMount(){
        this.props.userDataStore.findAndFocusConsumerJob();
    //    check for open posts made by the user
        fetcher(checkForOpenPost, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), {token: this.props.userDataStore.userData.token})
    }

    successCallback(res){
        if(res.length>0) {
            // res is the openPost
            // console.warn('succcess cb at addJob:', res[0].status)
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
            // console.warn('yuio')
        }
    }

    errorCallback(err){
        console.warn('error cb at addJob LoadingScreen:', err);
        console.log('error cb at addJob LoadingScreen:', err);
    }

    render(){
        return(
            <View>
                <Text>
                    loading your HomePage
                </Text>
            </View>
        )
    }
}