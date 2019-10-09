import React from "react";
import { ScrollView, Image, StyleSheet, Text, View} from "react-native";
import * as FileSystem from "expo-file-system";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const dirUri = FileSystem.documentDirectory + 'photos/';

class ImageView extends React.Component {
  render() {
    const imageUri = `${dirUri}${this.props.name}`;
    return (
      <View>
        <View style={styles.imageView}>
          <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.wrapper}>
              <Image style={styles.image} source={{ uri: imageUri }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onDelete}>
            <Ionicons name="md-close" size={50} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    );
  }
}

export default class GalleryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Gallery',
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
    files: []
  };

  async componentDidMount() {
    // loads images from the directory
    try {
      await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      const fileNames = await FileSystem.readDirectoryAsync(dirUri);
      let id = 0;
      this.setState({
      files: fileNames.map(fileName => ({ name: fileName, id: id++ }))
    });
    } catch (error) {
      alert(error);
    }
  }

  async deleteImage(id) {
    const toDelete = this.state.files.filter(file => file.id === id);
    await FileSystem.deleteAsync(dirUri + toDelete[0].name);
    this.setState({ files: this.state.files.filter(file => file.id !== id) });
  }

  loadDetail(fileName) {
    this.props.navigation.navigate('Image', {
      uri: `${dirUri}${fileName}`,
      name: fileName
    });
  }

  render() {
    if (this.state.files.length < 1) {
      return <Text>No images</Text>;
    } else {
      let imageList = this.state.files.map(file => {
        return (
          <ImageView
            key={file.id}
            name={file.name}
            onDelete={() => this.deleteImage(file.id)}
            onPress={() => this.loadDetail(file.name)}
          />
        );
      });
      return <ScrollView style={styles.container}>{imageList}</ScrollView>;
    }
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 30
  },
  image: {
    width: 120,
    height: 80
  },
  wrapper: {
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    elevation: 2
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    marginLeft: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
