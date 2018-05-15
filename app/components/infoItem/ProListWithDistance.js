import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight, Animated} from 'react-native';

import Panel from './Panel';

import StarRating from 'react-native-star-rating'
import {SW, GOLD} from "../../config/styles";
import {hebrewServices, ServicesArrToHebString} from "../../generalFunc/generalObjects";
import {getAvgRating} from "../../generalFunc/generalFunctions";


export default class ProListWithDistance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            animation: new Animated.Value()
        };
    }


    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event) {
        min = event.nativeEvent.layout.height
        this.setState({
            minHeight: min,
            animation: new Animated.Value(min)
        });
    }

    render() {

        let pro = this.props.user;

        console.log("ASDas", pro)
        return (
            <Animated.View
                style={[styles.container, {height: this.state.animation}]}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.toggle.bind(this)}
                    underlayColor="#f1f1f1">
                    <View style={{flex: 1}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: '#ffffff',
                            zIndex: 2,
                        }}
                        onLayout={this._setMinHeight.bind(this)}
                        >
                            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>

                                <View>
                                    {/*<Text style={{color: '#000'}}> היום {job.appointment_time? job.appointment_time.slice(0, 5) : null}</Text>*/}
                                    <View/>
                                    <View>
                                        <Text>{pro.distance} ש"ח </Text>
                                    </View>
                                </View>


                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={{color: '#000', textAlign: 'right'}}>{pro.name}</Text>
                                {/*<Text>{hebrewServices[pro.service]} </Text>*/}
                                <Text>{pro.service} </Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{width: 60, height: 60, borderRadius: 100,}}
                                    source={pro.profile_pic}/>
                            </View>
                        </View>
                        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                            <Text>TEsdf</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        )
    }
}


let styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        padding: 10,
        color: '#2a2f43',
        fontWeight: 'bold'
    },
    button: {
        flex:1,
    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        padding: 10,
        paddingTop: 0
    }
});