import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [ session_active, setSession ] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // console.log('FileSystem.documentDirectory: ', FileSystem.documentDirectory)

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        // needed for debug purposes
        // AsyncStorage.clear();

        const userID = await AsyncStorage.getItem('userID');
        if ( userID ) setSession(true);

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return [ isLoadingComplete, session_active];
}
