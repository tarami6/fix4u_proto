import React, {Component} from "react";
import {
    Alert,
    Image,
    LayoutAnimation,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import Text from '../../../../components/text/Text'
import Header from '../../../../components/headers/Header';
import InfoItem from '../../../../components/InfoItem';
import {SW, SH, GOLD} from "../../../../config/styles";
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';
import {formatTime} from "../../../../generalFunc/generalFunctions";
import {getAvgRating} from "../../../../generalFunc/generalFunctions";

// mobx
import {inject, observer} from "mobx-react/index";

@inject("modalsStore")
@inject("userDataStore")
@inject("openJobsStore")
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
            height: this.state.height * this.props.userDataStore.focusedJob.user_pro.pro_reviews.length + SH / 8
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


    cancelJob(){
        this.props.modalsStore.showModal("consumerCancelJobModal");
    }





    render() {
        let reviews = this.props.userDataStore.focusedJob.user_pro.pro_reviews ? this.props.userDataStore.focusedJob.user_pro.pro_reviews.slice(0) : [];
        let job = this.props.userDataStore.focusedJob.user_pro;
        let rating = getAvgRating(
            job.price_rating_avg,
            job.time_rating_avg,
            job.performance_rating_avg,
        );
        return (
            <View style={{flex: 1,}}>

                <Header head={'Grey'} props={this.props}/>
                {/*Info*/}
                <View style={{flex: 0.5}}>
                    <View style={styles.infoView}>
                        {/*Image & service & full name*/}
                        <View style={{flex: 0.5}}>
                            <InfoItem info={this.props.userDataStore.focusedJob}
                                      previousPage={'ScheduleConsumer'}/>
                        </View>
                        {/*about*/}
                        <View style={styles.infoAboutView}>
                            <Text>{job.company_description}</Text>
                        </View>
                        {/*Border*/}
                        <View style={styles.infoBorder}/>
                        {/*reviews*/}
                        <View style={styles.infoReviews}>
                            {/*Stars*/}
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.infoStarsView}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        starSize={15}
                                        fullStarColor={GOLD}
                                        rating={rating}
                                    />
                                </View>

                                <View style={styles.infoReviewCount}>
                                    <Text> {reviews ? reviews.length : 0} חוות דעת </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/*Rating */}
                <View style={styles.MainContainer}>

                    <ScrollView style={styles.ChildView}>


                        <View style={styles.ExpandViewInsideText}>
                            {reviews && reviews.map((item, index) => {
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
                {/*Bottom Menu*/}
                <View style={{
                    flex: 0.12, backgroundColor: 'white', width: SW, flexDirection: 'row', borderTopWidth: 1,
                    borderColor: 'grey',
                    alignItems: 'center'
                }}>

                    <TouchableOpacity onPress={() => this.cancelJob()}
                                      style={{flex: 1, alignItems: 'center',}}>
                        <Image source={require('../../../../../assets/icons/cancel.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Communications.phonecall(this.props.userDataStore.focusedJob.user_pro.phone_number, true)}
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
        width: SW - (SW / 10),
        justifyContent: 'center',
        alignSelf: 'center',
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
            backgroundColor: '#f6f6f6',
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
