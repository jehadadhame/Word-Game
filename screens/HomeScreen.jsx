import { View, Text, Button, StyleSheet } from 'react-native';
import { getUserName, saveUserName } from '../utils/storage'

const HomeScreen = ({ navigation }) => {
  // initialRouteName = await getUserName()
  // console.log(initialRouteName);
  console.log(typeof (navigation));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Word Game!</Text>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('Game')}
      />
      <Button
        title="Leaderboard"
        onPress={() => navigation.navigate('Leaderboard')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="back"
        onPress={() => navigation.goBack()}
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

export default HomeScreen;

