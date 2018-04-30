import React from 'react';
import {StyleSheet, Text, View,Image, FlatList,TouchableHighlight} from 'react-native';
import Header from '../../../components/headers/Header'
import InfoItem from '../../../components/InfoItem';
import {SH, SW} from "../../../config/styles";

data = [
    {
        profilePic: require('../../../../assets/avatars/Loreal-Avatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'progress'
    },
    {
        profilePic: require('../../../../assets/avatars/Loreal-Avatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'onTheWay',
        price: '100'
    },
    {
        profilePic: require('../../../../assets/avatars/Loreal-Avatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'onTheWay',
        price: '100'
    },
    {
        profilePic: require('../../../../assets/avatars/Loreal-Avatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        price: '100'
    },
    {
        profilePic: require('../../../../assets/avatars/Loreal-Avatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
    }
]


export default class SchedulePro1 extends React.Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.185, backgroundColor: '#FFBA00'}}>
                    <Header head={'AddJob'}/>
                    <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginRight: 20}}>
                        <Text style={{marginRight: 20, fontSize: 18, color: '#fff'}}>יומן</Text>
                        <Image source={require('../../../../assets/icons/ScheduleIcon.png')}/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={data}
                        renderItem={({item}) => <TouchableHighlight onPress={() => Alert.alert('pressed')}
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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});