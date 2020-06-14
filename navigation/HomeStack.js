import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OutfitGeneratorForm from '../screens/OutfitGeneratorForm';
import OutfitGenerator from '../screens/OutfitGenerator';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="OutfitGeneratorForm" component={OutfitGeneratorForm} />
      <HomeStack.Screen name="OutfitGenerator" component={OutfitGenerator} />
    </HomeStack.Navigator>
  );
}
