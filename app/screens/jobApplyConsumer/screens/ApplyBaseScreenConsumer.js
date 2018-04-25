import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import CustomHeaderAddJob from '../../../components/headers/CustomHeaderAddJob';
import LinearViewBelowHeaderConsumer from '../../../components/LinearViewBelowHeaderConsumer';
import MapComponent from '../../../components/mapComponent'
import CustomHeader from "../../../components/headerComponent/CustomHeader";
import {SW, SH} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import {fetcher} from "../../../generalFunc/fetcher";
import {chooseApplyRoute} from "../../../config/apiRoutes";

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
// const job = {
//  icon :   require('../../../../assets/icons/serviceElectrician.png'),
//  service : 'חשמלאי' ,
//  appointmentTime:   'היום "ו" 5 בשעה 14:00' ,
// }

@inject("userDataStore")
@observer
export default class ApplyBaseScreen extends React.Component {
    static navigationOptions = {
        header: (/* Your custom header */
            <CustomHeader props={this.props}/>
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            auctionTime: 60,
            lat: 32.786842906668895,
            lon: 34.972372709973115,
        };
    }

    componentDidMount() {
        let time = this.state.auctionTime;
        if (this.state.auctionTime > 0) {
            setInterval(() => {
                this.setState({auctionTime: this.state.auctionTime -= 1})
            }, 1000);
        }

        this.props.userDataStore.findAndFocusConsumerJob();
        console.warn('user current job: ', this.props.userDataStore.focusedConsumerJob.post_applies);

    }

    choosePro(proObj) {
        console.warn(this.props.userDataStore.focusedConsumerJob.id, proObj.id);
        let route = chooseApplyRoute(this.props.userDataStore.focusedConsumerJob.id);
        console.warn('chose:', proObj);
        let sendObj = {
            user_pro: proObj.user_pro.id,
            status: 'on_the_way'
        };
        let headers = {
            'Accept': `application/json`,
            'content-type': 'application/json',
            'Authorization': 'JWT ' + this.props.userDataStore.userData.token
        };

        console.log('fetching::: ', route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers);
        fetcher(route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers)

    }
    successCallback(res){
        console.warn(res)
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res);
        this.props.navigation.navigate('ConsumerNavigator');
    }

    errorCallback(err){
        console.warn(err)
        console.log(err);

    }

    render() {
        let job = this.props.userDataStore.focusedConsumerJob
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.14, backgroundColor: 'red'}}>
                    <LinearViewBelowHeaderConsumer>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {/*Time counter*/}
                            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        opacity: 0.5
                                    }}>{this.state.auctionTime}</Text>
                            </View>
                            {/*Job Info*/}
                            <View style={{flex: 1, justifyContent: 'center', paddingRight: SW / 20}}>
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>job service</Text>
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>job appointment time
                                    14:00</Text>
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
                                    source={require('../../../../assets/icons/serviceElectrician.png')}
                                />
                            </View>
                        </View>
                    </LinearViewBelowHeaderConsumer>
                </View>
                <View style={{flex: 1}}>


                    <View>
                        <MapComponent
                            lat={this.state.lat}
                            lon={this.state.lon}
                            userLocation={{
                                latitude: this.state.lat,
                                longitude: this.state.lon,
                                latitudeDelta: 0.0622 * 0.1,
                                longitudeDelta: 0.0421 * 0.1
                            }}/>
                    </View>
                    {/*       applies.MAP         */}

                    {job.post_applies && job.post_applies.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={()=>this.choosePro(item)}
                                key={index}
                                style={{
                                    width: SW,
                                    height: SH / 9,
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    top: index * (SH / 9),
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#7e7e7e'
                                }}>

                                <View style={{
                                    flex: 0.5,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    marginLeft: SW / 20
                                }}>
                                    <Text style={{zIndex: 3, fontSize: 16, color: '#000'}}>name </Text>
                                    <Text style={{zIndex: 3, fontSize: 16}}>price </Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{zIndex: 3, fontSize: 16, color: '#000'}}>name </Text>
                                    <Text style={{zIndex: 3, fontSize: 14}}>service </Text>
                                </View>
                                <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                                    {item.pic ? <Image
                                        style={{width: 50, height: 50, borderRadius: 100}}
                                        source={item.pic}
                                    /> : <View/>}

                                </View>
                            </TouchableOpacity>
                            // </TouchableOpacity>
                        )
                    })}
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

