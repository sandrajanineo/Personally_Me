import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Collection from '../screens/Collection';
import ItemDetail from '../screens/ItemDetail';
import ClosetItems from '../screens/ClosetItems';

const ProductsStack = createStackNavigator();

export default function ProductsStackScreen() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name="ClosetItems" component={ClosetItems} />
      <ProductsStack.Screen name="Collection" component={Collection} />
      <ProductsStack.Screen name="ItemDetail" component={ItemDetail} />
    </ProductsStack.Navigator>
  );
}
