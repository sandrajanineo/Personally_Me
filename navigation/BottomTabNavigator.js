import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

import { GlobalContext } from '../hooks/global';
import contextGlobal from '../hooks/global';

import HomeStack from './HomeStack';
import ProductsStack from './ProductsStack';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const [state, globalDispatch] = contextGlobal();

  return (
    <GlobalContext.Provider value={{state, globalDispatch}}>
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: 'Get Started',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
          }}
        />
        <BottomTab.Screen
          name="ProductsStack"
          component={ProductsStack}
          options={{
            title: 'Your Closet',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
          }}
        />
      </BottomTab.Navigator>
    </GlobalContext.Provider>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Welcome';
    case 'Links':
      return 'Links to learn more';
  }
}
