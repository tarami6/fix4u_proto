/* @flow weak */

import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import Text from "../../../../../components/text/Text"  ;

import {CardRow} from './index'

import {SW, SH} from "../../../../../config/styles";



const services = [
    {
        name: 'Locksmith',
        qty: 0,
        uri: require('../../../../../../assets/icons/serviceColor/Locksmith.png')
    },
    {
        name: 'TechnicianWashingMachines',
        qty: 1,
        uri: require('../../../../../../assets/icons/serviceColor/TechnicianWashingMachines.png')
    },
    {
        name: 'Electrician',
        qty: 17,
        uri: require('../../../../../../assets/icons/serviceColor/Electrician.png')
    },
    {
        name: 'Cleaner',
        qty: 34,
        uri: require('../../../../../../assets/icons/serviceColor/Cleaner.png')
    },
    {
        name: 'Handyman',
        qty: 273,
        uri: require('../../../../../../assets/icons/serviceColor/Handyman.png')
    },
    {
        name: 'Plumber',
        qty: 17,
        uri: require('../../../../../../assets/icons/serviceColor/Plumber.png')
    },
    {
        name: 'AirConditioningTechnician',
        qty: 34,
        uri: require('../../../../../../assets/icons/serviceColor/AirConditioningTechnician.png')
    },
]

class CardList extends React.Component {
    _keyExtractor = (item, index) => index + '';

    render() {
        return (
            <View style={{marginTop: -105, flex: 1, alignItems: 'center'}}>
                <Text type={'whiteTitle'}>
                    איזה שירות תרצה לבחור היום?
                </Text>
                <View style={styles.containerServices}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        scrollEnabled={false}
                         columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
                        data={services}
                          numColumns={2}
                        keyExtractor={this._keyExtractor}
                        renderItem={(item) => (
                            <View style={{flex:1,marginBottom: SH / 30, alignItems: 'center'}}>
                                      <CardRow service={item} nextStep={this.props.nextStep}/>
                            </View>

                            )}
                    />
                </View>
            </View>
        )
    }
}

export default CardList;

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },

        containerServices: {
            flex: 1,
            width: SW - (SW /20 * 2),
            marginTop: SH / 30,
            flexDirection: 'row',
            flexWrap:
                'wrap',
            justifyContent:
                'center',
            alignItems: 'center',
        },

    })
;
