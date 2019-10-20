import React, { Component } from 'react';
import { Alert, Button, Text,Image, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';


export default function CategoryItem(props) {
    return(
        <View>
        <Image source= {logo}/>
        <Text style={styles.text}>CategoryListItem</Text>
    </View> 
    )    
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
  });