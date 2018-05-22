import React from 'react';
import {StyleSheet, FlatList, TouchableHighlight, View, Text, Alert, BackHandler} from 'react-native';
import Header from '../../../components/headers/Header';
import InfoItem from '../../../components/InfoItem';
import {HH, SH, SW} from "../../../config/styles";

//mobx
import {inject, observer} from "mobx-react/native";

@inject('userDataStore')
@observer
export default class ScheduleConsumer1 extends React.Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        //backHandler:
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    chooseJob(job) {
        console.log("STATUS", job.status)
        this.props.userDataStore.focusJob(job);
        if (job.status === 'open') {
            this.props.navigation.navigate('AddJob');
        }
        this.props.navigation.navigate('ActiveJob');
    }

    keyExtractor = (item) => item.id + '';


    render() {

        return (
            <View style={{flex: 1,}}>
                <View style={{width: SW, height: HH, backgroundColor: '#ffffff', elevation: 1}}>
                    <Header head={'Grey'} previousPage={'AddJob'} props={this.props}/>
                </View>

                <View style={{flex: 1}}>
                    {this.props.userDataStore.userData.user.user_active_posts && this.props.userDataStore.userData.user.user_active_posts.length > 0 ?
                        this.props.userDataStore.userData.user.user_active_posts.map((item, index)=>{
                            return (
                                <View
                                    key={item.id}
                                    style={{
                                    width: SW,
                                    height: SH / 8 +0.5,
                                    backgroundColor: 'transparent'
                                }}>
                                    <TouchableHighlight onPress={() => {
                                        this.chooseJob(item)
                                    }}
                                                        style={{
                                                            width: SW,
                                                            height: SH / 8,
                                                            backgroundColor: 'transparent',
                                                        }}>

                                        <InfoItem info={item} />
                                    </TouchableHighlight>

                                </View>
                            )
                        })
                        :
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 30, color: 'grey', opacity: 0.2}}>אין לך עבודות </Text>
                        </View>

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