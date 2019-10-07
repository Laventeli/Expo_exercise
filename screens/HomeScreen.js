import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to Photo App!</Text>
                <Text style={styles.text}>Log in to continue.</Text>
                <Button 
                    title="Login without FB"
                    onPress={() => this.props.navigation.navigate("Main")}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
  text: {
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
