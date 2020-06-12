import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Collection from '../screens/Collection';
import ItemDetail from '../screens/ItemDetail';
import Closet from '../screens/Closet';
import AddItem from '../screens/AddItem';

const ProductsStack = createStackNavigator();

export default function ProductsStackScreen() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name="Closet" component={Closet} />
      <ProductsStack.Screen name="Collection" component={Collection} />
      <ProductsStack.Screen name="ItemDetail" component={ItemDetail} />
      <ProductsStack.Screen name="AddItem" component={AddItem} />
    </ProductsStack.Navigator>
  );
}
