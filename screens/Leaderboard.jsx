import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Leaderboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {/* Here, you will display the leaderboard */}
      <Button
        title="Back to Home"
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

export default Leaderboard;
