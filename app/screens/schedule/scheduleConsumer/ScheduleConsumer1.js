import React from 'react';
import {StyleSheet, FlatList, TouchableHighlight, View, Text, Alert} from 'react-native';
import Header from '../../../components/headers/Header';
import InfoItem from '../../../components/InfoItem';
import {SH, SW} from "../../../config/styles";

data = [
    {
        profilePic: require('../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'progress'
    },
    {
        profilePic: require('../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'onTheWay',
        price: '100'
    },
    {
        profilePic: require('../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'onTheWay',
        price: '100'
    },
    {
        profilePic: require('../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        price: '100'
    },
    {
        profilePic: require('../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
    }
]


export default class ScheduleConsumer1 extends React.Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <Header head={'Grey'}  previousPage={'ChooseService'} props={this.props}/>
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