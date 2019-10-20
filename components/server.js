import * as React from 'react';
import { Text, View, StyleSheet, Image,Button,Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';




export default class Server extends React.Component {
  state = {
    image: null,
  };

  static navigationOption ={
    hearder : null
  }

  onChooseImagePress = async ()=>{
    let result = await ImagePicker.launchCameraAsync();
    console.log(result);
    if (!result.cancelled){
      this.setState({ image: result.uri });
      this.uploadImageAsync(result.uri,"test-image")
      .then(()=>{
          Alert.alert("success")
      })
      .catch((error)=>{
        Alert.alert(error);
      })
    }
  }

   uploadImageAsync= async(uri)=> {
    let apiUrl = 'http://221.133.17.20:3030/api/dangnhap';
  
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    console.log(formData);
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch(apiUrl, options);
  }
  
  render() {
    return (

      <View> 
        <Button title="Choose image ....." onPress={this.onChooseImagePress}/>
       </View> 

    )}
}
