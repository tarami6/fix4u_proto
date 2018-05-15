/**
 * AddJob loading screen
 * here we check if the user have an open job or not and navigate him through the addJob navigator accordingly while displaying "LoadingScreen"
 **/

/**
 * this is AddJob loading screen, here it check if the user have open job, and if he does it navigates to this openJob page
 **/

import {inject, observer} from "mobx-react/native";
import React, {Component} from "react";
//component import:
import LoadinPage from '../../screens/modals/Loader/LoadingPage';


@inject("navigationStore")
@inject("userDataStore")
@observer
export default class LoadingScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        // this.props.userDataStore.setLoading(true);
        this.props.userDataStore.findAndFocusConsumerJob();
        //    check for open posts made by the user
        this.checkOpenPostsStatAndNavigateConsumer();

        // fetcher(checkForOpenPost, 'GET', this.successCallback.bind(this), this.errorCallback.bind(this), {token: this.props.userDataStore.userData.token})
    }

    checkOpenPostsStatAndNavigateConsumer() {
        if (this.props.userDataStore.userData.user.user_open_posts.length > 0) {
            let open_post = this.props.userDataStore.userData.user.user_open_posts[0];
            // res is the openPost
            //case job is open
            if (open_post.status === 'open' || open_post.status === 'pending') {
                this.props.navigation.navigate('ApplyBaseScreen');
            }
            //job is no open so home is AddJob
            else {
                this.props.navigation.navigate('ChooseService');
            }
        }
        else {
            this.props.navigation.navigate('ChooseService');
        }
    }

    // successCallback(res){
    //     // this.props.userDataStore.setLoading(false);
    //     if(res.length>0) {
    //         // res is the openPost
    //         //case job is open
    //         if(res[0].status==='open' || res[0].status==='pending') {
    //             this.props.navigation.navigate('ApplyBaseScreen');
    //         }
    //         //job is no open so home is AddJob
    //         else {
    //             this.props.navigation.navigate('ChooseService');
    //         }
    //     }
    //     else{
    //         this.props.navigation.navigate('ChooseService');
    //     }
    // }
    //
    // errorCallback(err){
    //     // this.props.userDataStore.setLoading(false);
    //     this.props.navigation.navigate('Home');
    //     console.warn('error cb at addJob LoadingScreen:', err);
    //     console.log('error cb at addJob LoadingScreen:', err);
    // }

    render() {
        return (
            <LoadinPage/>
        )
    }
}