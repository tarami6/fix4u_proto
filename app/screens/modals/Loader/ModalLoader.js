import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {SW} from "../../../config/styles";

export default class ModalLoader extends React.Component {
    static navigationOptions={
        header: null
    }

    componentDidMount() {
        this.animation2.play();
    }
    render() {
        return (
            <View style={{flex:1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center',justifyContent: 'center'}}>
                <View style={{flex:0.2, width: SW}}>
                    <LottieView
                            ref={animation2 => {
                                this.animation2 = animation2;
                            }}
                            source={require('../../../../assets/animations/yelloader.json')}
                        />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});