import React from 'react';
import { ScrollView, Image, Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity } from 'react-native-gesture-handler';

const dirUri = FileSystem.documentDirectory + 'photos/'

class ImageView extends React.Component {
    render() {
        const imageUri = `${dirUri}${this.props.name}`
        return (
            <View>
                <TouchableOpacity  onPress={this.props.onPress}>
                    <Image style={{width: 50, height: 50}}
                        source={{uri: imageUri}}
                    />
                </TouchableOpacity>
                <Button title="delete" onPress={this.props.onDelete}/>
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

export default class GalleryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Gallery',
    headerTintColor: 'white',
    headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
    headerStyle: {
      backgroundColor: 'black'
    }
  }
  
  state = {
      files: [],
  }

  async componentDidMount() {
    // load images from the directory
    await FileSystem.makeDirectoryAsync(dirUri, {intermediates: true });
    const fileNames = await FileSystem.readDirectoryAsync(dirUri)
    let id = 0;
    this.setState({files: fileNames.map(fileName => ({name: fileName, id: id++}))})
  }

    async deleteImage(id) {
        const toDelete = this.state.files.filter(file => file.id === id)
        await FileSystem.deleteAsync(dirUri + toDelete[0].name)
        this.setState({files: this.state.files.filter(file => file.id !== id)})
    }

    loadDetail(fileName) {
        console.log(fileName);
        this.props.navigation.navigate('Image', {uri: `${dirUri}${fileName}`, name: fileName})
    }

    render() {
        if (this.state.files.length < 1) {
            return (
                <Text>No images</Text>
            )
        }
        else {
            let imageList = this.state.files.map((file) => {
                return (<ImageView 
                        key={file.id} 
                        name={file.name} 
                        onDelete={() => this.deleteImage(file.id)} 
                        onPress={() => this.loadDetail(file.name)}
                        />)
            })
            return(
                <ScrollView style={styles.container}>
                    {imageList} 
                </ScrollView>
            )
        }              
    }
}


const styles = StyleSheet.create({
  text: {
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});