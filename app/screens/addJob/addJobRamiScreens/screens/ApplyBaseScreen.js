import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import CustomHeaderAddJob from '../components/CustomHeaderAddJob';
import LinearViewBelowHeaderConsumer from '../components/LinearViewBelowHeaderConsumer'

import {SW, SH} from "../../../../config/styles";

const data = [
    {
        name: 'אבי חשמל בע"מ',
        services: 'חשמל, אינסטלציה, ביוב',
        pic: require('../../../../../assets/avatars/electricianAvatar.jpg'),
        price: '100 ש\"ח',
        time: 'היום 15:30'
    },
    {
        name: 'משה שוורץ',
        services: 'חשמל, עבודות שיפוץ',
        pic: require('../../../../../assets/avatars/handyManAvatar.jpg'),
        price: '110 ש\"ח',
        time: 'היום 16:00'
    },
]
const job = {
 icon :   require(' ../../../../../assets/icons/serviceElectrician.png'),
 service : 'חשמלאי' ,
 appointmentTime:   'היום "ו" 5 בשעה 14:00' ,
}
export default class ApplyBaseScreen extends React.Component {
    static navigationOptions = {
        header: ( /* Your custom header */
            <CustomHeaderAddJob/>
        ),
    };
    constructor(props){
        super(props);
        this.state={
            auctionTime : 60
        }
    }
    componentDidMount(){
        let time = this.state.auctionTime;
        if(this.state.auctionTime > 0){
            setInterval(() =>{ this.setState({auctionTime: this.state.auctionTime -= 1})}, 1000);
        }

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.14, backgroundColor: 'red'}}>
                    <LinearViewBelowHeaderConsumer>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {/*Time counter*/}
                            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
                                <Text
                                    style={{color: '#000', fontSize: 22, fontWeight: 'bold', opacity: 0.5}}>{this.state.auctionTime}</Text>
                            </View>
                            {/*Job Info*/}
                            <View style={{flex: 1, justifyContent: 'center', paddingRight: SW / 20}}>
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{job.service}</Text>
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{job.appointmentTime}
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
                                    source={job.icon}
                                />
                            </View>
                        </View>
                    </LinearViewBelowHeaderConsumer>
                </View>
                <View style={{flex: 1}}>


                    <Image
                        style={{width: SW, height: '100%',}}
                        source={require('../../../../../assets/dummy/mapComponent.png')}
                    />
                    {data.map((item, index) => {
                        return (
                            <View key={index}
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
                                    <Text style={{zIndex: 3, fontSize: 16, color: '#000'}}>{item.time} </Text>
                                    <Text style={{zIndex: 3, fontSize: 16}}>{item.price} </Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{zIndex: 3, fontSize: 16, color: '#000'}}>{item.name} </Text>
                                    <Text style={{zIndex: 3, fontSize: 14}}>{item.services} </Text>
                                </View>
                                <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                                    {item.pic ? <Image
                                        style={{width: 50, height: 50, borderRadius: 100}}
                                        source={item.pic}
                                    /> : <View/>}

                                </View>


                            </View>
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

