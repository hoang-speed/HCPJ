import * as React from 'react';
import { Text, View, StyleSheet, Image,
  Button,Alert,TouchableOpacity,ScrollView,
  Dimensions,StatusBar,TextInput
 } from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';




export default class Flatlists extends React.Component {
    constructor(props){
     super(props);
     
    }
    static navigationOptions = ({navigation})=>{
      return { 
        title : 'List công việc'    
      }    
     };
 
  
  render() {
  
   
    return (
          
         <TouchableOpacity onPress={this.props.onPress}>     
           
        
          <View style={styles.wrapper_oder}>
            <View style={styles.view_oder}>
              <Text style={styles.oder_id }>Oder_ID</Text>
              <Text style={styles.oder_content}>{this.props.id}</Text>
            </View>  
            <View style={styles.view_oder}>
              <Text style={styles.oder_id }>Oder_time</Text>
              <Text style={styles.oder_content}>{this.props.time}</Text>
            </View>  
            <View style={styles.view_oder}>
              <Text style={styles.oder_id }>Status</Text>
              <Text style={styles.oder_content}>{this.props.status}</Text>
            </View> 
            <View style={styles.view_oder}>
              <Text style={styles.oder_id }>Total</Text>
              <Text style={styles.oder_content}>{this.props.total}</Text>
            </View> 
          </View>   
         </TouchableOpacity>                                                                                
    )}
}




const styles = StyleSheet.create({
    // wrapper: { flex: 1, backgroundColor: '#fff' },
    wrapper_oder :{
      backgroundColor: '#DD3C6E',
      marginHorizontal :10,
      marginTop : 15,
      paddingHorizontal :10,
      borderRadius :2
    },
   
    view_oder : { 
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
     },
    oder_id : { color: '#fff', fontWeight: 'bold' },
    oder_content: { color: '#fff' },

});