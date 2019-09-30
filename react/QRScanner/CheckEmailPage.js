'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

export default class CheckEmailView extends Component {

constructor(props) {
  super(props);
  this.state = {
    isLoading: true
  }
}

_retrieveName = async () => {
  console.log('_retrieveName Called');
  try {
    const fullName = await AsyncStorage.getItem('name');
    if (fullName !== null) {
      // We have data!!
      console.log('FULL NAME: ' + fullName);
      this.setState({isLoading: true});
      return fullName;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
}

render() {
  //var name = this._retrieveName();
  var name = this.props.navigation.state.params.name;
  console.log(name);
  
  return (
    <View style={styles.container}>
      <Text style = {styles.description}>Hi {name}</Text>
   	  <Text style = {styles.description}>Check your email</Text>
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