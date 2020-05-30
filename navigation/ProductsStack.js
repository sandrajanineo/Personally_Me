import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tops from '../screens/Tops';


const ProductsStack = createStackNavigator();

export default function ProductsStackScreen() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name="Tops" component={Tops} />
    </ProductsStack.Navigator>
  );
}
