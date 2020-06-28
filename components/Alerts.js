import * as React from 'react';
import { Alert } from 'react-native';

export default InformativeAlert = async (title, msg) => {
  return new Promise(resolve => {
    Alert.alert(
      title,
      msg,
      [ { text: 'Ok', onPress: () => resolve('YES')} ],
      { cancelable: false }
    )
  });
}
