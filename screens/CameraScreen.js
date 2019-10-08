import React from 'react';
import { Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { ThemeColors } from 'react-navigation';
import * as FileSystem from 'expo-file-system';

let photoId = 0;

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
    contentUri: null,
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async saveImage(photo) {
    let uri = this.state.imageuri;
    console.log('lets save image');
    console.log(photo);
    const dir = FileSystem.documentDirectory + 'photos/'
    await FileSystem.makeDirectoryAsync(dir, {intermediates: true });
    await FileSystem.moveAsync({
                        from: uri,
                        to: `${FileSystem.documentDirectory}photos/Photo_${
                        ++photoId
                        }.jpg`});
    this.setState({contentUri: true});                     
      //let info = await FileSystem.getInfoAsync(this.state.imageuri); //TODO FileSystem.copyAsync - make a permanent copy
      //console.log(info);
  
      //let directory = await FileSystem.readDirectoryAsync(this.state.imageuri);
      //console.log(directory);        
            
    //let contentUri = await FileSystem.getContentUriAsync(uri);
    //console.log(contentUri);
    //this.setState({contentUri: contentUri});
  }

  async snapPhoto() {      
    if (this.camera) {
      const options = { quality: 1, base64: false, fixOrientation: true, exif: true, skipProcessing: true};
      let photo = await this.camera.takePictureAsync(options);
      photo.exif.Orientation = 1;  
      alert('Photo taken')         
      this.setState({imageuri: photo.uri})
      console.log("state:" + this.state.imageuri);
      this.saveImage(photo); 
     }
    }
  
  render() {
    console.log('photoID:', photoId);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.contentUri) {
      return <Image
      style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
      source={{uri: `${FileSystem.documentDirectory}photos/Photo_${
        photoId
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
