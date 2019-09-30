// router.js
//import React from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';

import {
    createStackNavigator
} from 'react-navigation';

import Home from './home';
import Signup from './SignUpPage';
import CheckEmailPage from './CheckEmailPage';
import ConfirmedEmailPage from './ConfirmedEmailPage';
import QRScan from './ScanPage';
import Settings from './SettingsPage';

const Router = createStackNavigator({
    Home: {
        screen: Home
    },
    Signup: {
        screen: Signup
    },
    CheckEmail: {
        screen: CheckEmailPage
    },
    ConfirmedEmail: {
        screen: ConfirmedEmailPage 
    },
    QRScan: {
        screen: QRScan
    },
    Settings: {
        screen: Settings
    },
});
export default Router;