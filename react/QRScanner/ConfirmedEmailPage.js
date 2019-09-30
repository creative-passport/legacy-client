'use strict';

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Alert
} from 'react-native';

//import GenerateKeyPage from './GenerateKeyPage';
import bip39 from 'react-native-bip39';

export default class ConfirmedEmailView extends Component {

    _generateMnemonic = async () => {
        try {
            const mnemonic = await bip39.generateMnemonic(256); // default to 128
            Alert.alert(
                'Write Down Your Key',
                mnemonic, [{
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }, ], {
                    cancelable: false
                }
            );
        } catch (e) {
            return false;
        }
    }

    render() {
        this._generateMnemonic();
        return ( 
        <View style = {styles.container}>
            <Text style = {styles.description}>You now have a Creative Passport</Text>
        </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#201f1b',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#e6c301",
    },
    signUpText: {
        color: 'white',
    },
    description: {
        marginBottom: 20,
        fontSize: 26,
        textAlign: 'center',
        color: '#e6c301'
    },
});