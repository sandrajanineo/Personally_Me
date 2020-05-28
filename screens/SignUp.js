import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function Signup ({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={name => setName(name)}
            placeholder='Full Name'
        />
        <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={email => setEmail(email)}
            placeholder='Email'
            autoCapitalize='none'
        />
        <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={password => setPassword(password)}
            placeholder='Password'
            secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  welcomeImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginLeft: -10,
  },
  welcomeText: {
    fontSize: 30,
    color: 'white',
    lineHeight: 35,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
});
