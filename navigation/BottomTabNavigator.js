import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

import HomeStack from './HomeStack';
import ProductsStack from './ProductsStack';
import { GlobalContext } from '../hooks/global';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  const { fetchSession } = React.useContext(GlobalContext);
  React.useEffect(() => {
    fetchSession();
  }, []);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused}
            name={ Platform.OS === 'ios' ? 'ios-home' : 'md-home'} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="ProductsStack"
        component={ProductsStack}
        options={{
          title: 'Your Closet',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} 
            name={ Platform.OS === 'ios' ? 'ios-pricetags' : 'md-pricetags'} style={{ marginBottom: -3 }} />,
        }}
      />
    </BottomTab.Navigator>
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
