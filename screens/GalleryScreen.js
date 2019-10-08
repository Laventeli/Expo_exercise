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


  async componentDidMount() {
    console.log('component did mount');
    const dirUri = FileSystem.documentDirectory + 'photos/'
    let files = await FileSystem.readDirectoryAsync(dirUri)
    this.setState({files: files})
    console.log(files);
    if (this.state.files) console.log(this.state.files.length);
  }

    render() {
        if (this.state.files) {
            let imageList = this.state.files.map((imageName, index) => {
                return (<ImageView key={index} name={imageName}/>)
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