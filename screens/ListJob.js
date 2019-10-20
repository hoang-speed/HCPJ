import * as React from 'react';
import { Text, View, StyleSheet,ScrollView,FlatList } from 'react-native';
import Constants from 'expo-constants';
import Flatlists  from './listcontent';
import StorageHandler from '../Util/StorageHandler'

export default class ListJob extends React.Component {
    constructor(props){
     super(props);
     this.state= {
     paramsup : this.props.navigation.state.params.del_id,
       datas : [],
     } 
  }
  
  static navigationOptions = ({navigation})=>{
    return { 
      title : 'Công việc'    
    }    
   };
   
   componentWillMount() {
    StorageHandler.setAsyncStorage('status', 'STOP')
    //function get data from server apex;
   }
   
  //  componentDidMount() {
  //   this.refreshData();
  // }
  // refreshData = ()=>{
  //   getdata().then((datas)=>{
  //     this.setState({data:datas});
  //   }).catch((error)=>{
  //     this.setState({data : []});
  //   })
  // }

  




  
  render() {
    const {params}= this.props.navigation.state
    const dataget = params.data;
    const thamso = params.del_id;
    return (
      <View style={styles.container}>
         <ScrollView> 
           <FlatList
            
            data={dataget}
            renderItem={({ item }) => <Flatlists
             id={item.Oder_id}
             time={item.Odertime}
             status={item.status}
             total={item.oder_detail.SĐT} 
             onPress={() => this.props.navigation.navigate('oderdetail', 
             {thamso: params.del_id,detail:item.oder_detail})}
              />}
            keyExtractor={item => item.Oder_id}
      />
         </ScrollView>
         
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
});
