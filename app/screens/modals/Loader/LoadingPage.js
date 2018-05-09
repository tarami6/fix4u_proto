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
        this.animation2.play();
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <LinearGradient colors={['#FFBA00', '#FF8D00']} style={{flex: 1, alignItems: 'center'}}>
                    <Image
                        style={{marginTop: SH / 4, height: '23%' , width: '27%'}}
                        source={require('../../../../assets/icons/loadingLogo.png')}
                    />
                    <Image
                        style={{marginTop: SH / 12}}
                        source={require('../../../../assets/icons/fix4U.png')}
                    />
                    <View style={{marginTop: SH / 10, alignItems: 'center', width: SW, height: 100}}>
                        <LottieView
                            ref={animation2 => {
                                this.animation2 = animation2;
                            }}
                            source={require('../../../../assets/animations/LoadingBar.json')}
                        />
                    </View>

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