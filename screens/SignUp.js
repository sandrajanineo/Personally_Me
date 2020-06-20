import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';

import { GlobalContext } from '../hooks/global';

export default function Signup () {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signUp, signUp_failed } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if ( signUp_failed ){
      Alert.alert('Username already exists. Try Again.');
    }
  }, [ signUp_failed ]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={name => setName(name)}
            placeholder='Full Name'
            placeholderTextColor='white'
        />
        <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={email => setEmail(email)}
            placeholder='Email'
            autoCapitalize='none'
            placeholderTextColor='white'
        />
        <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={password => setPassword(password)}
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor='white'
        />
        <TouchableOpacity 
            style={styles.button}
            onPress={ () => signUp(email, password) }
        >
        <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 50,
    width: '80%'
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    marginTop: 10
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
    textAlign: 'center'
  },
});
