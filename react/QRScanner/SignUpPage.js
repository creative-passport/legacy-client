'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from 'react-native';

export default class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
	  isLoading: false,
		message: '',
      fullName: '',
      email   : '',
      password: '',
    }
  }

// Async Store
_storeData = async () => {
  // Store the Name
  console.log('_storeData called - Storing Name');
  console.log('State FullName: ' + this.state.fullName);
  console.log('State Email: ' + this.state.email);
  try {
    await AsyncStorage.setItem('name', this.state.fullName);
  } catch (error) {
    // Error saving data
    console.log(error.message);
  }

  // Store the email address
  console.log('_storeData called - Storing email');
  try {
    await AsyncStorage.setItem('email', this.state.email);
  } catch (error) {
    // Error saving data
    console.log(error.message);
  }
}

_executeQuery = (email) => {
  this._storeData();
  console.log(email);
  this.setState({ isLoading: true });
  fetch('https://verifymessenger.appspot.com/email/', {
	//fetch('http://localhost:3000/email/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  })
.then((response) => response.json())
    .then((responseJson) => {
      this._handleResponse(responseJson.message);
    })
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error,
   }));
};


_handleResponse = (response) => {
  this.setState({ isLoading: false , message: '' });
  if (response == 'success') {
    const {
      navigate
    } = this.props.navigation;
    navigate('CheckEmail', {name: this.state.fullName})
  } else {
    this.setState({ message: 'A problem sending email.'});
  }
};

//  onClickListener = (viewId) => {
//	  this.props.navigator.push({
//	    title: 'Check Your Email',
//	    component: CheckEmailPage,
//	  });
    //Alert.alert("Alert", "Button pressed "+viewId);
//  }

  render() {
	const spinner = this.state.isLoading ?
	  <ActivityIndicator size='large'/> : null;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this._executeQuery(this.state.email)}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
			
			  {spinner}
			<Text style={styles.description}>{this.state.message}</Text>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#201f1b',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#e6c301",
  },
  signUpText: {
    color: 'black',
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#e6c301'
  },
});
 