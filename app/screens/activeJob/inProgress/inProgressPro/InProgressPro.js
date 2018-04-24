import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View} from 'react-native';
//config
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
//mobx
import {inject, observer} from "mobx-react/index";
//Header imports:
import LinierView from '../../../../components/linierView';
import CustomHeaderAddJobStepsConsumer from '../../../../components/headers/CustomHeaderAddJobStepsConsumer';
//styles
import {HH} from "../../../../config/styles";
import styles from './styles'
import {chooseApplyRoute} from "../../../../config/apiRoutes";

@inject("userDataStore")
@observer
export default class InProgressPro extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    finishJob() {
        let route = startJobRoute(this.props.userDataStore.focusedJob.id);
        let sendObj = {
            status: 'pro_payment'
        };
        let headers = {
            'Accept': `application/json`,
            'content-type': 'application/json',
            'Authorization': 'JWT ' + this.props.userDataStore.userData.token
        };
        fetcher(route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    successCallback(res){
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
        console.warn('start job fetch success', res);
        console.log('start job fetch success', res);
    }

    errorCallback(err){
        console.warn('error', err);
        console.log('error:', err)
    }

    render() {
        return (
            <View>
                <LinierView style={{height: HH}}>
                    <CustomHeaderAddJobStepsConsumer props={this.props}/>
                </LinierView>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View>
                    <TouchableOpacity onPress={this.finishJob.bind(this)}>
                        <View style={styles.jobContainer}>
                            <Text style={{textAlign: 'center', justifyContent: 'center'}}>
                                press to finish job
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}