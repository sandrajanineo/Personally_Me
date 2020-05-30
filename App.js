import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

// import Firebase from './dbConfig';

import useCachedResources from './hooks/useCachedResources';
import auth from './hooks/auth';
import BottomTabNavigator from './navigation/BottomTabNavigator';
// import LinkingConfiguration from './navigation/LinkingConfiguration';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            logged_in: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            logged_in: false,
          };
      }
    },
    {
      logged_in: false,
      isSignout: false
    }
  );
  
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
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
