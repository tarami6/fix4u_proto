import React from 'react';
import {
    Alert,
    Image,
    LayoutAnimation,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    BackHandler,
    UIManager,
    View
} from 'react-native';
import Header from '../../../components/headers/Header';
import LinearViewBelowHeaderConsumer from '../../../components/LinearViewBelowHeaderConsumer';
import ImagePicker from "react-native-image-picker";
import {SH, SW} from "../../../config/styles";
import StarIcon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import {submitButton} from "../../../components/modalSubmitButton";
// /config
import {hebrewServices} from "../../../generalFunc/generalObjects";
import {fetcher} from "../../../generalFunc/fetcher";
import {inject, observer} from "mobx-react/native";
import {chooseApplyRoute, editUserRoute} from "../../../config/apiRoutes";

import {getAvgRating, formatTime} from "../../../generalFunc/generalFunctions";


import {NavigationActions} from "react-navigation"


//image picker options:
var options = {
    title: 'Upload profile picture',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const data = [
    {
        name: 'גסיקה',
        date: '23/3/2018',
        pic: require('../../../../assets/avatars/Loreal-Avatar.jpg'),
        review: 'שירותי ונדיב, עושה עבודה טובה ומהירה',
        price: 5,
        workTime: 2,
        service: 5,
    },
    {
        name: 'אסף',
        date: '17/3/2018',
        pic: require('../../../../assets/avatars/avatar-sitepal.jpg'),
        review: 'אחלה גבר, מחיר אש',
        price: 5,
        workTime: 5,
        service: 5,
    },


]


@inject("modalsStore")
@inject('navigationStore')
@inject('userDataStore')
@observer
export default class ApplyBaseScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    //handling backHandler:
    handleBackButton = () => {
        console.warn('success??');
        this.props.navigationStore.dispatch(NavigationActions.back());
    }
    expand_collapse_Function = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (this.state.expand == false) {
            this.setState({
                updatedHeight: this.state.textLayoutHeight,
                expand: true,
                buttonText: 'ios-arrow-up'
            });
        }
        else {
            this.setState({
                updatedHeight: 0,
                expand: false,
                buttonText: 'ios-arrow-down'
            });
        }
    }

    constructor() {
        super();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.state = {
            textLayoutHeight: 0,
            updatedHeight: 0,
            expand: false,
            buttonText: 'ios-arrow-down',
            height: SH / 3.2,
            modalVisible: false,
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        //backHandler:
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


        this.setState({
            height: this.state.height * data.length + SH / 8
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    //handling backHandler:
    handleBackButton = () => {
        console.warn('success??');
        this.props.navigation.goBack();
        return true;
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // this.props.navigation.state.params.onClose()
    }

    getHeight(height) {
        this.setState({textLayoutHeight: height});
    };

    //Choose pro functions:
    choosePro(proObj) {
        // here we also check if the consumer finished his registration, and popup modal in case he didn't
        if (this.props.userDataStore.userData.user.name) {
            this.fetchChoosePro(proObj)
        }
        else {
            let successCB = (res) => {
                console.warn('success callback edit user', res)
                this.props.userDataStore.updateUser(res);
                this.fetchChoosePro(proObj)
            }
            if (!this.state.name) {
                Alert.alert('אנא הכנס שם..');
            }
            else if (!this.state.profilePic) {
                Alert.alert('אנא הכנס תמונת פרופיל..')
            }
            else {
                let sendObj = {
                    name: this.state.name
                }
                if (this.state.profilePic) {
                    let newObj = this.state.picData;
                    newObj.append('name', this.state.name)
                    sendObj = {
                        type: 'pic',
                        payload: newObj
                    }
                }
                this.props.modalsStore.showModal('loaderModal');
                fetcher(editUserRoute, 'PATCH', successCB, this.errorCallback.bind(this), sendObj, {token: this.props.userDataStore.userData.token})
            }

        }


    }

    fetchChoosePro(proObj) {
        let route = chooseApplyRoute(this.props.userDataStore.focusedConsumerJob.id);
        let sendObj = {
            user_pro: proObj.user_pro.id,
            status: 'on_the_way',
            service_fee: this.props.userDataStore.shownPro.service_fee,
            appointment_time: this.props.userDataStore.shownPro.time
        };
        let headers = {
            'Accept': `application/json`,
            'content-type': 'application/json',
            'Authorization': 'JWT ' + this.props.userDataStore.userData.token
        };
        this.props.modalsStore.showModal('loaderModal');
        fetcher(route, 'PATCH', this.successCallback.bind(this), this.errorCallback.bind(this), sendObj, headers)
    }

    successCallback(res) {
        this.props.modalsStore.hideModal('loaderModal');
        this.setModalVisible(!this.state.modalVisible);
        this.props.userDataStore.openToActivePost(res);
        this.props.userDataStore.focusJob(res);
        this.props.navigation.navigate('ChooseService');
    }

    errorCallback(err) {
        this.props.modalsStore.hideModal('loaderModal');

        console.warn(err)
        console.log(err);

    }

    selectPhotoTapped(fieldName = 'image') {


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {

                let source = {uri: response.uri};
                let data = new FormData();
                data.append(fieldName, {uri: response.uri, name: response.fileName, type: response.type});
                // You can also display the image using data:
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    profilePic: source,
                    picData: data,
                });
            }
        });
    }

    render() {

        let apply = this.props.userDataStore.shownPro;
        let job = this.props.userDataStore.focusedConsumerJob;

        return (

            <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                        <View style={styles.modalView}>
                            {/*Exit Icon*/}
                            <View style={styles.eXicon}>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Image
                                        source={require('../../../../assets/icons/Exit.png')}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.body}>
                                <View style={{flex: 2, alignItems: 'center'}}>
                                    <Image style={{width: SW / 4.5, height: SW / 4.5, borderRadius: 100}}
                                           source={{uri: apply.user_pro.profile_pic_thumb}}
                                    />
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#000',
                                        fontWeight: 'bold',
                                        marginTop: SW / 20,
                                        textAlign: 'center'
                                    }}>{apply.user_pro.name}</Text>
                                    <Text style={{fontSize: 16}}>{hebrewServices[job.service]}</Text>
                                    <View style={{
                                        marginTop: 20,
                                        opacity: 0.65,
                                        height: 1,
                                        width: SW / 10,
                                        borderBottomWidth: 1,
                                        borderColor: '#000'
                                    }}/>
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#000',
                                        fontWeight: 'bold',
                                        marginTop: SW / 20
                                    }}> היום {apply.time.slice(0, 5)} </Text>
                                    <Text style={{fontSize: 14}}> מחיר הגעה {apply.service_fee} ש"ח</Text>
                                </View>
                                {!this.props.userDataStore.userData.user.name &&
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    paddingBottom: SH / 20
                                }}>
                                    <Text style={{fontSize: 15, color: 'black', margin: 5, opacity: 0.5}}>
                                        הכנס
                                        שם
                                    </Text>

                                    <View style={{
                                        borderColor: '#e0e0e0',
                                        borderWidth: 2,
                                        borderRadius: 7,
                                        width: SW / 1.4,
                                        backgroundColor: 'white',
                                        flexDirection: "row"
                                    }}>
                                        {/*Its the Camera ICON*/}
                                        <StarIcon
                                            onPress={() => this.selectPhotoTapped("profile_pic")}
                                            style={{opacity: 0.7, alignSelf: 'center', marginLeft: 5}}
                                            name="camera" size={30}
                                            color="gray"/>
                                        <TextInput underlineColorAndroid="transparent" style={{height: 40, flex: 1}}
                                                   onChangeText={(name) => this.setState({name: name})}
                                        />
                                    </View>
                                </View>
                                }

                                <View style={{flex: 1.4, alignItems: 'center'}}>
                                    <Text style={{opacity: 0.7}}>מתכנן את היציאה אליך</Text>
                                    <View style={styles.footer}>
                                        <View style={{alignItems: 'center'}}>
                                            {submitButton('אשר', 'consumer', () => {
                                                this.choosePro(apply);
                                            })}
                                        </View>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                </Modal>

                <View style={{flex: 0.5}}>
                    <LinearViewBelowHeaderConsumer>
                        < Header
                            head={'AddJob'}
                            previousPage={'ApplyBaseScreen'}
                            props={this.props
                            }
                        />
                        <View style={styles.row}>
                            {/*Time counter*/}
                            <View style={styles.headerTimeView}>
                                <Text style={styles.headerTimeText}></Text>
                            </View>
                            {/*Job Info*/}
                            <View style={styles.serviceView}>
                                <Text style={styles.serviceText}>{hebrewServices[job.service]}</Text>
                                <Text
                                    style={styles.serviceText}>היום {job.appointment_time_start.slice(0, 5) + '-' + job.appointment_time_end.slice(0, 5)}
                                </Text>
                            </View>
                            {/*Border*/}
                            <View style={styles.headerBorder}/>
                            {/*Service Icon*/}
                            <View style={styles.serviceIconView}>
                                <Image source={require('../../../../assets/icons/serviceElectrician.png')}
                                />
                            </View>
                        </View>
                    </LinearViewBelowHeaderConsumer>
                </View>

                <View style={{flex: 0.7}}>
                    <View style={styles.infoView}>
                        {/*Image & service & full name*/}
                        <View style={styles.row}>
                            <View style={styles.infoTimeAndPriceView}>
                                <Text style={{color: '#000'}}> היום {apply.time.slice(0, 5)}</Text>
                                <Text> {apply.service_fee} ש"ח</Text>
                            </View>
                            <View style={styles.infoService}>
                                {console.log('333', apply.user_pro)}
                                <Text style={{color: '#000'}}>{apply.user_pro.name}</Text>
                                <Text>{hebrewServices[job.service]}</Text>
                            </View>
                            <View
                                style={styles.infoProPicView}>
                                <Image style={styles.infoProPic}
                                       source={{uri: apply.user_pro.profile_pic_thumb}}
                                />
                            </View>
                        </View>
                        {/*about*/}
                        <View style={styles.infoAboutView}>
                            <Text style={{
                                height: SH / 13,
                                width: SW / 1.15,
                                overflow: 'hidden'
                            }}>{apply.user_pro.company_description}</Text>
                        </View>
                        {/*Border*/}
                        <View style={styles.infoBorder}/>
                        {/*reviews*/}
                        <View style={styles.infoReviews}>
                            {/*Stars*/}
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.infoStarsView}>

                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        rating={getAvgRating(apply.user_pro.performance_rating_avg, apply.user_pro.price_rating_avg, apply.user_pro.time_rating_avg)}
                                        starSize={14}
                                        fullStarColor={'#ffd700'}
                                        emptyStar={'star'}
                                        iconSet={'FontAwesome'}
                                    />
                                </View>


                                <View style={styles.infoReviewCount}>
                                    <Text>{apply.user_pro.pro_reviews.length} חוות דעת </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.MainContainer}>
                    <ScrollView style={styles.ChildView}>
                        <View style={styles.ExpandViewInsideText}>
                            {apply.user_pro.pro_reviews.map((item, index) => {
                                return (
                                    <View key={index} style={styles.proCard}>
                                        {/*Name and Image*/}
                                        <View style={styles.cardNameAndImageView}>
                                            <View style={styles.cardNameAndDate}>
                                                <Text style={styles.nameText}>{item.user.name}</Text>
                                                <Text style={{fontSize: 16}}>{formatTime(item.created_at)}</Text>
                                            </View>
                                            <View style={styles.cardPicProView}>
                                                {item.user.profile_pic_thumb &&
                                                <Image
                                                    style={styles.proPic}
                                                    source={{uri: item.user.profile_pic_thumb}}
                                                />}
                                            </View>
                                        </View>
                                        {/*Review*/}
                                        <View style={styles.cardReview}>
                                            <Text style={{fontSize: 16}}>{item.review}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starsContainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={item.price_rating}
                                                    starSize={14}
                                                    fullStarColor={'#ffd700'}
                                                    emptyStar={'star'}
                                                    iconSet={'FontAwesome'}
                                                />
                                            </View>
                                            <View style={styles.cardRightTitle}>
                                                <Text style={{fontSize: 16}}>מחיר</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starsContainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={item.time_rating}
                                                    starSize={14}
                                                    fullStarColor={'#ffd700'}
                                                    emptyStar={'star'}
                                                    iconSet={'FontAwesome'}
                                                />
                                            </View>
                                            <View style={styles.cardRightTitle}>
                                                <Text style={{fontSize: 16}}>זמן עבודה</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.starsContainer}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={item.performance_rating}
                                                    starSize={14}
                                                    fullStarColor={'#ffd700'}
                                                    emptyStar={'star'}
                                                    iconSet={'FontAwesome'}
                                                />
                                            </View>
                                            <View style={styles.cardRightTitle}>
                                                <Text style={{fontSize: 16}}>שירות</Text>
                                            </View>
                                        </View>
                                        {/*Bot Border*/}
                                        <View style={styles.cardBottomBorder}/>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>

                </View>
                {/*Footer*/}

                <View style={styles.footer}>
                    {submitButton('הזמן עכשיו', 'consumer', () => {
                        this.setModalVisible(true);
                    })}
                </View>
            </View>


        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        row: {
            flex: 1,
            flexDirection: 'row'
        },
        headerTimeView: {
            flex: 0.6,
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerTimeText: {
            color: '#000',
            fontSize: 22,
            fontWeight: 'bold',
            opacity: 0.5
        },
        serviceView: {
            flex: 1,
            justifyContent: 'center'
            , paddingRight: SW / 20
        },
        serviceText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold'
        },
        headerBorder: {
            width: 2,
            height: SH / 14,
            borderLeftWidth: 1,
            borderColor: '#fff',
            alignSelf: 'center'
        },
        serviceIconView: {
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        infoView: {
            paddingTop: 10,
            backgroundColor: '#fff',
            flex: 1,
            borderBottomWidth: 1,
            borderColor: '#9b9b9b'
        },
        infoTimeAndPriceView: {
            flex: 0.3,
            paddingLeft: SW / 20,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        infoService: {
            flex: 0.5,
            justifyContent: 'center',
            paddingRight: SW / 20
        },
        infoProPicView: {
            flex: 0.25,
            backgroundColor: 'white',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        infoProPic: {
            width: 70,
            height: 70,
            borderRadius: 100
        },
        infoAboutView: {
            flex: 0.6,
            marginRight: SW / 20,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        infoBorder: {
            width: SW,
            height: 0,
            borderBottomWidth: 0.5,
            borderColor: '#000',
            alignSelf: 'center',
            backgroundColor: '#fff'
        },
        infoReviews: {
            flex: 0.6, alignSelf: 'center',
            width: SW - ((SW / 20) * 2),
            flexDirection: 'row',
        },
        infoStarsView: {
            flex: 0.9,
            alignItems: 'center',
            flexDirection: 'row'
        },
        slideDownArrow: {
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        infoReviewCount: {
            flex: 0.9,
            justifyContent: 'center'
        },
        // Slide Down Start
        MainContainer:
            {
                flex: 1,
                paddingTop: (Platform.OS === 'ios') ? 20 : 0,
            },

        ChildView:
            {
                borderWidth: 0,
                borderColor: '#00BCD4',
            },

        TouchableOpacityStyle:
            {
                padding: 10,
                backgroundColor: '#00BCD4'
            },

        TouchableOpacityTitleText:
            {
                textAlign: 'center',
                color: '#fff',
                fontSize: 20
            },

        ExpandViewInsideText:
            {
                width: SW,
                backgroundColor: '#F6F6F6',
                alignSelf: 'center',
                alignItems: 'center'
            },

        proCard: {
            width: SW - ((SW / 20) * 2),
            height: SH / 3.2
        },
        cardNameAndImageView: {
            flex: 1.8,
            flexDirection: 'row'
        },
        cardNameAndDate: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: SW / 40
        },
        nameText: {
            color: '#000',
            fontSize: 16
        },
        cardPicProView: {
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        proPic: {
            width: 45,
            height: 45,
            borderRadius: 100
        },
        cardReview: {
            flex: 1.3,
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderColor: '#818181'
        },
        starsContainer: {
            flex: 0.33, justifyContent: 'center'
        },
        cardRightTitle: {
            flex: 1,
            justifyContent: 'center'
        },
        cardBottomBorder: {
            width: SW,
            height: 1,
            borderBottomWidth: 0.5,
            borderColor: '#000',
            alignSelf: 'center'
        },
        // Slider Down End

        footer: {
            height: SH / 8,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#f6f6f6',

        },
        //Modal
        modalView: {
            alignSelf: 'center',
            marginTop: SW / 20,
            backgroundColor: '#f6f6f6',
            height: SH - (SH / 10),
            width: SW - (SW / 10)
        },
        eXicon: {
            flex: 0.1,
            marginTop: SW / 15,
            marginLeft: SW / 15,

        },
        body: {
            flex: 1,
            alignItems: 'center',

        },


    });

