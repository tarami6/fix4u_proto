// React -react naitve
import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
// headr
import Header from '../../../components/headers/Header'
// pro Item
import InfoItem from '../../../components/InfoItem';
// styles
import {SH, SW} from "../../../config/styles";
// mobx
import {inject, observer} from "mobx-react/index";

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

@inject("userDataStore")
@observer
export default class SchedulePro1 extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
    }


    chooseJob(job) {
        console.log('choose job:', job);
        this.props.userDataStore.focusJob(job);
        this.props.navigation.navigate('ActiveJob');
    }

    render() {
        console.log('yoooooooo', this.props.userDataStore.userData.user.pro_posts);
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.185, backgroundColor: '#FFBA00', elevation: 5}}>
                    <Header head={'AddJob'} props={this.props}/>
                    <View style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        marginRight: 20
                    }}>
                        <Text style={{marginRight: 20, fontSize: 18, color: '#fff'}}>יומן</Text>
                        <Image source={require('../../../../assets/icons/ScheduleIcon.png')}/>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.props.userDataStore.userData.user.pro_posts}
                        renderItem={({item}) => <TouchableHighlight onPress={() => this.chooseJob(item)}
                                                                    style={{
                                                                        width: SW,
                                                                        height: SH / 8,
                                                                        borderBottomWidth: 1,
                                                                        borderColor: '#AAAAAA'
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