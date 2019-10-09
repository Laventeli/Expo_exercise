import React from "react";
import { Image } from "react-native";

export default class ImageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam('name'),
    headerTintColor: 'white',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1
    },
    headerStyle: {
      backgroundColor: 'black'
    }
  });

  render() {
    return (
      <Image
        style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }}
        source={{ uri: this.props.navigation.getParam('uri') }}
      />
    );
  }
}
