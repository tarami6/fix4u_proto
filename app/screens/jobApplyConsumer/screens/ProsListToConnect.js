import React from 'react';
import {StyleSheet, Image, FlatList, TouchableHighlight, View} from 'react-native';
import Text from '../../../components/text/Text'
import LinearViewBelowHeaderConsumer from '../../../components/LinearViewBelowHeaderConsumer';
import Header from '../../../components/headers/Header';
import Panel from '../../../components/infoItem/Panel'
import InfoItem from '../../../components/InfoItem';
import {SW, SH} from "../../../config/styles";

data = [
    {
        name: 'אבי חשמל בע"ם',
        service: 'חשמלאי',
        distance: 'ק"מ 120',
        profile_pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
        description: 'חשמלאי עם וותק של 30 שנה, מתקן כל דבר שקשור לחשמל, מנוסה ונחמד. מחירים נוחים.',
        reviews: [
            {
                name: 'ג"סיקה',
                profile_pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
                date: '27/3/2018',
                description: 'שירותי נדיב , עושה עבודה נהדרת',
                price_rating: 5,
                time_rating: 3,
                performance_rating: 5,
            }
        ]
    },
     {
        name: 'אבי חשמל בע"ם',
        service: 'חשמלאי',
        distance: 'ק"מ 120',
        profile_pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
        description: 'חשמלאי עם וותק של 30 שנה, מתקן כל דבר שקשור לחשמל, מנוסה ונחמד. מחירים נוחים.',
        reviews: [
            {
                name: 'ג"סיקה',
                profile_pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
                date: '27/3/2018',
                description: 'שירותי נדיב , עושה עבודה נהדרת',
                price_rating: 5,
                time_rating: 3,
                performance_rating: 5,
            }
        ]
    },
     {
        name: 'אבי חשמל בע"ם',
        service: 'חשמלאי',
        distance: 'ק"מ 120',
        profile_pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
        description: 'חשמלאי עם וותק של 30 שנה, מתקן כל דבר שקשור לחשמל, מנוסה ונחמד. מחירים נוחים.',
        reviews: [
            {
                name: 'ג"סיקה',
                profile_pic: require('../../../../assets/avatars/electricianAvatar.jpg'),
                date: '27/3/2018',
                description: 'שירותי נדיב , עושה עבודה נהדרת',
                price_rating: 5,
                time_rating: 3,
                performance_rating: 5,
            }
        ]
    },

]


export default class ProsListToConnect extends React.Component {
    static navigationOptions = {
        header: null
    }

    keyExtractor = (item) => item.id + '';

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                {/*Linear Header*/}
                <View style={{flex: 0.3}}>
                    <LinearViewBelowHeaderConsumer>
                        < Header
                            head={'AddJob'}
                            previousPage={'ApplyBaseScreen'}
                        />
                        <View style={styles.row}>
                            {/*Time counter*/}
                            <View style={styles.headerTimeView}>
                                <Text style={styles.headerTimeText}>00:00</Text>
                            </View>
                            {/*Job Info*/}
                            <View style={styles.serviceView}>
                                <Text style={styles.serviceText}>מנקה</Text>
                                <Text style={styles.serviceText}>היום 15:00
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

                <View style={{flex: 1, backgroundColor: 'transparent'}}>
                    <FlatList
                        data={data}
                        keyExtractor={this.keyExtractor}
                        renderItem={({item, index}) =>
                            <View style={{
                                width: SW,
                                backgroundColor: 'transparent',
                            }}>
                                <Panel user={item}/>


                                {/*{index === job2.post_applies.length - 1 ?*/}
                                {/*<LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0)']}*/}
                                {/*style={{width: SW, height: 3}}/>*/}
                                {/*:*/}
                                {/*<LinearGradient colors={['#c0c0c0', 'rgba(255, 255, 255, 1)']}*/}
                                {/*style={{width: SW, height: 3}}/>*/}
                                {/*}*/}
                            </View>

                        }
                    />
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
});