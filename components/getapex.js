import React from 'react';
import { Button, StyleSheet, Text, View,Alert,Platform } from 'react-native';
import { AuthSession } from 'expo';


const redirectUrl ='http://118.70.197.124/ords/retail/oauth/token';
const getApex = 'http://118.70.197.124/ords/retail/delivery/login?';

export default class Getapex extends React.Component {
  static navigationOption ={
    title: 'HomeLoginsucess',
  };
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open FB Auth" onPress={this._getdata} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        </View>
    );
  }

  _getdata = async () => {
    try {
      let responce = await fetch(getApex,{
        method: 'GET',
            Params: {
              'P_UNAME': 'HC',
              'P_PWD' :'231'
            }
        })
       let responcejson = await responce.json();
      console.log(responcejson);
      //  console.log(responce.json());
    //    console.log(responcejson);
       return responcejson;

    } catch(error){
        console.log(`error is : ${error}`);
      
    }
  }
  

  _handlePressAsync = async () => {
    // let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `http://118.70.197.124/ords/retail/oauth/token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${ redirectUrl}`,
    });
    this.setState({ result });
    // console.log(result);
    
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});