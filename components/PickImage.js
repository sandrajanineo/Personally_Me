import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';

export default function PickImage ( props ) {

  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Alert',
          'This applicaton needs access to your photo library to upload images.' 
          + '\n'+ 'Please go to Settings of your device and grant permissions to Photos.',
          [
            { text: 'Not Now', style: 'cancel' },
            { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
          ],
          { cancelable: false }
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.addImage(result.uri);
    }
  }

  return (
    <>
    <Button
      title="Pick an image from camera roll"
      onPress={pickImage}
    />
    </>
  )
}