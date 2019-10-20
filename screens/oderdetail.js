import * as React from 'react';
import {
  Text, View, StyleSheet, Image,
  Button, Alert, TouchableOpacity, ScrollView,
  Dimensions, StatusBar, TextInput, AsyncStorage,
} from 'react-native';
import StorageHandler from '../Util/StorageHandler'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default class Oderdetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // Default
      btnStartEndName: 'START',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chi tiết Đơn Hàng'
    }
  };

  async componentWillMount() {
    value = await StorageHandler.getAsyncStorage('status');
    console.log('Constructor, status = ' + value);

    if (value === 'PROCESSING') {
      // PROCESSING -> btnStartEnd lable shows END
      this.setState({
        btnStartEndName: 'END',
      });
    } else {
      // Stop -> btnStartEnd lable shows START
      this.setState({
        btnStartEndName: 'START',
      });
    }
  }

  _onAccidentHandler = async (trangthai) => {
    // try {
    //   await AsyncStorage.setItem('trangthai: key', trangthai);
    //   console.log("save ok");
    // } catch (error) {
    //   console.log(error);
    // }
  }
  _onStartEndJobHandler = async () => {
    try {
      value = await StorageHandler.getAsyncStorage('status');
      console.log('status = ' + value);
      console.log(typeof (value));
      console.log(typeof ('PROCESSING'));
      console.log(value != 'PROCESSING');
      if (value === 'PROCESSING') {
        console.log('processing -> STOP')
        // processing -> STOP
        await StorageHandler.setAsyncStorage('status', 'STOP')
        this.setState({
          btnStartEndName: 'START',
        });
      } else {
        console.log('Stop -> PROCESSING')
        // Stop -> PROCESSING
        await StorageHandler.setAsyncStorage('status', 'PROCESSING')
        this.setState({
          btnStartEndName: 'END',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    // const DEL_ID = this.props.navigation.state.params.del_id;
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = this.uploadImageAsync(pickerResult.uri);
      }
      console.log({ uploadResponse });
      alert('Upload success, okok :(');
    } catch (e) {
      console.log({ uploadResponse });
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

  async uploadImageAsync(URI) {

    let apiUrl = 'http://118.70.197.124/ords/retail/delivery/putimage';

    let uriParts = URI.split('.');
    let nameimage = URI.split('/');
    let filename = nameimage[nameimage.length - 1];
    // let uriParts = uri.split('/');    
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();

    // URI = URI.replace("file://", "");
    console.log('Hoang');

    let options = { encoding: FileSystem.EncodingType.Base64 };
    let dataBase64 = ''
    await FileSystem.readAsStringAsync(URI, options).then(data => {
      dataBase64 = data;
    }).catch(err => {
      console.log("​getFile -> err", err);
      reject(err);
    });
    let dataByte = this.convertToByteArray(dataBase64);
    console.log(dataByte);

    // formData.append('photo', {
    //   URI,
    //   name: `photo.${fileType}`,
    //   // filename :filename,
    //   type: `image/${fileType}`,
    // });
    // formData.append('Content-Type', 'image/png');
    // console.log(formData);

    axios(apiUrl, {
      method: 'PUT',
      params: { P_DEL_ID: '100' },
      data: dataByte,
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
    }).then(
      response => {
        console.log('success up image to server apex ')
        //  console.log(response)
        console.log(JSON.stringify(response))
        // console.log("response" +JSON.stringify(response));

      }
    ).catch(err => {
      console.log('err ')
      console.log(err)
    })
  }

  convertToByteArray(input) {
    var binary_string = this.atob(input);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes
  }
  
  atob(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
    let str = input.replace(/=+$/, '');
    let output = '';
  
    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    let bc = 0, bs = 0, buffer, i = 0
  
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);
  
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
  
    return output;
  }

  render() {

    const { params } = this.props.navigation.state
    const dataget = params.detail;
    // console.log(dataget);
    return (
      <View style={styles.wrapper}>

        <View style={styles.content}>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Đơn Hàng:</Text>
            <Text style={styles.oder_infor}>{dataget.Order}</Text>
          </View>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Tên Khách Hàng:</Text>
            <Text style={styles.oder_infor}>{dataget.namecustom}</Text>
          </View>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Số điện thoại liên hệ:</Text>
            <Text style={styles.oder_infor}>{dataget.SĐT}</Text>
          </View>
          <View style={styles.address}>
            <Text style={styles.oder_infor}>Địa chỉ giao Hàng:</Text>
            <Text style={styles.oder_infor}>{dataget.address}</Text>
          </View>
          <View style={styles.contentdetail}>
            <Text style={styles.oder_infor}>Trạng thái thanh toán</Text>
            <Text style={styles.oder_infor}>{dataget.thanhtoan}</Text>
          </View>
          <View style={styles.controlStyle}>
            <TouchableOpacity style={styles.signInStyle} onPress={this._onAccidentHandler}>
              <Text style={styles.activeStyle}>ACCIDENT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpStyle} onPress={this._onStartEndJobHandler} >
              <Text style={styles.activeStyle}>{this.state.btnStartEndName}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sukien}>

          <TextInput
            style={styles.inputStyle}
            placeholder="Nhập sự cố trên đường đi"
            value={styles.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TouchableOpacity style={styles.bigButton} onPress={this._takePhoto}>
            <Text style={styles.buttonText}>Take_photo</Text>
          </TouchableOpacity>

        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 4,
    backgroundColor: '#DD3C6E',
  },
  content: {
    flex: 3,
    backgroundColor: '#EF6193',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  sukien: {
    flex: 1,
    backgroundColor: '#4095D1',
  },
  contentdetail: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    paddingVertical: 10


  },
  address: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  oder_infor: {
    color: '#fff',

  },
  controlStyle: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 50,

  },
  signInStyle: {
    backgroundColor: '#D8CB00',
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginRight: 10
  },
  signUpStyle: {
    backgroundColor: '#D8CB00',
    paddingVertical: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  },
  inputStyle: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 5,
    // flex: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20

  },
  bigButton: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 100,
    backgroundColor: '#33BB79',
    marginTop: 5,


  },
  buttonText: {
    // fontFamily: 'Avenir',
    color: '#fff',
    fontWeight: '400'
  },

});