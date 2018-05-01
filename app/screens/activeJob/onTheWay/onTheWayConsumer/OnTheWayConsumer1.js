import React, {Component} from "react";
import { Alert,
    Image,
    LayoutAnimation,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    UIManager,
    View} from 'react-native';
import Header from '../../../../components/headers/Header';
import InfoItem from '../../../../components/InfoItem';
import {SW, SH} from "../../../../config/styles";
import StarRating from 'react-native-star-rating';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Communications from 'react-native-communications';

// mobx
import {inject, observer} from "mobx-react/index";

data1 =
    {
        profilePic: require('../../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',
        time: '14:00',
        jobStatus: 'onTheWay',
        price: '100'
    }
const data = [
    {
        name: 'גסיקה',
        date: '23/3/2018',
        pic: require('../../../../../assets/avatars/Loreal-Avatar.jpg'),
        review: 'שירותי ונדיב, עושה עבודה טובה ומהירה',
        price: 5,
        workTime: 2,
        service: 5,
    },
    {
        name: 'אסף',
        date: '17/3/2018',
        pic: require('../../../../../assets/avatars/avatar-sitepal.jpg'),
        review: 'אחלה גבר, מחיר אש',
        price: 5,
        workTime: 5,
        service: 5,
    },


]

@inject("userDataStore")
@observer
export default class OnTheWayConsumer extends Component {
    static navigationOptions = {
        header: null
    };

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




    componentDidMount() {
        this.setState({
            height: this.state.height * data.length + SH / 8
        })
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
    getHeight(height) {
        this.setState({textLayoutHeight: height});
    };

    render() {
        console.warn('this.props.userDataStore.focusedJob.user_pro', this.props.userDataStore.focusedJob.user_pro);
        return (
            <View style={{flex: 1,}}>
                
                <Header head={'Grey'}/>
                {/*Info*/}
                <View style={{flex: 0.5}}>
                    <View style={styles.infoView}>
                        {/*Image & service & full name*/}
                        <View style={{flex: 0.4}}>
                            <InfoItem info={this.props.userDataStore.focusedJob.user_pro}/>
                        </View>
                        {/*about*/}
                        <View style={styles.infoAboutView}>
                            <Text>חשמלאי עם וותק של 30 שנה, מתקן כל דבר שקשור{"\n"}
                                לחשמל, מנוסה ונחמד. מחירים נוחים.</Text>
                        </View>
                        {/*Border*/}
                        <View style={styles.infoBorder}/>
                        {/*reviews*/}
                        <View style={styles.infoReviews}>
                            {/*Stars*/}
                            <TouchableOpacity activeOpacity={0.3}
                                              onPress={this.expand_collapse_Function}
                                              style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.infoStarsView}>
                                    <StarIcon name="star" size={15} color="#9b9b9b" style={{paddingRight: 5}}/>
                                    <StarIcon name="star" size={15} color="#9b9b9b" style={{paddingRight: 5}}/>
                                    <StarIcon name="star" size={15} color="#9b9b9b" style={{paddingRight: 5}}/>
                                    <StarIcon name="star" size={15} color="#9b9b9b" style={{paddingRight: 5}}/>
                                    <StarIcon name="star" size={15} color="#9b9b9b" style={{paddingRight: 5}}/>
                                </View>

                                <View style={styles.slideDownArrow}>
                                    <Icon name={this.state.buttonText} size={20} color="#000"/>
                                </View>

                                <View style={styles.infoReviewCount}>
                                    <Text>0 חוות דעת</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/*Rating */}
                <View style={styles.MainContainer}>

                    <ScrollView style={styles.ChildView}>


                        <View style={{
                            height: this.state.updatedHeight,
                            overflow: 'hidden'
                        }}>

                            <View style={[styles.ExpandViewInsideText, {height: this.state.height}]}
                                  onLayout={(value) => this.getHeight(value.nativeEvent.layout.height)}>
                                {data.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.proCard}>
                                            {/*Name and Image*/}
                                            <View style={styles.cardNameAndImageView}>
                                                <View style={styles.cardNameAndDate}>
                                                    <Text style={styles.nameText}>{item.name}</Text>
                                                    <Text style={{fontSize: 16}}>{item.date}</Text>
                                                </View>
                                                <View style={styles.cardPicProView}>
                                                    <Image
                                                        style={styles.proPic}
                                                        source={item.pic}
                                                    />
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
                                                        rating={item.price}
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
                                                        rating={item.workTime}
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
                                                        rating={item.service}
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


                        </View>

                    </ScrollView>

                </View>
                {/*Bottom Menu*/}
                <View style={{
                    flex: 0.12, backgroundColor: 'white', width: SW, flexDirection: 'row', borderTopWidth: 1,
                    borderColor: 'grey',
                    alignItems: 'center'
                }}>

                    <TouchableOpacity onPress={() => Alert.alert('Cancel the job coming soon')}
                                      style={{flex: 1, alignItems: 'center',}}>
                        <Image source={require('../../../../../assets/icons/cancel.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Communications.phonecall(this.props.userDataStore.focusedJob.user_pro.phone_number, true)}
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
        justifyContent: 'center'
    },
    infoBorder: {
        width: SW,
        height: 1,
        borderBottomWidth: 0.5,
        borderColor: '#000',
        alignSelf: 'center'
    },
    infoReviews: {
        flex: 0.3,
        alignSelf: 'center',
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
            backgroundColor: '#fff',
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
        justifyContent: 'center'
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
