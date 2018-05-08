import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from 'react-native';
//config
import {dateObjToTimeString} from "../../../../generalFunc/generalFunctions";
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
//mobx
import {inject, observer} from "mobx-react/index";
//styles and components
import LinearGradient from 'react-native-linear-gradient';
import {SW} from "../../../../config/styles";
// import styles from './styles';
import Header from '../../../../components/headers/Header'
import {submitButton} from "../../../../components/modalSubmitButton";

@inject("userDataStore")
@observer
export default class InProgressPro extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            timer: 'טוען סטופר...'
        }
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

    successCallback(res) {
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
    }

    errorCallback(err) {
        console.warn('error', err);
        console.log('error:', err)
    }

    componentDidMount() {

        // let currentTime = dateObjToTimeString()
        this.startTimer();
    }

    startTimer() {
        let basicDate = new Date(this.props.userDataStore.focusedJob.job_start_time);
        let currentDate = new Date();
        let sec = currentDate.getSeconds() - basicDate.getSeconds();
        let min = currentDate.getMinutes() - basicDate.getMinutes();
        let hour = currentDate.getHours() - basicDate.getHours();
        let newTimer = '';
        this.interval = setInterval(() => {
            if (min <= 9) {
                newTimer = (sec <= 9) ? hour + ':0' + min + ':0' + sec : hour + ':0' + min + ':' + sec;

            } else {
                newTimer = (sec <= 9) ? hour + ':' + min + ':0' + sec : hour + ':' + min + ':' + sec;
            }

            if (sec == 59) {
                min++
                sec = 0
            }
            if (min == 59 && sec == 59) {
                hour++
                min = 0
            }
            sec++
            this.setState({timer: newTimer})
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    render() {
        return (
            <View style={styles.Container}>
                {/*Top View */}
                <View style={styles.TopView}>
                    <Header head={'Grey'} previousPage={'Home'} props={this.props}/>
                    <View style={styles.topPicText}>
                        <Text style={{
                            flex: 0.5,
                            fontWeight: 'bold',
                            width: "60%",
                        }}>{this.props.userDataStore.focusedJob.user.name}</Text>
                        {this.props.userDataStore.focusedJob.user.profile_pic_thumb &&
                        <Image style={{margin: 20, width: 66, height: 66, borderRadius: 100}}
                               source={{uri: this.props.userDataStore.focusedJob.user.profile_pic_thumb}}/>}
                    </View>

                    <View style={{flex: 0.3, marginRight: '5%', marginLeft: '5%'}}>
                        <Text style={{
                            flex: 1,
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>{this.props.userDataStore.focusedJob.address}</Text>
                    </View>


                    <View style={{
                        borderBottomWidth: 1.7,
                        margin: 5,
                        width: SW - 40,
                        alignSelf: 'center',
                        borderColor: 'rgba(0,0,0,0.3)',
                    }}/>
                </View>

                {/* Middle View */}
                <View style={styles.middleView}>
                    <LinearGradient
                        colors={['#fd8824', '#fdb82c']}
                        start={{x: 0.25, y: 0.0}} end={{x: 1.0, y: 0.5}}
                        style={{
                            height: SW / 1.5,
                            width: SW / 1.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 200
                        }}>

                        <View style={{
                            backgroundColor: 'white', height: SW / 1.6, width: SW / 1.6, borderRadius: 200,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{fontSize: 30,  color: '#474747'}}> {this.state.timer} </Text>
                        </View>
                    </LinearGradient>

                    <View style={{flex: 0.15, marginTop: 30}}>
                        <Image
                            source={require('../../../../../assets/icons/call.png')}/>
                    </View>
                </View>

                {/*Bottom View*/}

                <View style={styles.bottomView}>
                    {submitButton('סיום עבודה', 'pro', this.finishJob.bind(this))}

                    {/*<TouchableOpacity onPress={() => this.finishJob()}*/}
                    {/*style={styles.bt}>*/}
                    {/*<Text style={styles.btText}> סיום עבודה</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: '100%',
        borderColor: 'white',

    },
    TopView: {
        backgroundColor: 'white',
        flex: 0.3,
        flexDirection: 'column',
        justifyContent: 'flex-start',


    },
    topPicText: {
        flex: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    middleView: {
        backgroundColor: 'white',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',


    },
    bottomView: {
        backgroundColor: 'white',
        flex: 0.15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center'

    },
    xicon: {
        margin: '5%'
    },
    bt: {
        width: '70%',
        height: 50,
        backgroundColor: 'orange',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    middleText: {
        flex: 0.6,
        fontSize: 18,
        fontWeight: 'bold'

    },


});