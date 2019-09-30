/*
 * Full screen QR code scanner example
 */

// Move the QR Scanner to its own page set - ScanPage.js

'use strict';
//import './shim.js';
import React, { Component } from 'react';

import {
  Platform,
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Dimensions,
  Text,
  Linking
} from 'react-native';

import ScanPage from './ScanPage';
import SignUpPage from './SignUpPage';
import CheckEmailPage from './CheckEmailPage';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {

  componentDidMount() { // B
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }4
  }

  componentWillUnmount() { // C
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = (event) => { // D
    this.navigate(event.url);
  }
  navigate = (url) => { // E
    const {
      navigate
    } = this.props.navigation;
    console.log(url);
    const route = url.replace(/.*?:\/\//g, '');
    //const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];
    console.log(routeName);
    if (routeName === 'confirmed') {
      navigate('CheckEmailPage')
    };
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Creative Passport',
          component: SignUpPage,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
	description: {
		fontSize: 18, 
		textAlign: 'center',
		color: '#656565',
		marginTop: 65,
	},
	container: {
	  flex: 1,
	},
});
