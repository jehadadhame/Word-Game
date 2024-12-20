import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Screen</Text>
      {/* Here, you will implement the game mechanics */}
      <Button
        title="End Game"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default GameScreen;
