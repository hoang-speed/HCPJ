
import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {

  constructor() {
    super();
    console.log('Constructor Called.');
  }
    state = {
      email: '',
      password: '',
    };
  static navigatioOption ={
    title: 'Home',
  };
  
  // onLogin() {
  //   const { email, password } = this.state;

  //   Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  // }

  render() {
    const {navigation}= this.props;
    return (
      <View style={styles.container}>
      <Text style={styles.titleText}>Hi, Welcome To</Text>
        <Text style={styles.titleText}>HC-GPS</Text>
        <TextInput
          value={this.state.email}
          keyboardType = 'email-address'
          onChangeText={(email) => this.setState({ email })}
          placeholder='email'
          placeholderTextColor = 'white'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'password'}
          secureTextEntry={true}
          placeholderTextColor = 'white'
          style={styles.input}
        />
        
     
        <TouchableOpacity
          style={styles.button}
          onPress={() =>navigation.navigate('LoginSuccess', {name: 'Jane'})}
       >
         <Text style={styles.buttonText}> Sign Up / Login </Text>
       </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'salmon',
  },
  titleText:{
    // fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText:{
    // fontFamily: 'Baskerville',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    // fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});
