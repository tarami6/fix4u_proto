import React, {Component} from "react";
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import Text from '../../../../components/text/Text'
import Header from '../../../../components/headers/Header'
import InfoItem from '../../../../components/InfoItem'
import StarRating from 'react-native-star-rating';
import {msToHMS} from "../../../../generalFunc/generalFunctions";
//styles
import {SW} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";
//config
import {fetcher} from "../../../../generalFunc/fetcher";
import {sendReviewRoute} from "../../../../config/apiRoutes";
//mobx
import {inject, observer} from "mobx-react/index";


let starSize = 18;

@inject("notificationsStore")
@inject("userDataStore")
@observer
export default class Review extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            price_rating: 0,
            time_rating: 0,
            performance_rating: 0,
            review: '',
            time: ''
        }
    }

    componentDidMount(){
        let basicDate = new Date(this.props.userDataStore.focusedJob.job_start_time);
            let currentDate = new Date(this.props.userDataStore.focusedJob.job_completion_time);
            let x = new Date(currentDate - basicDate);
            let timer = msToHMS(x);
            this.setState({
                time: timer
            })

    }
    //send review start
    sendReview() {
        let route = sendReviewRoute(this.props.userDataStore.focusedJob.id);

        let headers = {
            token: this.props.userDataStore.userData.token
        };
        let sendable = true;
        let body = this.state;
        for (let item in this.state) {
            if (!this.state[item]) {
                sendable = false;
                Alert.alert('please fill in:', item)
            }
        }
        if (sendable) {
            // console.warn('sendable:', body)
            fetcher(route, 'POST', this.successCB.bind(this), this.errorCB.bind(this), body, headers);
        }
        // console.log('sentData:', route, 'POST', this.successCB.bind(this), this.errorCB, body, headers);
    }

    successCB(res) {
        let token = this.props.userDataStore.userData.token;
        this.props.notificationsStore.removePostNotifications('active', this.props.userDataStore.focusedJob.id, this.props.userDataStore.currentUserType, token)
        this.props.userDataStore.removeActivePost(this.props.userDataStore.focusedJob.id);
        this.props.navigation.navigate('AddJob');
    }

    errorCB(err) {
        console.warn('error cb at consumer Review:', err);
        // console.log('error cb at consumer Review:', err);
    }

    // //send review end


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
        Alert.alert(this.state.starCount + '')
    }

    componentWillMount() {
        // console.warn(this.props.userDataStore.userData.user.user_posts)
    }

    startJob() {
        Alert.alert('job started maybe');
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        let focusedJob = this.props.userDataStore.focusedJob;
        console.log("sassa", this.state.time)
        return (
            <View style={{flex: 1,}}>
                <Header head={'Grey'} props={this.props} />
                {/*Info*/}
                <View style={{flex: 0.23, backgroundColor: '#fff', borderBottomWidth: 0.5, borderColor: '#000'}}>
                    {/*Image & service & full name*/}
                    <View style={{flex: 0.9}}>
                        <InfoItem info={focusedJob.user_pro}/>
                    </View>


                    {/*Border*/}
                    <View style={styles.infoBorder}/>
                    {/*reviews*/}
                    <View style={styles.infoReviews}>
                        {/*Stars*/}
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 16, color: '#000'}}>{this.state.time}</Text>
                            </View>


                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 16, color: '#000'}}>סה"כ זמן עבודה</Text>
                            </View>
                        </View>

                         <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 16, color: '#000'}}>{focusedJob.total_fee}</Text>
                            </View>


                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 16, color: '#000'}}>מחיר</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/*Review*/}
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>דרג</Text>
                    </View>
                    <View style={{flex: 1, width: SW - 60}}>

                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                                <View style={{flex: 0.3, width: SW / 4,}}>
                                    <StarRating
                                        disabled={false}
                                        fullStarColor={'#ffd700'}
                                        maxStars={5}
                                        starSize={starSize}
                                        rating={this.state.price_rating}
                                        selectedStar={(rating) =>
                                            this.setState({price_rating: rating})
                                        }
                                    />
                                </View>

                            </View>
                            <View style={{flex: 1,}}>
                                <Text>מחיר</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                                <View style={{flex: 0.3, width: SW / 4,}}>
                                    <StarRating
                                        disabled={false}
                                        fullStarColor={'#ffd700'}
                                        maxStars={5}
                                        starSize={starSize}
                                        rating={this.state.time_rating}
                                        selectedStar={(rating) => this.setState({time_rating: rating})}
                                    />
                                </View>

                            </View>
                            <View style={{flex: 1,}}>
                                <Text>זמן עבודה</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                                <View style={{flex: 0.3, width: SW / 4,}}>
                                    <StarRating
                                        disabled={false}
                                        fullStarColor={'#ffd700'}
                                        maxStars={5}
                                        starSize={starSize}
                                        rating={this.state.performance_rating}
                                        selectedStar={(rating) => this.setState({performance_rating: rating})}
                                    />
                                </View>

                            </View>
                            <View style={{flex: 1,}}>
                                <Text>שירות</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 0.8,
                        backgroundColor: '#fff',
                        width: SW - 80,
                        borderRadius: 7,
                        justifyContent: 'flex-start',
                        marginTop: 10,
                        borderTopWidth: 2,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: 'grey'
                    }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            textAlignVertical={'top'}
                            style={{textAlign: 'right',}}
                            underlineColorAndroid="transparent"
                            onChangeText={(review) => this.setState({review})}
                            value={this.state.text}

                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                            {submitButton('סיים', 'consumer', () => {
                                this.sendReview();
                            })}
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

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
        flex: 0.5,
        alignSelf: 'center',
        width: SW - ((SW / 20) * 2),
    },
})