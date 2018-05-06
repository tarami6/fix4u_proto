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
export default class OnTheWayPro extends Component {
    constructor(props) {
        super(props)
    }

    getPaid() {
        // console.warn(this.props.userDataStore.focusedJob);
    }

    successCallback(res){
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
        // console.warn('get paid fetch success', res);
        // console.log('start job fetch success', res);
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
                    <TouchableOpacity onPress={this.getPaid.bind(this)}>
                        <View style={styles.jobContainer}>
                            <Text style={{textAlign: 'center', justifyContent: 'center'}}>
                                now the pro is waiting to get paid
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}