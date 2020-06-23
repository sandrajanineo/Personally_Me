import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import PickImage from '../components/PickImage';
import Form from '../components/Form';
import { GlobalContext } from '../hooks/global';

export default class AddItem extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      image: null,
      occassion: '',
      color: '',
      season: '',
      category: '',
    };
    this.addItem = this.addItem.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  addItem() {
    const contxt = this.context
    contxt.addItem(contxt.userID, this.state.category, this.state);

    this.setState({
      image: null,
      occassion: '',
      color: '',
      season: '',
      category: '',
    });

    Alert.alert('Item Added Successfully!');
  }

  updateState( key, val ){
    this.setState({ [key]: val });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Add To Your Collection!</Text>

          <PickImage image={this.state.image} addImage={this.updateState} />

          {this.state.image && (
            <Image source={{ uri: this.state.image }} style={styles.image} />
          )}

          <Form details={this.state} updateState={this.updateState} />

          <TouchableOpacity style={styles.button} onPress={this.addItem}>
            <Text style={styles.buttonText}>Add to Closet</Text>
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
  headerText: {
    marginBottom: 30,
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
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
  formOptions: {
    height: 200,
    width: '95%',
    paddingTop: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 50,
    alignSelf: 'center',
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    width: 200,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 180,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 60,
  },
});
