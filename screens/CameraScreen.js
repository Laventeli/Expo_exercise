import React from "react";
import { Alert, Image, Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Camera',
    headerTintColor: 'white',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1
    },
    headerStyle: {
      backgroundColor: 'black'
    }
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageId: null,
    newImage: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async saveImage(photouri, id) {
    const dirUri = FileSystem.documentDirectory + 'photos/';
    try {
      await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      await FileSystem.moveAsync({
        from: photouri,
        to: `${dirUri}Photo_${id}.jpg`
      });
      Alert.alert("Photo saved");
      this.setState({ newImage: true, imageId: id });
    } catch (error) {
      alert(error);
    }
  }

  async snapPhoto() {
    if (this.camera) {
      const options = {
        quality: 1,
        base64: false,
        fixOrientation: true,
        exif: true,
        skipProcessing: true
      };
      let photo = await this.camera.takePictureAsync(options);
      this.saveImage(photo.uri, this.idGenerator());
    }
  }

  /**
   * Generates random 8-number/letter id
   */
  idGenerator() {
    var S4 = function() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.newImage) {
      // after photo has been taken
      return (
        <Image
          style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }}
          source={{
            uri: `${FileSystem.documentDirectory}photos/Photo_${this.state.imageId}.jpg`
          }}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                > Flip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flex: 0.8,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  marginBottom: 30
                }}
                onPress={() => {
                  this.snapPhoto();
                }}
              >
                <Ionicons name='md-radio-button-on' size={75} color='white' />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
