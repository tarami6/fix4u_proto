import React, {Component} from "react";
import {Alert, Text, TouchableOpacity, View, StyleSheet, Image, TextInput} from 'react-native';
import Header from '../../../../components/headers/Header'
import InfoItem from '../../../../components/InfoItem'
import StarRating from 'react-native-star-rating';


//styles
import {SH, SW} from "../../../../config/styles";
import {submitButton} from "../../../../components/modalSubmitButton";

data1 =
    {
        profilePic: require('../../../../../assets/avatars/handyManAvatar.jpg'),
        name: 'אבי הבנאי',
        service: 'חשמלאי',

    }

export default class Review extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            starCount: 0,
            text: ''
        }
    }


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
        return (
            <View style={{flex: 1,}}>
                <Header head={'Grey'}/>
                {/*Info*/}
                <View style={{flex: 0.23, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#000'}}>
                    {/*Image & service & full name*/}
                    <View style={{flex: 0.9}}>
                        <InfoItem info={data1}/>
                    </View>


                    {/*Border*/}
                    <View style={styles.infoBorder}/>
                    {/*reviews*/}
                    <View style={styles.infoReviews}>
                        {/*Stars*/}
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 16, color: '#000'}}>2:15:24</Text>
                            </View>


                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 16, color: '#000'}}>סה"כ שעות עבודה</Text>
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
                            <View style={{flex: 0.5,  alignItems: 'flex-start'}}>
                                <View style={{flex: 0.3, width: SW / 4,}}>
                                    <StarRating
                                        disabled={false}
                                        fullStarColor={'#ffd700'}
                                        maxStars={5}
                                        starSize={15}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>

                            </View>
                            <View style={{flex: 1,}}>
                                <Text>מחיר</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                                <View style={{flex: 0.3, width: SW / 4, }}>
                                    <StarRating
                                        disabled={false}
                                        fullStarColor={'#ffd700'}
                                        maxStars={5}
                                        starSize={15}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>

                            </View>
                            <View style={{flex: 1,}}>
                                <Text>זמן עבודה</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 0.5,  alignItems: 'flex-start'}}>
                                <View style={{flex: 0.3, width: SW / 4,}}>
                                    <StarRating
                                        disabled={false}
                                        fullStarColor={'#ffd700'}
                                        maxStars={5}
                                        starSize={15}
                                        rating={this.state.starCount}
                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    />
                                </View>

                            </View>
                            <View style={{flex: 1, }}>
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
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                                        {submitButton('סיים','consumer', () => {
                                            this.setModalVisible(true);
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
        flexDirection: 'row',
    },
})