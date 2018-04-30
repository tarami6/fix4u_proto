import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
//config
import {sendReviewRoute} from "../../../../config/apiRoutes";
import {fetcher} from "../../../../generalFunc/fetcher";
//Styles and components:
import Header from '../../../../components/headers/Header';
import styles from './styles';


@inject("userDataStore")
@observer
export default class ConsumerReview extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    sendReview() {
        let route = sendReviewRoute(this.props.userDataStore.focusedJob.id);

        let headers = {
            token: this.props.userDataStore.userData.token
        };
        let body = {
            time_rating: 1,
            performance_rating: 1,
            price_rating: 1,
        };
        console.log('sentData:', route, 'POST', this.successCB.bind(this), this.errorCB, body, headers);
        fetcher(route, 'POST', this.successCB.bind(this), this.errorCB.bind(this), body, headers);
    }

    successCB(res){
        this.props.userDataStore.updatePost(res.post);
        console.warn('success cb at consumer Review:', res);
        console.log('success cb at consumer Review:', res);
    }

    errorCB(err){
        console.warn('error cb at consumer Review:', err);
        // console.log('error cb at consumer Review:', err);
    }

    render() {
        return (
            <View>
                <Header head={'Grey'} previousPage={'Home'} props={this.props}/>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View>
                    <TouchableOpacity onPress={this.sendReview.bind(this)}>
                        <View style={styles.jobContainer}>
                            <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                press to send dummy Data data review
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}