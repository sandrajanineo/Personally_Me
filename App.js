import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import globalContext from './hooks/global';
import { GlobalContext } from './hooks/global';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [state, globalDispatch] = globalContext();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <GlobalContext.Provider value={ {...state, ...globalDispatch} }>
            <Stack.Navigator>
              {!state.logged_in ? (
                <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: '' }} />
                </>
              ) : (
                <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false}} />
              )}
            </Stack.Navigator>
          </GlobalContext.Provider>
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
