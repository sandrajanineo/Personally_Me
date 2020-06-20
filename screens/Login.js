import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Alert } from 'react-native';

import { GlobalContext } from '../hooks/global';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function Login ( {navigation} ) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn, login_failed } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if ( login_failed ){
      Alert.alert('Username and/or password incorrect. Try Again.');
    }
  }, [ login_failed ]);


  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={email => setEmail( email )}
            placeholder='Email'
            placeholderTextColor='white'
            autoCapitalize='none'
        />
        <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={password => setPassword( password )}
            placeholder='Password'
            placeholderTextColor='white'
            secureTextEntry={true}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={ () => signIn(email, password) }
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button 
            title="Don't have an account yet? Sign up"
            onPress={() => navigation.navigate('SignUp') }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 50
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputBox: {
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
    color: 'white',
  },
});
