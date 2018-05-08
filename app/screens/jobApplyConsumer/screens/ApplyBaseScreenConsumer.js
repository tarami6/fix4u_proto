import React from 'react';
import {Alert, BackHandler, FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Header from '../../../components/headers/Header';
import LinearViewBelowHeaderConsumer from '../../../components/LinearViewBelowHeaderConsumer'
import MapComponent from '../../../components/mapComponent/MapComponent'
import {mainStyles, SH, SW} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import InfoItem from '../../../components/InfoItem';
import {hebrewServices} from "../../../generalFunc/generalObjects";
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import TimerMixin from 'react-timer-mixin';



let returnInHeb = (word) => {
    return (hebrewServices[word])

}

@inject('userDataStore')
@inject("proAuthStore")
@observer
export default class ApplyBaseScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // then navigate
        navigate('NewScreen');
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                },], {
                cancelable: false
            }
        )
        return true;
    }
    keyExtractor = (item) => item.id + '';

    constructor(props) {
        super(props);
        this.state = {auctionTime: 60, diff: '00:00'}
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    timeRemaining(time) {
        //HERE YOU INSERT THE DATE FROM DATABASE
        console.log('cesdc', time)
        let diffrence = 5
        let startDate = new Date(time);
        let startDay = startDate.getDay();
        let startHours = startDate.getHours();
        let startMinutes = startDate.getMinutes();
        (startMinutes + diffrence > 59) ? startMinutes = startMinutes + diffrence - 60 : startMinutes = startMinutes + diffrence;
        let startSeconds = startDate.getSeconds();
        let FirststartTime = startDate.getTime();


        let checkDate = new Date();
        let checkHours = checkDate.getHours();
        let checkMinutes = checkDate.getMinutes();
        let checkSeconds = checkDate.getSeconds();
        let checkDay = checkDate.getDay();
        let checkTime = checkDate.getTime();

        let TheDiff = checkTime - FirststartTime
        TheDiff = TheDiff % 1000000 / 1000
        TheDiff.toFixed(0)


        if (TheDiff > diffrence * 60 || TheDiff < 1 || checkHours - 1 > startHours) {
            this.setState({diff: '00:00'})
            console.warn("ur time already finished")
            clearInterval(this.interval)
        }

        else {
            this.interval = setInterval(() => {
                let currentDate = new Date();
                let currentHours = currentDate.getHours();
                let currentMinutes = currentDate.getMinutes();
                let currentSeconds = currentDate.getSeconds();
                let currentTime = currentDate.getTime();

                let startTime = currentMinutes + ':' + currentSeconds
                let endTime = startMinutes + ':' + startSeconds
                var start = Moment.utc(startTime, "mm:ss");
                var end = Moment.utc(endTime, "mm:ss");
                var d = Moment.duration(end.diff(start));
                var diff = Moment.utc(+d).format('mm:ss');
                this.setState({diff: diff})

                let timeToEndTimer = currentTime - FirststartTime
                timeToEndTimer = timeToEndTimer % 1000000 / 1000
                timeToEndTimer.toFixed(0)
                timeToEndTimer = timeToEndTimer - diffrence * 60

                if (timeToEndTimer > -1) {
                    console.warn("timer stoped by timeToEndTimer ==0 ")
                    this.setState({diff: '00:00'})
                    clearInterval(this.interval)
                }

            }, 1000);

        }

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        let time = this.state.auctionTime;
        // this.timeRemaining(this.props.userDataStore.focusedConsumerJob.created_at)
    }

    showPro(pro) {
        this.props.userDataStore.showPro(pro);
        this.props.navigation.navigate('ChoosePro', {time: this.state.diff})
    }

    render() {
        //mobx "listener" for new jobs
        let job2 = this.props.userDataStore.focusedConsumerJob;
        console.log("job2323", job2.post_applies[0])
        if (!job2.appointment_time_start) {
            return (
                <View/>
            )
        }
        return (

            <View style={{flex: 1}}>
                <View style={{flex: 0.23, backgroundColor: '#ffffff', elevation: 5}}>
                    <LinearViewBelowHeaderConsumer>
                        <Header head={'consumerHome'}  {...this.props} />
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {/*Time counter*/}
                            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        opacity: 0.5
                                    }}>{this.state.diff}</Text>
                            </View>
                            {/*Job Info*/}
                            <View style={{flex: 1, justifyContent: 'center', paddingRight: SW / 20}}>
                                <Text style={mainStyles.infoWhiteText}>{returnInHeb(job2.service)}</Text>
                                <Text style={[mainStyles.infoWhiteText, {alignSelf: 'flex-end'}]}>
                                    {job2.appointment_time_start ? job2.appointment_time_start.slice(0, 5) + '-' + job2.appointment_time_end.slice(0, 5) : null}
                                </Text>
                            </View>
                            {/*Border*/}
                            <View style={{
                                width: 2,
                                height: SH / 14,
                                borderLeftWidth: 1,
                                borderColor: '#fff',
                                alignSelf: 'center'
                            }}/>
                            {/*Service Icon*/}
                            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                                {job2.image_thumb ?
                                    <Image
                                        style={{width: 50, height: 50}}
                                        source={{uri: job2.image_thumb}}
                                    /> : <View/>}
                            </View>
                        </View>
                    </LinearViewBelowHeaderConsumer>
                </View>

                <View style={{flex: 1}}>
                    <MapComponent style={styles.map}
                                  lat={job2.lat}
                                  lon={job2.lon}
                                  userLocation={{
                                      latitude: 32.7917735,
                                      longitude: 34.9829165,
                                      latitudeDelta: 0.0622 * 0.1,
                                      longitudeDelta: 0.0421 * 0.1
                                  }}/>
                    {/*       applies.MAP         */}

                    <View style={{flex: 1, backgroundColor: 'transparent',  position: 'absolute'}}>
                        <FlatList
                            data={job2.post_applies}
                            keyExtractor={this.keyExtractor}
                            renderItem={({item, index}) =>
                                <View style={{
                                    width: SW,
                                    backgroundColor: 'transparent',
                                    height: SH / 8,
                                }}>
                                    <TouchableHighlight onPress={() => this.showPro(item)}
                                                        style={{
                                                            flex:1,
                                                            backgroundColor: 'transparent',
                                                        }}>

                                        {/*Using Linear For Shadow*/}
                                        <InfoItem info={item}/>


                                    </TouchableHighlight>
                                    {index === job2.post_applies.length-1 ?
                                    <LinearGradient colors={['rgba(0, 0, 0, 0.2)',  'rgba(0, 0, 0, 0)']} style={{width:SW, height:3}}/>
                                        :
                                    <LinearGradient colors={['#c0c0c0',  'rgba(255, 255, 255, 1)']} style={{width:SW, height:3}}/>
                                    }
                                </View>

                            }
                        />
                    </View>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

