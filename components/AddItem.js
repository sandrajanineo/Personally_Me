import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Picker,
  Button,
  Alert
} from 'react-native';

// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';


export default class AddItem extends React.Component {
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
  }

  addItem() {
    console.log('state is now ', this.state);
    console.log('button clicked!');
    const db = firebase.firestore();
    db.collection(`${this.state.category}`)
      .add(this.state)
      .then(function(docRef) {
        console.log('successfully added item!');
      });

    this.setState({
      image: null,
      occassion: '',
      color: '',
      season: '',
      category: '',
    });

    Alert.alert('Item Added Successfully!');
    // let category =
    //   this.state.category[0].toUpperCase() + this.state.category.slice(1);
    // console.log('category is ', category);
    // // this.props.navigate(`${this.state.category}`);
  }

  showAlert() {
    Alert.alert(
      'Please Allow Access',
      [
        'This applicaton needs access to your photo library to upload images.',
        '\n\n',
        'Please go to Settings of your device and grant permissions to Photos.',
      ].join(''),
      [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
      ]
    );
  }

  // pickImage = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (status !== 'granted') {
  //     if (Platform.OS === 'ios') this.showAlert();
  //     return;
  //   }

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     type: 'images',
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     base64: true,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   } else {
  //     this.setState({ image: null });
  //   }
  // };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Add To Your Collection!</Text>

          <Button
            title="Pick an image from camera roll"
            // onPress={this.pickImage}
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
