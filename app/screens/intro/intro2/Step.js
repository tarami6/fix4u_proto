import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import OpenScreen1 from './steps/OpenScreen1';
import OpenScreen2 from './steps/OpenScreen2';
import OpenScreen3 from './steps/OpenScreen3';
import {SW, SH} from "../../../config/styles";
import {inject, observer} from "mobx-react/native";

@inject("authStore")
@observer
export default class Step extends Component {


// Within your render function


    render() {
        return (
            <View style={{flex: 1}}>
                <IndicatorViewPager
                    style={{flex: 1}}
                    indicator={this._renderDotIndicator()}
                    initialPage={2}
                >
                    {/*third page  */}
                    <View>
                        <OpenScreen3/>
                    </View>
                    {/*second page*/}
                    <View>
                        <OpenScreen2/>
                    </View>
                    {/*first page*/}
                    <View>
                        <OpenScreen1/>
                    </View>
                </IndicatorViewPager>
                <LinearGradient colors={['#FF8D00', '#FF8600']} style={{justifyContent: 'center', height: SW / 5}}>
                    <TouchableOpacity onPress={() => this.props.skipIntro()} >

                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 14, textAlignVertical: 'center', height: SH/12}}>דלג</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        );
    }


    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} selectedDotStyle={styles.dotSelected} dotStyle={styles.dotStyle}/>;
    }


}
const styles = StyleSheet.create({
  dotSelected: {
    height: 8,
    width: 8,
    borderRadius: 20 >> 1,
    margin: 15 >> 1,
    backgroundColor: '#fff',
    opacity: 1
  },
    dotStyle:{
      height: 8,
    width: 8,
    borderRadius: 20 >> 1,
    margin: 15 >> 1,
    backgroundColor: '#9b9b9b',
    opacity: 1
    }
})
// Later on in your styles..
