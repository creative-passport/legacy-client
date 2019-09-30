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

export default class SettingsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }


    render() {
        

        return ( 
            <View style={styles.container}>
                <Text style={styles.signUpText}>Passport Holders Settings Page</Text>
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