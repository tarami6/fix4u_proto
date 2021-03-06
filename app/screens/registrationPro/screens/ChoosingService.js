import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearViewBelowHeaderPro from '../components/LinearViewBelowHeaderPro';
import {submitButton} from "../../../components/modalSubmitButton";
import {SH, SW, mainStyles} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";
import Header from '../../../components/headers/Header';



const data = [
    {service: 'חשמלאי', state: 'Electrician'},
    {service: 'אינסטלטור', state: 'Plumber'},
    {service: 'מנקה', state: 'Cleaner'},
    {service: 'שיפוצניק', state: 'Handyman'},
    {service: 'מנעולן', state: 'Locksmith'},
    {service: 'טכנאי מכונות כביסה', state: 'TechnicianWashingMachines'},
    {service: 'תכנאי מזגנים', state: 'AirConditioningTechnician'},
]

@inject("proAuthStore")
@observer
export default class AddressInfo extends React.Component {
    static navigationOptions = {
        header: null
    };
    _keyExtractor = (item, index) => item.state;

    constructor(props) {
        super(props);

        this.state = {
            chosenServices: {},
        };

    }

    handleSubmit() {

        let serviceArr = [];
        for (let item in this.state.chosenServices) {
            if (this.state.chosenServices[item]) {
                serviceArr.push(item)
            }
        }
        if (serviceArr.length > 0) {
            this.props.proAuthStore.updatePro({services: serviceArr})
            this.props.navigation.navigate('ExplainThePro');
        }
        else {
            Alert.alert('please choose at least one service')
        }
        // this.props.navigation.navigate('DataConfirmPro')
    }

    // renderItem(item, index) {
    //
    //     return (
    //
    //     )
    // }

    render() {
        console.log(this.state.electrician)
        return (
            <View style={styles.container}>
                {/*Header Gradient*/}
                <View style={{flex: 0.5, backgroundColor: 'green'}}>
                    <LinearViewBelowHeaderPro>
                        <Header head={'AddJob'} previousPage={'AddressInfo'} props={this.props}/>
                        {/*step indicator*/}
                        <View>
                            <Image
                                    style={mainStyles.fourStepsIndicator}
                                    source={require('../../../../assets/icons/FourStepsIndicator/3.png')}
                                />
                        </View>
                        <View style={{marginTop: SH / 60, alignItems: 'center'}}>
                            <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                                מקצוע
                            </Text>

                        </View>


                    </LinearViewBelowHeaderPro>
                </View>
                <View style={styles.body}>
                    {data.map((item, index) => {
                        return (<View key={index} style={{flex: 1,}}>
                            <TouchableOpacity onPress={() => {
                                let chosenServices = Object.assign({}, this.state.chosenServices);
                                if (chosenServices[item.state]) {
                                    chosenServices[item.state] = false
                                } else {
                                    chosenServices[item.state] = true
                                }
                                this.setState({chosenServices: chosenServices})

                            }}>
                                <View style={styles.row}>
                                    <View>
                                        {this.state.chosenServices[item.state] ? <Text
                                                style={styles.chosenText}>{item.service}</Text> :
                                            <Text
                                                style={styles.serviceText}>{item.service}</Text>
                                        }

                                    </View>
                                    <View>
                                        {this.state.chosenServices[item.state] ?
                                            <Image
                                                style={{width: 20, height:20}}
                                                source={require('../../../../assets/registration/icons/Vee.png')}/> :
                                            <Image
                                                style={{width: 20, height:20}}
                                                source={require('../../../../assets/registration/icons/square.png')}/>}
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>)
                    })}
                    {/*<FlatList*/}
                    {/*data={data}*/}
                    {/*extraData={this.state}*/}
                    {/*keyExtractor={this._keyExtractor}*/}
                    {/*renderItem={({item}) => this.renderItem(item)}*/}
                    {/*/>*/}

                </View>
                <View style={styles.footer}>
                    <View style={{alignItems: 'center'}}>
                        {submitButton('המשך','consumer', () => {
                            this.handleSubmit()
                        })}
                    </View>
                </View>


            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1.5,
        alignItems: 'flex-end'
    },
    row: {
        flex: 1,
        paddingRight: SW / 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderColor: '#9a9a9a',
        borderBottomWidth: 1,
        width: SW
    },
    chosenText: {
        alignSelf: 'center',
        fontSize: 16,
        paddingRight: SW / 15,
        color: '#000'
    },
    serviceText: {
        alignSelf: 'center',
        fontSize: 16,
        paddingRight: SW / 15
    },
    footer: {
        flex: 0.5,
        justifyContent: 'center',
        marginTop: SH / 40
    }

})