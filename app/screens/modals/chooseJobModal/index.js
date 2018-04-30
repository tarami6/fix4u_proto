import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Image, StyleSheet, TextInput, Alert} from 'react-native';
import {SW, SH} from "../../../config/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import {submitButton} from "../../../components/modalSubmitButton";
import {inject, observer} from "mobx-react/index";
import {applyForJobRoute} from "../../../config/apiRoutes";
import {fetcher} from "../../../generalFunc/fetcher";

const data = {
    name: 'אלכסנדרה קנדל',
    address: 'רבינו נאנל 26, תל אביב',
    description: 'נשרף לי הבית, לדעתי יש בעיות חשמלץ ויוצאים קצרים מהשקע. אני בבית אשמח אם מישהו יהיה פנוי מעכישיו לעכשיו',
    jobImage: require('../../../../assets/images/elec.jpg'),
    profilePic: require('../../../../assets/avatars/avatar-sitepal.jpg'),
    price: "130",
    time: {
        hour: "14",
        minutes: "30"
    },
}

@inject('openJobsStore')
@inject('userDataStore')
@inject("modalsStore")
@observer
export default class ChooseJobModal extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    submitApply(){
        console.warn(this.props.openJobsStore.focusedJob.id);
        let jobId = this.props.openJobsStore.focusedJob.id
        let route = applyForJobRoute(jobId);
        let headers = {
            'Accept': `application/json`,
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.props.userDataStore.userData.token
        };
        fetcher(route, 'POST', this.successCallback.bind(this), this.errorCallback.bind(this), {time: '12:00:00', service_fee: 45}, headers)
    }

    closeModal(){
        this.props.modalsStore.closeModal('chooseJobModal')
    }

    successCallback(res){
        // console.warn('success cb chooseJob:', res);
        this.closeModal();
        this.props.userDataStore.addApply(res)
        if(res.detail){
            Alert.alert(res.detail)
            // this.closeModal();
        }
        console.log('success cb chooseJob:', res);
    }
    errorCallback(err){
        console.warn('error in chooseJob:', err);
        console.log('error in chooseJob:', err)
    }

    render() {
        ///////// and here is the data: ///////////
        let currentJob = this.props.openJobsStore.focusedJob;
        console.warn('from the modal:', currentJob.user);
        return (
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                <View style={styles.modalView}>
                    {/*Exit Icon*/}
                    <View style={styles.eXicon}>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.modalsStore.closeModal('chooseJobModal');
                            }}>
                            <Image
                                source={require('../../../../assets/icons/Exit.png')}
                            />
                        </TouchableHighlight>
                    </View>
                    {/*The Content*/}
                    <View style={{flex: 1,}}>
                        {/*the body splitted in two views*/}
                        {/*This the Top View*/}
                        <View style={{
                            flex: 1.05, backgroundColor: '#fff', paddingRight: SW / 20,
                            paddingLeft: SW / 20,
                            borderBottomWidth: 1,
                            borderColor: '#9f9f9f'
                        }}>
                            {/*Name And Image*/}
                            <View style={{
                                flex: 0.85,
                                borderBottomWidth: 1,
                                borderColor: '#cacaca'
                            }}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: '#fff',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 18,
                                            color: '#000',
                                            fontWeight: 'bold',
                                            marginRight: 5
                                        }}>{data.name}</Text>
                                    </View>
                                    <View style={{
                                        flex: 0.3,
                                        alignItems: 'flex-end',
                                        justifyContent: 'center'
                                    }}>
                                        <Image
                                            style={{width: SW / 5.5, height: SW / 5.5, borderRadius: 100}}
                                            source={data.profilePic}/>
                                    </View>
                                </View>
                                <View style={{flex: 0.5, justifyContent: 'center'}}>
                                    <Text>{data.address}</Text>
                                </View>
                            </View>
                            {/*Description and Image*/}
                            <View style={{flex: 1.15, backgroundColor: '#fff'}}>
                                <Text style={{lineHeight: 20, paddingTop: 10}}>{data.description}</Text>
                                <Image style={{
                                    height: SW / 6,
                                    width: SW / 6,
                                    alignSelf: 'flex-end',
                                    marginTop: 10
                                }} source={data.jobImage}/>
                            </View>
                        </View>
                        {/*This the bottom and the second view*/}
                        <View style={{flex: 0.95, backgroundColor: "#d8d8d8"}}>
                            <View style={{flex: 1.2,}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end'
                                    }}>
                                        <View style={{
                                            flex: 0.6,
                                            justifyContent: "center",
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <TextInput style={{
                                                height: 45,
                                                width: SW / 6,
                                                borderColor: '#cbcbcb',
                                                borderRadius: 7,
                                                borderWidth: 2,
                                                textAlign: 'center',
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                                backgroundColor: '#e8e8e8'

                                            }}
                                                       underlineColorAndroid="transparent"
                                                       placeholder={data.price}/>
                                            <Text style={{paddingLeft: 5}}>ש"ח</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'flex-end'
                                    }}>
                                        <View style={{
                                            flex: 0.6,
                                            justifyContent: "flex-end",
                                            marginRight: SW / 10,
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>

                                            <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>מחיר
                                                הגעה</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex: 1}}>
                                    <View
                                        style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'flex-end'
                                        }}>
                                            <View style={{
                                                flex: 0.6,
                                                justifyContent: "center",
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <TextInput style={{
                                                    height: 45,
                                                    width: 45,
                                                    borderColor: '#cbcbcb',
                                                    borderRadius: 7,
                                                    borderWidth: 2,
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#e8e8e8'

                                                }}
                                                           underlineColorAndroid="transparent"
                                                           placeholder={data.time.hour}/>
                                                <Text style={{paddingLeft: 5, paddingRight: 5}}>:</Text>
                                                <TextInput style={{
                                                    height: 45,
                                                    width: 45,
                                                    borderColor: '#cbcbcb',
                                                    borderRadius: 7,
                                                    borderWidth: 2,
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#e8e8e8'
                                                }}
                                                           underlineColorAndroid="transparent"
                                                           placeholder={data.time.minutes}/>
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'flex-end'
                                        }}>
                                            <View style={{
                                                flex: 0.6,
                                                justifyContent: "flex-end",
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}>

                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    marginRight: SW / 10
                                                }}>שעה</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 0.8}}>
                                <View style={styles.footer}>
                                    <View style={{alignItems: 'center'}}>
                                        {submitButton('שלח הצעה', () => {
                                            this.submitApply();
                                        })}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        alignSelf: 'center',

        marginTop: SW / 20,
        backgroundColor: '#fff',
        height: SH - (SH / 10),
        width: SW - (SW / 10)
    },
    eXicon: {
        flex: 0.03,
        marginTop: SW / 15,
        marginLeft: SW / 15,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    footer: {
        flex: 0.5,
        justifyContent: 'center',
        marginTop: SH / 30
    }

})