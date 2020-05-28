import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

// import Firebase from './dbConfig';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
// import LinkingConfiguration from './navigation/LinkingConfiguration';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [logged_in, setLoggedIn] = React.useState(props.logged_in || false);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator>
            {logged_in ? (
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            ) : (
            <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
