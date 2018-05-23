/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
// import OpenScreen3 from '../../../components/infoScreens/OpenScreen3'
import Step from './Step';


export default class Intro2 extends Component {

    render() {
        return (
            <Step skipIntro={() => this.props.navigation.navigate('GeneralAuth')}/>
        );
    }
}
