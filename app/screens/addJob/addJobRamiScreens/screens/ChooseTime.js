import React from 'react';
import {View, Text, Image,} from 'react-native';

import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderConsumer';
import {submitButton} from "../../../../components/modalSubmitButton";
import CustomHeaderAddJob from '../components/CustomHeaderAddJob'
import {inject, observer} from "mobx-react/native";
import ChooseAddress from "./ChooseAddress";

@inject("navigationStore")
@inject("addJobStore")
@observer
export default class ChooseTime extends React.Component {

    constructor(props){
        super(props);
    }
    goBack(){
        this.props.navigation.goBack()
    }
    static navigationOptions = {
        header: (props) => CustomHeaderAddJob(props)

    };

    handleSubmit() {
        let date = new Date().toISOString().slice(0,10);;
        let time_start = '10:00:00';
        let time_end = '12:00:00';
        let sendObj = {
            appointment_date: date,
            appointment_time_start: time_start,
            appointment_time_end: time_end
        }
        this.props.addJobStore.editNewJobInfo(sendObj);
        this.props.navigation.navigate('ExplainTheJob');
    }

    componentWillMount(){
        // console.warn('index is:', this.props.navigationStore.navigationState.index)
        // console.log('chooseTime navigationState:', this.props.navigationStore.navigationState)
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.8, backgroundColor: 'green'}}>
                    <LinearViewBelowHeaderConsumer>
                        {/*step indicator*/}
                        <View>
                            <Image
                                style={{marginTop: 0}}
                                source={require('../assets/icons/stepIndicatorConsumer1.png')}
                            />
                        </View>


                    </LinearViewBelowHeaderConsumer>
                </View>
                <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>
                        Choose Time
                    </Text>
                </View>
                <View style={{flex: 0.5, justifyContent: 'center'}}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('המשך', this.handleSubmit.bind(this))}
                    </View>
                </View>

            </View>


        );
    }
}