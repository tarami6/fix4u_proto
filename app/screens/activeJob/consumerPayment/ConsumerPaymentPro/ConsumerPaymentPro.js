import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View} from 'react-native';
//config
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
//mobx
import {inject, observer} from "mobx-react/index";
//Header imports:
import LinierView from '../../../../components/linierView';
import Header from '../../../../components/headers/Header'
//styles
import {HH} from "../../../../config/styles";
import styles from './styles'
import {chooseApplyRoute} from "../../../../config/apiRoutes";
// Animation
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {SH} from "../../../../config/styles";


@inject("userDataStore")
@observer
export default class OnTheWayPro extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if(this.props.userDataStore.focusedJob.status === 'consumer_review'){
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
        if(this.props.userDataStore.focusedJob.status === 'consumer_review'){
            this.animation1.reset();
            this.animation2.play();
            setTimeout(()=>{
                this.props.navigation.navigate('Home');
            },2000)
        }
        return (
            <View style={{flex: 1}}>
                <View style={{height: HH, backgroundColor: '#FFBA00'}}>
                    <Header head={'AddJob'} previousPage={'AddressInfo'} props={this.props}/>
                </View>
                {/*Here is the list of jobs container and the jobList MAP */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                        <Text style={{position: 'absolute', top: SH / 5, fontSize: 20, fontWeight: 'bold' }}>תהליך התשלום מתבצע</Text>


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