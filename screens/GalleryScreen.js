import React from 'react';
import { ScrollView, Image, Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

class ImageView extends React.Component {
    render() {
        return (
            <View>
                <Image style={{width: 50, height: 50}}
                source={{uri: `${FileSystem.documentDirectory}photos/${
                  this.props.name
                    }`}}/>
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
    headerStyle: {
      backgroundColor: 'purple'
    }
  }
  
  state = {
      files: null,
  }

    componentWillUnmount() {
        console.log('unmounting');
    }

  async componentDidMount() {
    console.log('component did mount');
    const dirUri = FileSystem.documentDirectory + 'photos/'
    let fileNames = await FileSystem.readDirectoryAsync(dirUri)
    let id = 0;
    this.setState({files: fileNames.map(fileName => ({name: fileName, id: id++}))})
    console.log(fileNames);
    if (this.state.files) console.log(this.state.files.length);
  }

    async deleteImage(id) {
        console.log(id);
        let deletable = this.state.files.filter(file => file.id === id)
        console.log(deletable);
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'photos/' + deletable[0].name)
        this.setState({files: this.state.files.filter(file => file.id !== id)})
        // delete from state
        // delete from directory
    }

    render() {
        if (this.state.files) {
            let imageList = this.state.files.map((file, index) => {
                return (<ImageView onDelete={() => this.deleteImage(file.id)} key={index} name={file.name}/>)
            })
            return(
            <ScrollView style={styles.container}>
                {imageList} 
            </ScrollView>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text>Welcome to gallery</Text>    
                </View>
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