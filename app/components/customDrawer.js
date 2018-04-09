/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Consumer from '../screens/drawer/consumer'
import Pro from '../screens/drawer/pro'

export default class CustomDrawer extends Component {


  render() {
    // consumer or pro, change based on login user props
    let currenUser = 'Consumer'

    switch (currenUser) {
      case 'Consumer':
        return (
          <Consumer />
        );
        break;
      case 'Pro':
        return (
          <Pro />
        );
        break;
      default:
        return <View />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
