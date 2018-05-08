
import {fetcher} from "../../../../generalFunc/fetcher";
import {startJobRoute} from "../../../../config/apiRoutes";
import React from 'react';
import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//mobx
import {inject, observer} from "mobx-react/index";
//config:
import Communications from 'react-native-communications';
//styles and components
import {SW, mainStyles} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";
import Header from '../../../../components/headers/Header'


//dummy data
const data = {
    name: 'אלכסנדרה קנדל',
    address: 'רבינו נאנל 26, תל אביב',
    description: 'נשרף לי הבית, לדעתי יש בעיות חשמלץ ויוצאים קצרים מהשקע. אני בבית אשמח אם מישהו יהיה פנוי מעכישיו לעכשיו',
    jobImage: require('../../../../../assets/images/elec.jpg'),
    profilePic: require('../../../../../assets/avatars/avatar-sitepal.jpg'),
    price: "130",
    time: {
        hour: "14",
        minutes: "30"
    },

}


@inject("userDataStore")
@observer
export default class OnTheWayPro extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    //start Job handling
    startJob() {
        let route = startJobRoute(this.props.userDataStore.focusedJob.id);
        let sendObj = {
            status: 'in_progress'
        };
        let headers = {
            'Accept': `application/json`,
            'content-type': 'application/json',
            'Authorization': 'JWT ' + this.props.userDataStore.userData.token
        };
        fetcher(route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    successCallback(res) {
        this.setModalVisible(false);
        this.props.userDataStore.updatePost(res);
        this.props.userDataStore.focusJob(res)
        // this.props.navigation.navigate('ActiveJob');
    }

    errorCallback(err) {
        console.warn('error', err);
        console.log('error:', err)
    }

    render() {
        let focusedJob = this.props.userDataStore.focusedJob;
        console.log("sfdsdc",focusedJob);
        return (
            <View style={{flex: 1, backgroundColor: "#fff", alignItems: 'center'}}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: false})
                    }}>
                    <View style={{backgroundColor: 'rgba(0,0,0,0.3)', flex: 1}}>


                        <View style={styles.modal}>


                            <View id='top' style={styles.TopView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <Image style={styles.xicon}
                                           source={require('../../../../../assets/icons/Exit.png')}/>
                                </TouchableOpacity>
                            </View>


                            <View id='middle' style={styles.middleView}>
                                <Image style={{marginBottom: '10%'}}
                                       source={require('../../../../../assets/icons/startJobIcon.png')}/>
                                <Text style={styles.middleText}> התחל עבודה אצל הלקוח
                                </Text>
                                <Text style={[styles.middleText, {marginBottom: '30%'}]}>{focusedJob.user.name}</Text>

                            </View>

                            <View id='bottom' style={styles.bottomView}>

                                <TouchableOpacity onPress={() => this.startJob()}
                                                  style={styles.bt}>
                                    <Text style={mainStyles.buttonText}> התחל</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/*Header*/}
                <Header head={'Grey'} previousPage={'Home'} props={this.props}/>
                {/*Body*/}

                <View style={{flex: 1, width: SW - 60}}>
                    {/*Image Name */}
                    <View style={{
                        flex: 0.8,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        borderBottomWidth: 1,
                        borderColor: 'grey'
                    }}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Text style={{paddingRight: 20, fontSize: 16, color: '#000'}}>{focusedJob.user.name}</Text>
                            {focusedJob.user.profile_pic_thumb?
                                <Image style={{width: SW / 7, height: SW / 7, borderRadius: 100}}
                                source={{uri: focusedJob.user.profile_pic_thumb}}/>:
                            <Image style={{width: SW / 7, height: SW / 7, borderRadius: 100}}
                                   source={require('../../../../../assets/avatars/avatar-sitepal.jpg')}
                            />}

                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'flex-end'}}>{focusedJob.address}</Text>
                        </View>
                    </View>
                    {/*Address Description*/}
                    <View style={{flex: 1.2, alignItems: 'flex-end', borderBottomWidth: 1,}}>
                        <View style={{flex: 1}}>
                            <Text style={{paddingLeft: SW / 7}}>{focusedJob.description}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Image style={{width: SW / 7, height: SW / 7}}
                                   source={{uri: focusedJob.image_thumb}}
                            />
                        </View>
                    </View>
                    {/*Price Time*/}
                    <View style={{
                        flex: 0.8,
                        borderBottomWidth: 1,
                        borderColor: 'grey'
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>{focusedJob.service_fee} ש"ח</Text>
                            </View>
                            <View style={{flex: 1,}}>
                                <Text style={{fontSize: 16, color: '#000'}}>מחיר הגעה</Text>
                            </View>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 16, color: '#000'}}>{focusedJob.appointment_time? focusedJob.appointment_time.slice(0,5): null}</Text>
                            </View>
                            <View style={{flex: 1,}}>
                                <Text style={{fontSize: 16, color: '#000'}}>שעה</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                            {submitButton('התחל עבודה','pro', () => {
                                this.setModalVisible(true);
                            })}
                        </View>
                    </View>
                </View>
                {/*Bottom Buttons*/}

                <View style={{
                    flex: 0.12, backgroundColor: 'white', width: SW, flexDirection: 'row', borderTopWidth: 1,
                    borderColor: 'grey',
                    alignItems: 'center'
                }}>

                    <TouchableOpacity onPress={() => Alert.alert('Cancel the job coming soon')}
                                      style={{flex: 1, alignItems: 'center',}}>
                        <Image source={require('../../../../../assets/icons/cancel.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Communications.phonecall('0507710091', true)}
                                      style={{flex: 1, alignItems: 'center',}}>
                        <Image source={require('../../../../../assets/icons/call.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Alert.alert('Navigat to the location coming soon')}
                                      style={{flex: 1, alignItems: 'center',}}>
                        <Image source={require('../../../../../assets/icons/navigation.png')}/>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        width: '84%',
        height: '88%',
        marginLeft: '8%',
        marginTop: '10%'
    },
    TopView: {
        backgroundColor: 'white',
        flex: 0.2,
        justifyContent: 'flex-start'

    },
    middleView: {
        backgroundColor: 'white',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'

    },
    bottomView: {
        backgroundColor: 'white',
        flex: 0.25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center'

    },
    xicon: {
        margin: '5%'
    },
    bt: {
        width: '70%',
        height: 50,
        backgroundColor: 'orange',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    middleText: {
        flex: 0.6,
        fontSize: 18,
        fontWeight: 'bold'

    },


});