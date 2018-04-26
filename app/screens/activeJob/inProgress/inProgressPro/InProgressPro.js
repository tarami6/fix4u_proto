import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//config
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
//mobx
import {inject, observer} from "mobx-react/index";
//styles and components
import LinearGradient from 'react-native-linear-gradient';
import {SW} from "../../../../config/styles";
// import styles from './styles';
import Header from '../../../../components/headers/Header'

@inject("userDataStore")
@observer
export default class InProgressPro extends Component {
    static navigationOptions = {
        header: null
    }
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

    successCallback(res) {
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
        console.warn('start job fetch success', res);
        console.log('start job fetch success', res);
    }

    errorCallback(err) {
        console.warn('error', err);
        console.log('error:', err)
    }

    render() {
        return (
            <View style={styles.Container}>


                <View id='top' style={styles.TopView}>

                    <Header head={'Grey'} previousPage={'Home'} props={this.props}/>

                    <View id='picture and name' style={styles.topPicText}>
                        <Text style={{flex: 0.5, fontWeight: 'bold', fontSize: 18, width: "60%", borderRadius: 100}}>
                            אלכסנדרה{"\n"} קנדל</Text>
                        <Image style={{flex: 0.2, margin: 20, width: 66, height: 58}}
                               source={require('../../../../../assets/avatars/Loreal-Avatar.jpg')}/>
                    </View>

                    <View style={{flex: 0.3, marginRight: '3%'}}>
                        <Text style={{flex: 1, fontWeight: 'bold', fontSize: 15}}>רבינו חננאל 26, תל אביב</Text>
                    </View>

                    <View style={{borderBottomWidth: 1.7, margin: 5, borderColor: 'rgba(0,0,0,0.3)',}}>
                    </View>

                </View>


                <View id='middle' style={styles.middleView}>
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

                        <View id='circel' style={{
                            backgroundColor: 'white', height: SW / 1.6, width: SW / 1.6, borderRadius: 200,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#474747'}}> 2:15:37 </Text>
                        </View>
                    </LinearGradient>

                    <View id='image' style={{flex: 0.15, marginTop: 30}}>
                        <Image
                            source={require('../../../../../assets/icons/call.png')}/>
                    </View>
                </View>

                <View id='bottom' style={styles.bottomView}>

                    <TouchableOpacity onPress={() => this.finishJob()}
                                      style={styles.bt}>
                        <Text style={styles.btText}> סיום עבודה</Text>
                    </TouchableOpacity>
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