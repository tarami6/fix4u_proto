// React -react naitve
import React from 'react';
import {Alert, BackHandler, Image, FlatList, Text, TouchableHighlight, View} from 'react-native';
// headr
import Header from '../../../components/headers/Header'
// pro Item
import InfoItem from '../../../components/InfoItem';
// styles
import {SH, SW} from "../../../config/styles";
// mobx
import {inject, observer} from "mobx-react/index";


import Swipeout from 'react-native-swipeout'
import Cicons from '../../../components/customIcons/CustomIcons'

class MyListItem extends React.PureComponent {

    render() {
        const swipeSettings = (id, item) => {
            return ({
                autoClose: true,
                onClose: (secId, rowID, direction) => {

                },
                onOpen: (secId, rowID, direction) => {

                },
                left: [
                    {
                        onPress: () => {
                            this.props.cancelJob(item)
                        },
                        type: 'delete',
                        component:
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={require('../../../../assets/icons/delete.png')}/></View>
                    }
                ],
                rowID: this.props.index,
                sectionId: 1,
            })
        };
        return (
            <View>
                {this.props.item.status === "on_the_way" ?
                    <Swipeout {...(swipeSettings(this.props.item.id, this.props.item))} onPress={() => {
                        console.warn("pressed:" + this.props.item.id)
                    }}>
                        <TouchableHighlight onPress={() => this.chooseJob(item)}
                                            style={{
                                                width: SW,
                                                height: SH / 8,
                                                borderBottomWidth: 1,
                                                borderColor: '#AAAAAA'
                                            }}>
                            <InfoItem type={'consumer'} info={this.props.item}/>
                        </TouchableHighlight>
                    </Swipeout> : <TouchableHighlight onPress={() => this.chooseJob(this.props.item)}
                                                      key={this.props.item.id}
                                                      style={{
                                                          width: SW,
                                                          height: SH / 8,
                                                          borderBottomWidth: 1,
                                                          borderColor: '#AAAAAA'
                                                      }}>

                        <InfoItem type={'consumer'} info={this.props.item}/>
                    </TouchableHighlight>
                }
            </View>
        )
    }
}

@inject("userDataStore")
@observer
export default class SchedulePro1 extends React.Component {
    static navigationOptions = {
        header: null
    }
    handleBackButton = () => {
        console.warn('success??321');
        this.props.navigation.navigate('DrawerClose');
        return true;
    }

    componentDidMount() {
        //backHandler:
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    chooseJob(job) {
        console.log('choose job:', job);
        this.props.userDataStore.focusJob(job);
        this.props.navigation.navigate('ActiveJob');
    }

    _renderItem = ({item}) => (
        <MyListItem
            item={item}
        />
    );


    render() {

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
                        <Cicons name={"shedule"} size={40} color={"#ffffff"}/>
                    </View>
                </View>
                <View style={{flex: 1}}>

                    {this.props.userDataStore.userData.user.pro_posts && this.props.userDataStore.userData.user.pro_posts.length > 0 ?
                        //// pro posts map:

                        <FlatList
                            data={this.props.userDataStore.userData.user.pro_posts}
                            getItemLayout={(data, index) => (
                                {length: SH/8+0.5, offset: SH/8+0.5 * index, index}
                            )}
                            keyExtractor={(item, index) => index}
                            renderItem={this._renderItem}
                        />:
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 30, color: 'grey', opacity: 0.2}}>אין לך עבודות </Text>
                        </View>
                    }
                </View>

            </View>
        )
    }
}
