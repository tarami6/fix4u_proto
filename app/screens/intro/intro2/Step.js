import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import OpenScreen1 from './steps/OpenScreen1';
import OpenScreen2 from './steps/OpenScreen2';
import OpenScreen3 from './steps/OpenScreen3';
import {SH, SW} from "../../../config/styles";
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
                <TouchableOpacity onPress={()=>this.props.skipIntro()}>
                    <LinearGradient colors={['#FF8D00', '#FF8600']} style={{justifyContent: 'center', height: SW / 5}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 14}}>דלג</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }


    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3}/>;
    }


}
// Later on in your styles..
