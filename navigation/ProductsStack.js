import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Collection from '../screens/Collection';
import ItemDetail from '../screens/ItemDetail';
import Closet from '../screens/Closet';
import AddItem from '../screens/AddItem';

import { GlobalContext } from '../hooks/global';

const ProductsStack = createStackNavigator();

export default function ProductsStackScreen(props) {
  let { resetState } = React.useContext( GlobalContext );
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name="Closet" component={Closet} />
      <ProductsStack.Screen name="Collection" component={Collection}
        options={ ({ route }) => {
          return ({
            title: route.params.collection === 'Top' ? 'Tops' : route.params.collection,
          })
        }}
      />
      <ProductsStack.Screen name="Item Detail" component={ItemDetail} />
      <ProductsStack.Screen name="Add Item" component={AddItem}
        options={{
          headerLeft: props => (
            <HeaderBackButton
              onPress={ () => {
                resetState('displayGoogle');
                props.onPress();
              }}
            />
          )
        }}/>
    </ProductsStack.Navigator>
  );
}
