import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "./src/Screens/MainScreen";
import ProfileScreen from './src/Screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" >
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile Details" }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;