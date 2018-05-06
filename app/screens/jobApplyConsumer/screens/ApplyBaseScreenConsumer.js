import React from 'react';
import {Image, StyleSheet, Text, FlatList, TouchableHighlight, TouchableOpacity, View, Alert} from 'react-native';
import Header from '../../../components/headers/Header';
import LinearViewBelowHeaderConsumer from '../../../components/LinearViewBelowHeaderConsumer'
import MapComponent from '../../../components/mapComponent/MapComponent'
import { fetcher } from "../../../generalFunc/fetcher";
import { SH, SW, mainStyles } from "../../../config/styles";
import { inject, observer } from "mobx-react/native";
import InfoItem from '../../../components/InfoItem';
import {hebrewServices} from "../../../generalFunc/generalObjects";
import Moment from 'moment';
import TimerMixin from 'react-timer-mixin'


const data = [
    {
        name: 'אבי חשמל בע"מ',
        services: 'חשמל, אינסטלציה, ביוב',
        pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
        price: '100 ש\"ח',
        time: 'היום 15:30'
    },
    {
        name: 'משה שוורץ',
        services: 'חשמל, עבודות שיפוץ',
        pic: require('../../../../assets/avatars/handyManAvatar.jpg'),
        price: '110 ש\"ח',
        time: 'היום 16:00'
    },
]
const job = {
    icon: require(' ../../../../assets/icons/serviceElectrician.png'),
    service: 'חשמלאי',
    appointmentTime: 'היום, 14:00-16:00',
}

let returnInHeb = (word) => {
    // console.warn('word', word)
    return (hebrewServices[word])

}

@inject('userDataStore')
@inject("proAuthStore")
@observer
export default class ApplyBaseScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {auctionTime: 60, diff: '00:00'}
    }


    timeRemaining(time) {
        //HERE YOU INSERT THE DATE FROM DATABASE
        let diffrence = 5
        let startDate = new Date(time);
        console.warn("job post in: "+ time)
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
            
        if (TheDiff > diffrence * 60 || TheDiff< 1 ||checkHours-1 >startHours) {
            this.setState({ diff: '00:00' })
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
                this.setState({ diff: diff })

                let timeToEndTimer = currentTime - FirststartTime
                timeToEndTimer = timeToEndTimer % 1000000 / 1000
                timeToEndTimer.toFixed(0)
                timeToEndTimer = timeToEndTimer-diffrence*60
                
                if (timeToEndTimer > -1) {
                    console.warn("timer stoped by timeToEndTimer ==0 ")
                    this.setState({ diff: '00:00' })
                    clearInterval(this.interval)
                } 

            }, 1000);

        }

    }

   

    componentDidMount() {
        let time = this.state.auctionTime;
        this.timeRemaining(this.props.userDataStore.focusedConsumerJob.created_at)
    }



    showPro(pro) {
        this.props.userDataStore.showPro(pro);
        this.props.navigation.navigate('ChoosePro')
    }

    keyExtractor = (item) => item.id + '';

    render() {
        //mobx "listener" for new jobs
        let job2 = this.props.userDataStore.focusedConsumerJob;
        console.log("jobLIST", job2.post_applies)
        if (!job2.appointment_time_start) {
            return (
                <View/>
            )
        }
        return (

            <View style={{flex: 1}}>
                <View style={{flex: 0.23, backgroundColor: 'red'}}>
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
                                {console.log("time", job2.appointment_date)}
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
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{uri: job2.image_thumb}}
                                />
                            </View>
                        </View>
                    </LinearViewBelowHeaderConsumer>
                </View>
                <View style={{flex: 1}}>
                    <MapComponent style={styles.map}
                                  lat={this.state.lat}
                                  lon={this.state.lon}
                                  userLocation={{
                                      latitude: 32.7917735,
                                      longitude: 34.9829165,
                                      latitudeDelta: 0.0622 * 0.1,
                                      longitudeDelta: 0.0421 * 0.1
                                  }}/>
                    {/*       applies.MAP         */}

                    <View style={{flex: 1, backgroundColor: 'red', position: 'absolute'}}>
                        <FlatList
                            data={job2.post_applies}
                            keyExtractor={this.keyExtractor}
                            renderItem={({item}) => <TouchableHighlight onPress={() => this.showPro(item)}
                                                                        style={{
                                                                            width: SW,
                                                                            height: SH / 8,
                                                                            borderBottomWidth: 1,
                                                                            borderColor: 'grey'
                                                                        }}>

                                <InfoItem info={item}/>
                            </TouchableHighlight>}
                        />
                    </View>

                    {/*{job2.post_applies && job2.post_applies.map((item, index) => {*/}
                    {/*return (*/}
                    {/*<TouchableOpacity*/}
                    {/*onPress={() => this.showPro(item)}*/}
                    {/*key={index}*/}
                    {/*style={{*/}
                    {/*width: SW,*/}
                    {/*height: SH / 9,*/}
                    {/*backgroundColor: '#fff',*/}
                    {/*position: 'absolute',*/}
                    {/*top: index * (SH / 9),*/}
                    {/*flexDirection: 'row',*/}
                    {/*borderBottomWidth: 1,*/}
                    {/*borderBottomColor: '#7e7e7e'*/}
                    {/*}}>*/}
                    {/*<View style={{*/}
                    {/*flex: 0.5,*/}
                    {/*justifyContent: 'center',*/}
                    {/*alignItems: 'flex-start',*/}
                    {/*marginLeft: SW / 20*/}
                    {/*}}>*/}
                    {/*<Text*/}
                    {/*style={{zIndex: 3, fontSize: 16, color: '#000'}}>{item.time.slice(0, 5)} </Text>*/}
                    {/*<Text style={{zIndex: 3, fontSize: 16}}>{item.service_fee} </Text>*/}
                    {/*</View>*/}
                    {/*<View style={{flex: 1, justifyContent: 'center'}}>*/}
                    {/*<Text style={{zIndex: 3, fontSize: 16, color: '#000'}}>{item.user_pro.name} </Text>*/}
                    {/*<Text style={{zIndex: 3, fontSize: 14}}>{item.services} </Text>*/}
                    {/*</View>*/}
                    {/*<View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>*/}
                    {/*{item.pic ? <Image*/}
                    {/*style={{width: 50, height: 50, borderRadius: 100}}*/}
                    {/*source={item.user_pro.profile_pic_thumb}*/}
                    {/*/> : <View/>}*/}

                    {/*</View>*/}


                    {/*</TouchableOpacity>*/}
                    {/*)*/}
                    {/*})}*/}

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

