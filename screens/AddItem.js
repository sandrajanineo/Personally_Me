import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Alert
} from 'react-native';

import PickImage from '../components/PickImage';
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
    this.addImage = this.addImage.bind(this);
  }

  addItem() {
    console.log('state is now ', this.state);
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

  addImage(image){
    this.setState( {image} );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Add To Your Collection!</Text>

          <PickImage 
            image={this.state.image}
            addImage={this.addImage}
          />

          {this.state.image && (
            <Image source={{ uri: this.state.image }} style={styles.image} />
          )}

          <Picker
            selectedValue={this.state.occassion}
            style={styles.formOptions}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ occassion: itemValue });
            }}
          >
            <Picker.Item label="Select the occasion:" value="" />
            <Picker.Item label="Business" value="business" />
            <Picker.Item label="Casual" value="casual" />
            <Picker.Item label="Formal" value="formal" />
            <Picker.Item label="Night Out" value="nightOut" />
            <Picker.Item label="Sporty" value="sporty" />
          </Picker>
          <Picker
            selectedValue={this.state.color}
            style={styles.formOptions}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ color: itemValue });
            }}
          >
            <Picker.Item label="Select the color:" value="" />
            <Picker.Item label="Red" value="red" />
            <Picker.Item label="Blue" value="Blue" />
            <Picker.Item label="Yellow" value="yellow" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Violet" value="violet" />
            <Picker.Item label="Pink" value="pink" />
            <Picker.Item label="Orange" value="orange" />
            <Picker.Item label="Black" value="black" />
            <Picker.Item label="Green" value="Green" />
          </Picker>
          <Picker
            selectedValue={this.state.season}
            style={styles.formOptions}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ season: itemValue });
            }}
          >
            <Picker.Item label="Select the season:" value="" />
            <Picker.Item label="Winter" value="winter" />
            <Picker.Item label="Spring" value="spring" />
            <Picker.Item label="Summer" value="summer" />
            <Picker.Item label="Fall" value="fall" />
          </Picker>
          <Picker
            selectedValue={this.state.category}
            style={styles.formOptions}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ category: itemValue });
            }}
          >
            <Picker.Item label="Select the item type:" value="" />
            <Picker.Item label="Top" value="tops" />
            <Picker.Item label="Bottom" value="bottoms" />
            <Picker.Item label="Full Body" value="fullbody" />
          </Picker>

          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>

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
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 60,
  },
});
