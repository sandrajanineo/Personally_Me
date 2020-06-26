import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Form from '../components/Form';

export default class OutfitGeneratorForm extends React.Component {

  constructor() {
    super();
    this.state = {
      image: null,
      occassion: '',
      color: '',
      season: '',
      type: '',
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState( key, val ){
    this.setState({ [key]: val });
  }

  render() {
      console.log(this.props);
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.formContainer }>

          <Form details={ this.state }
                updateState={ this.updateState }
                screen={ this.props.route.name }
          />

          <TouchableOpacity
            style={ this.state.type ? styles.button : styles.buttonDisabled }
            onPress={() => this.props.navigation.navigate('OutfitGenerator', {
              type: this.state.type,
              occassion: this.state.occassion,
              season: this.state.season
            })}
            disabled={ this.state.type ? false : true }
          >
            <Text style={ styles.buttonText }>Dress Me!</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  headerText: {
    marginBottom: 30,
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
  },
  formOptions: {
    height: 200,
    width: '95%',
    paddingTop: 5,
    paddingBottom: 10,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'center',
  },
  form: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    marginBottom: 20,
    opacity: 0.5
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 10,
    color: 'white',
  },
});
