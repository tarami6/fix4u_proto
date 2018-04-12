import React from 'react';
import {View, Text, Image, } from 'react-native';

import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderConsumer';
import {submitButton} from "../../../../components/modalSubmitButton";
import CustomHeaderAddJob from '../components/CustomHeaderAddJob'

export default class ChooseTime extends React.Component {
    static navigationOptions = {
        header: ( /* Your custom header */
            <CustomHeaderAddJob/>
        ),
    };


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
                <View style={{flex: 0.5,  justifyContent: 'center'}}>
                    <View style={{  alignItems: 'center'}}>
                        {submitButton('המשך', () => {
                            console.log("warn")
                        })}
                    </View>
                </View>

            </View>


        );
    }
}