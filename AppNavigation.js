import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/Login';
import MapLocation from './screens/maplocation';
import ListJob  from  './screens/ListJob';
import Oderdetail  from  './screens/oderdetail';

const MainNavigator = createStackNavigator({  
  
    // mapview: {screen: Example},
    Home: {screen: LoginScreen},
    // LoginSuccess: {screen: Getapex},
    JobList: {screen :ListJob },
    oderdetail: {screen: Oderdetail },
    // maplocation: {screen: MapLocation},
    // LoginSuccess: {screen: Getapex},
    
    // maplocation: {screen: MapLocation},
  });
  

export default MainNavigator;  