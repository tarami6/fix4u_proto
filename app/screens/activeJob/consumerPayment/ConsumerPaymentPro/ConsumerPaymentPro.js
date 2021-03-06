import React, {Component} from "react";
// Animation
import {View} from 'react-native';
import Text from '../../../../components/text/Text'
//config
//mobx
import {inject, observer} from "mobx-react/index";
//Header imports:
import Header from '../../../../components/headers/Header'
//styles
import {HH, SH} from "../../../../config/styles";
import LottieView from 'lottie-react-native';


@inject("userDataStore")
@observer
export default class OnTheWayPro extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (this.props.userDataStore.focusedJob.status === 'consumer_review') {
            this.props.navigation.navigate('Home');
        }
        this.animation1.play();
    }


    getPaid() {
        // console.warn(this.props.userDataStore.focusedJob);
    }

    successCallback(res) {
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
        // console.warn('get paid fetch success', res);
        // console.log('start job fetch success', res);
    }

    errorCallback(err) {
        console.warn('error', err);
        console.log('error:', err)
    }

    render() {
        if (this.props.userDataStore.focusedJob.status === 'consumer_review') {
            if (this.animation1) {
                this.animation1.reset();
                this.animation2.play();
            }
            setTimeout(() => {
                this.props.navigation.navigate('Home');
            }, 2000)
        }
        return (
            <View style={{flex: 1}}>
                <View style={{height: HH, backgroundColor: '#FFBA00'}}>
                    <Header head={'AddJob'} previousPage={'AddressInfo'} props={this.props}/>
                </View>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    <Text style={{position: 'absolute', top: SH / 5, fontSize: 20, fontWeight: 'bold'}}>תהליך התשלום
                        מתבצע</Text>


                    <LottieView
                        ref={animation1 => {
                            this.animation1 = animation1;
                        }}
                        source={require('../../../../../assets/animations/recharge_underway.json')}
                    />
                    <LottieView
                        ref={animation2 => {
                            this.animation2 = animation2;
                        }}
                        loop={false}
                        source={require('../../../../../assets/animations/recharge_completed.json')}
                    />
                </View>
            </View>
        )
    }
}