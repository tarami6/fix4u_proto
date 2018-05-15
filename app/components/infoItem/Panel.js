import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Easing,
    TouchableHighlight,
    Alert,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';
import {PaddingSize, SH, SW} from "../../config/styles";
import StarRating from 'react-native-star-rating';
import IconArrow from 'react-native-vector-icons/Ionicons'
import {submitButton} from "../modalSubmitButton";
import Swipeout from 'react-native-swipeout'

export default class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            expandedInner: false,
            animation1: new Animated.Value(),
            animation2: new Animated.Value(0),
            animationInner: new Animated.Value(),
            icon: 'ios-arrow-down',
            iconSize: 20
        };
    }


    toggleInner() {
        let initialValue = this.state.expandedInner ? this.state.maxHeightInner + this.state.minHeightInner : this.state.minHeightInner,
            finalValue = this.state.expandedInner ? this.state.minHeightInner : this.state.maxHeightInner + this.state.minHeightInner;

        let ex = this.state.expandedInner ? this.state.maxHeight + this.state.minHeight + this.state.maxHeightInner + this.state.minHeightInner : this.state.maxHeight + this.state.minHeight;
        let exFinal = this.state.expandedInner ? this.state.maxHeight + this.state.minHeight - (this.state.maxHeightInner ) : this.state.maxHeight + this.state.minHeight + this.state.maxHeightInner + this.state.minHeightInner - (SH / 20);

        if (this.state.expandedInner) {
            this.setState({

                icon: 'ios-arrow-down',
                iconSize: 20
            })
        } else {
            this.setState({
                icon: 'ios-close',
                iconSize: 25
            })
        }
        this.setState({
            expandedInner: !this.state.expandedInner
        });

        this.state.animation1.setValue(ex);


        this.state.animationInner.setValue(initialValue);

        Animated.parallel([
            Animated.spring(
                this.state.animation1,
                {
                    toValue: exFinal,

                }
            ),
            Animated.spring(
                this.state.animationInner,
                {
                    toValue: finalValue,

                }
            )
        ]).start(() => {
        })

    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        let imageInitial = this.state.expanded ? 1.2 : 1;
        let imageFinal = this.state.expanded ? 1 : 1.2;

        this.setState({
            expanded: !this.state.expanded
        });

        this.state.animation1.setValue(initialValue);
        Animated.spring(
            this.state.animation1,
            {
                toValue: finalValue,


            }
        ).start();


        this.state.animation2.setValue(imageInitial);
        Animated.spring(
            this.state.animation2,
            {
                toValue: imageFinal,

            }
        ).start();
    }

    _setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
        console.log("dsdsss32", this.state.maxHeight)
    }

    _setMaxHeightInner(event) {
        let max = event.nativeEvent.layout.height;
        console.log("dsd", max)
        console.log("dsd3232", this.state.maxHeight)
        this.setState({
            maxHeightInner: max,
        });
    }

    _setMinHeight(event) {
        min = event.nativeEvent.layout.height
        this.setState({
            minHeight: min,
            animation1: new Animated.Value(min),
            animation2: new Animated.Value(1)
        });
    }

    _setMinHeightInner(event) {
        min = event.nativeEvent.layout.height
        console.log("minsss", min)
        this.setState({
            minHeightInner: min,
            animationInner: new Animated.Value(min),

        });
    }

    render() {
        let pro = this.props.user;
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowID, direction) => {

            },
            onOpen: (secId, rowID, direction) => {

            },
            left: [
                {
                    onPress: () => {
                        Alert.alert('Alert', 'Are you sure you want to delete this',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => console.log('Yes Pressed')}
                            ],
                            {cancelable: true}
                            )
                    },
                     type: 'delete',
                    component:
                        <View style={{ flex:1,alignItems: 'center', justifyContent: 'center'}}><Image source={require('../../../assets/icons/delete.png')}/></View>
                }
            ],
            rowID: this.props.index,
            sectionId: 1,
        }
        return (
            <Swipeout {...swipeSettings}>
                <Animated.View
                    style={[styles.container, {height: this.state.animation1}]}>
                    <TouchableWithoutFeedback
                        activeOpacity={1}
                        color={'red'}
                        style={styles.button}
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <View>
                            <View style={{
                                flex: 1.1,
                                flexDirection: 'row',
                                height: 80,
                                zIndex: 2,
                            }}
                                  onLayout={this._setMinHeight.bind(this)}
                            >
                                <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                                    <View>
                                        {/*<Text style={{color: '#000'}}> היום {job.appointment_time? job.appointment_time.slice(0, 5) : null}</Text>*/}
                                        <View/>
                                        <View>
                                            <Text style={{alignSelf: 'flex-start', color: '#000'}}>מרחק</Text>
                                            <Text style={{color: '#000'}}>{pro.distance} ש"ח </Text>
                                        </View>
                                    </View>


                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={{color: '#000', textAlign: 'right'}}>{pro.name}</Text>
                                    {/*<Text>{hebrewServices[pro.service]} </Text>*/}
                                    <Text>{pro.service} </Text>
                                </View>
                                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                                    <Animated.Image
                                        style={{
                                            height: 60,
                                            width: 60,
                                            transform: [
                                                {
                                                    scaleX: this.state.animation2.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 1]
                                                    })
                                                },
                                                {
                                                    scaleY: this.state.animation2.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, 1]
                                                    })
                                                }
                                            ],
                                            borderRadius: 200,
                                        }}

                                        source={pro.profile_pic}/>
                                </View>
                            </View>
                            {/*Inner*/}
                            <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>

                                <Text style={{width: PaddingSize, paddingBottom: 5, alignSelf: 'center'}}>
                                    {pro.description}
                                </Text>

                                <Animated.View
                                    style={[{
                                        backgroundColor: '#fff',
                                        overflow: 'hidden'
                                    }, {
                                        height: this.state.animationInner,
                                    }]}>
                                    <TouchableWithoutFeedback
                                        style={styles.button}
                                        onPress={this.toggleInner.bind(this)}
                                        underlayColor="#f1f1f1">
                                        <View>
                                            <View style={{
                                                flexDirection: 'row',
                                                borderBottomWidth: 1,
                                                borderTopWidth: 1,
                                                borderColor: "#000",
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                height: SH / 20
                                            }}
                                                  onLayout={this._setMinHeightInner.bind(this)}>
                                                <View style={{flex: 0.1, justifyContent: 'center'}}>

                                                    <IconArrow name={this.state.icon} size={this.state.iconSize}/>

                                                </View>
                                                <View style={{flex: 0.5, justifyContent: 'center'}}>
                                                    <StarRating
                                                        disabled={false}
                                                        maxStars={5}
                                                        rating={4}
                                                        starSize={14}
                                                        fullStarColor={'#ffd700'}
                                                        emptyStar={'star'}
                                                        iconSet={'FontAwesome'}
                                                    />
                                                </View>

                                                <View style={{flex: 1.4}}>
                                                    <Text> 2 חוות דעת </Text>
                                                </View>
                                            </View>
                                            <View onLayout={this._setMaxHeightInner.bind(this)}>
                                                {/*Personal Info Name Image and date*/}
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    paddingBottom: 10,
                                                    paddingTop: 10
                                                }}>

                                                    <View style={{paddingRight: 10}}>
                                                        <Text style={{color: '#000'}}>{pro.reviews[0].name}</Text>
                                                        <Text>{pro.reviews[0].date}</Text>
                                                    </View>
                                                    <View>
                                                        <Image style={{width: 50, height: 50, borderRadius: 100}}
                                                               source={pro.reviews[0].profile_pic}/>
                                                    </View>
                                                </View>

                                                <View style={{
                                                    width: SW / 7,
                                                    borderBottomWidth: 1,
                                                    borderColor: '#000',
                                                    alignSelf: 'flex-end'
                                                }}/>
                                                <View style={{paddingTop: 10, paddingBottom: 10}}>
                                                    <Text>{pro.reviews[0].description}</Text>
                                                </View>
                                                <View style={{
                                                    width: SW / 7,
                                                    borderBottomWidth: 1,
                                                    borderColor: '#000',
                                                    alignSelf: 'flex-end'
                                                }}/>
                                                {/*Rating Stars*/}
                                                <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                                                    <View style={{flex: 0.1,}}/>
                                                    <View style={{flex: 0.5}}>
                                                        <StarRating
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={4}
                                                            starSize={14}
                                                            fullStarColor={'#ffd700'}
                                                            emptyStar={'star'}
                                                            iconSet={'FontAwesome'}
                                                        />
                                                    </View>
                                                    <View style={{flex: 1.4}}>
                                                        <Text>מחיר</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <View style={{flex: 0.1,}}/>
                                                    <View style={{flex: 0.5}}>
                                                        <StarRating
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={4}
                                                            starSize={14}
                                                            fullStarColor={'#ffd700'}
                                                            emptyStar={'star'}
                                                            iconSet={'FontAwesome'}
                                                        />
                                                    </View>
                                                    <View style={{flex: 1.4}}>
                                                        <Text>זמן עבודה</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                                                    <View style={{flex: 0.1,}}/>
                                                    <View style={{flex: 0.5}}>
                                                        <StarRating
                                                            disabled={false}
                                                            maxStars={5}
                                                            rating={4}
                                                            starSize={14}
                                                            fullStarColor={'#ffd700'}
                                                            emptyStar={'star'}
                                                            iconSet={'FontAwesome'}
                                                        />
                                                    </View>
                                                    <View style={{flex: 1.4}}>
                                                        <Text>שירות</Text>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Animated.View>
                                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                                    {submitButton('בקשת התחברות', 'orangeBorder', () => {
                                        console.log('submited')
                                    })}
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </Animated.View>
            </Swipeout>
        )
            ;
    }
}

let styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderColor: "#000"
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
    button: {},
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        padding: 10,
        paddingTop: 0
    }
});

