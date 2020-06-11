import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import auth from './hooks/auth';
import { AuthContext } from './hooks/auth';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [state, authContext] = auth();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <AuthContext.Provider value={{state, authContext}}>
            <Stack.Navigator>
              {!state.logged_in ? (
                <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                </>
              ) : (
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              )}
            </Stack.Navigator>
          </AuthContext.Provider>
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
