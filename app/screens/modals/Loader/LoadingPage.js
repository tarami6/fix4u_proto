import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import {SH, SW} from "../../../config/styles";
import LottieView from 'lottie-react-native';

export default class LoadinPage extends React.Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        this.animation1.play();
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>

                    <View style={{marginTop: SH / 4, width: SW,  height: 100}}>
                        <LottieView
                            ref={animation1 => {
                                this.animation1 = animation1;
                            }}
                            source={require('../../../../assets/animations/loadingFirst1.json')}
                        />
                    </View>
                    <Image
                        style={{marginTop: SH / 12}}
                        source={require('../../../../assets/icons/fix4U.png')}
                    />


                </LinearGradient>
            </View>
        )
    }
}
// progress bar
{/*<Progress.Bar progress={0.5} height={2} width={100} color={"rgba(255, 255, 255, 1)"} unfilledColor={'#CACACA'}/>*/
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});