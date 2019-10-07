import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Photo App',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'blue'
    }
  }
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello {this.props.navigation.getParam('username')}!</Text>    

                <Button style={styles.text}
                    title="Take a photo"
                    onPress={() => this.props.navigation.navigate('Camera')}
                />
                <Button style={styles.text}
                    title="Show gallery"
                />
                <Button style={styles.text}
                    title="Go Back"
                    onPress={() => this.props.navigation.goBack()} // TODO logout
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
  text: {
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
