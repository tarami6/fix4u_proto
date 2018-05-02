import React from 'react';
import {StyleSheet, FlatList, TouchableHighlight, View, Text, Alert} from 'react-native';
import Header from '../../../components/headers/Header';
import InfoItem from '../../../components/InfoItem';
import {SH, SW} from "../../../config/styles";
//mobx
import {inject, observer} from "mobx-react/native";

@inject('userDataStore')
@observer
export default class ScheduleConsumer1 extends React.Component {
    static navigationOptions = {
        header: null,
    }
    chooseJob(job){
        this.props.userDataStore.focusJob(job);
        if(job.status==='open'){
            this.props.navigation.navigate('AddJob');
        }
        this.props.navigation.navigate('ActiveJob');
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <Header head={'Grey'}  previousPage={'AddJob'} props={this.props}/>
                <View style={{flex: 1}}>
                    { this.props.userDataStore.userData.user.user_posts.length > 0?
                    <FlatList
                        data={this.props.userDataStore.userData.user.user_posts}
                        renderItem={({item}) => <TouchableHighlight onPress={() => {this.chooseJob(item)}}
                                                                    style={{
                                                                        width: SW,
                                                                        height: SH / 8,
                                                                        borderBottomWidth: 1,
                                                                        borderColor: 'grey'
                                                                    }}>

                            <InfoItem info={item}/>
                        </TouchableHighlight>}
                    />:
                    <Text>אין לך עבודות </Text>
                    }
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