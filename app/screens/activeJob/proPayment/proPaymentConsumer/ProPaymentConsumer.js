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

let i = 0

@inject("userDataStore")
@observer
export default class ProPaymentConsumer extends Component {
    constructor(props) {
        super(props)
    }

    startJob() {
        if(i===0) {
            Alert.alert('wait bro wait..');
        }
        else if(i===1) {
            Alert.alert('You dont listen now do you?');
        }
        else {
            Alert.alert('fucker');
        }
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
                                as a consumer you are here only to look at this text,
                                and wait for the pro to start the job
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}