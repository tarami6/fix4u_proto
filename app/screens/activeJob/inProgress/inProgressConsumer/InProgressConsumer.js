import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
//Header imports:
import LinierView from '../../../../components/linierView';
import CustomHeaderAddJobStepsConsumer from '../../../../components/headers/CustomHeaderAddJobStepsConsumer';
//styles
import {HH} from "../../../../config/styles";
import styles from './styles'

@inject("userDataStore")
@observer
export default class InProgressConsumer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    startJob() {
        Alert.alert('job started maybe');
    }

    render() {
        return (
            <View>
                <LinierView style={{height: HH}}>
                    <CustomHeaderAddJobStepsConsumer props={this.props}/>
                </LinierView>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View>
                    <TouchableOpacity onPress={this.startJob.bind(this)}>
                        <View style={styles.jobContainer}>
                            <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                                job is in progress
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}