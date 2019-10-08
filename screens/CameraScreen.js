import React from 'react';
import { Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { ThemeColors } from 'react-navigation';
import * as FileSystem from 'expo-file-system';


export default class CameraScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Camera',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'green'
    }
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageuri: null,
    imageId: null,
    newImage: false,
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentWillUnmount() {
    console.log('unmounting camerascreen');
  }

  async saveImage(uriphoto, id) {
    console.log('fc saveImage - uriphoto:', uriphoto);
    console.log('fc saveImage - id:', id);
    const dirUri = FileSystem.documentDirectory + 'photos/'
    await FileSystem.makeDirectoryAsync(dirUri, {intermediates: true });
    await FileSystem.moveAsync({
                        from: uriphoto,
                        to: `${FileSystem.documentDirectory}photos/Photo_${
                        id
                        }.jpg`});
    alert('Photo saved')  
    console.log('image saved, id is', id);                    
    this.setState({newImage: true, imageId: id});  
    console.log('image save2 (after setstat', this.state.imageId);                 
      //let info = await FileSystem.getInfoAsync(this.state.imageuri); //TODO FileSystem.copyAsync - make a permanent copy

  }
 
  async snapPhoto() {      
    if (this.camera) {
      const options = { quality: 1, base64: false, fixOrientation: true, exif: true, skipProcessing: true};
      let photo = await this.camera.takePictureAsync(options);
      photo.exif.Orientation = 1;  
      // -------------
      this.saveImage(photo.uri, this.idGenerator())
     }
    }

  idGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4());
  }
  


  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.newImage) {
      return <Image
      style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
      source={{uri: `${FileSystem.documentDirectory}photos/Photo_${
        this.state.imageId
        }.jpg`}}
    />
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.snapPhoto()
                
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
