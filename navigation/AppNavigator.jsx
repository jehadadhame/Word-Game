// Import necessary libraries
// import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RouteName } from '../constants/routeName'
import { getUserName, saveUserName } from '../utils/storage'
// Import your screens
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import Leaderboard from '../screens/Leaderboard';
import Settings from '../screens/Settings';
import OnBordingScreen from '../screens/OnBordingScreen';

// Create a Stack Navigator
const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={RouteName.OnBordingScreen} // Set the initial screen
                screenOptions={{
                    headerShown: false, // Hide the header for custom ones if needed
                }}
            >
                {/* Define your routes/screens here */}
                <Stack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
                <Stack.Screen name={RouteName.OnBordingScreen} component={OnBordingScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
