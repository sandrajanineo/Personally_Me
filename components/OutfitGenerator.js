import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, TouchableOpacity, View, Picker } from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Outfit from './Outfit';

export default class OutfitGenerator extends React.Component {
  isMounted = false;
  constructor(props) {
    super();
    this.refTops = firebase.firestore().collection('tops');
    this.refBottoms = firebase.firestore().collection('bottoms');
    this.refFullbody = firebase.firestore().collection('fullbody');
    this.unsubscribe = null;
    this.state = {
      tops: [],
      bottoms: [],
      fullbody: [],
      type: '',
      occasion: '',
      season: '',
      selected: [],
      showImage: false,
    };
    this.getTops = this.getTops.bind(this);
    this.getBottoms = this.getBottoms.bind(this);
    this.getFullbody = this.getFullbody.bind(this);
    this.generateOutfit = this.generateOutfit.bind(this);
  }

  getTops(querySnapShot) {
    let tops = [];
    querySnapShot.forEach(doc => {
      tops.push(doc.data());
    });
    if (this.isMounted) {
      this.setState({ tops: tops });
    }
  }

  getBottoms(querySnapShot) {
    let bottoms = [];
    querySnapShot.forEach(doc => {
      bottoms.push(doc.data());
    });
    if (this.isMounted) {
      this.setState({ bottoms: bottoms });
    }
  }

  getFullbody(querySnapShot) {
    let fullbody = [];
    querySnapShot.forEach(doc => {
      fullbody.push(doc.data());
    });
    if (this.isMounted) {
      this.setState({ fullbody: fullbody });
    }
  }

  componentDidMount() {
    this.isMounted = true;
    this.refTops.onSnapshot(this.getTops);
    this.refBottoms.onSnapshot(this.getBottoms);
    this.refFullbody.onSnapshot(this.getFullbody);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  generateOutfit() {
    if (this.state.type === 'fullbody') {
      let fullbody = this.state.fullbody;
      let selected = fullbody.filter(item => {
        if (
          item.season === this.state.season &&
          item.occassion === this.state.occasion
        ) {
          return item;
        }
      });
      let randomFullbodyNum = Math.floor(Math.random() * selected.length);
      let randomFullbody = selected[randomFullbodyNum];
      randomFullbody = [randomFullbody];
      this.setState({ selected: randomFullbody, showImage: true });
    } else {
      let tops = this.state.tops;
      let bottoms = this.state.bottoms;
      let selectedTops = tops.filter(item => {
        if (
          item.season === this.state.season &&
          item.occassion === this.state.occasion
        ) {
          return item;
        }
      });
      let selectedBottoms = bottoms.filter(item => {
        if (
          item.season === this.state.season &&
          item.occassion === this.state.occasion
        ) {
          return item;
        }
      });

      let randomTop = [];
      let randomBottom = [];

      //generate random numbers based on lenght of the array
      if (selectedTops) {
        let randomTopNum = Math.floor(Math.random() * selectedTops.length);
        randomTop = selectedTops[randomTopNum];
        console.log('random top is ', randomTop);
      } else {
        randomTop = null;
      }

      if (selectedBottoms) {
        let randomBottomNum = Math.floor(
          Math.random() * selectedBottoms.length
        );
        randomBottom = selectedBottoms[randomBottomNum];
        console.log('random bottom is ', randomBottom);
      } else {
        randomBottom = null;
      }

      if (randomTop !== null || randomBottom !== null) {
        let selected = [randomTop].concat([randomBottom]);
        this.setState({
          selected: selected,
          showImage: true,
        });
      }
    }
  }

  render() {
    // console.log('this.state is!! ', this.state);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Picker
            selectedValue={this.state.type}
            style={styles.formOptions}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ type: itemValue });
            }}
          >
            <Picker.Item label="Select the type of outfit:" value="" />
            <Picker.Item label="One Piece" value="fullbody" />
            <Picker.Item label="Two Piece" value="topNbottom" />
          </Picker>

          <Picker
            selectedValue={this.state.occasion}
            style={styles.formOptions}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ occasion: itemValue });
            }}
          >
            <Picker.Item label="Select the type of occasion:" value="" />

            <Picker.Item label="Business" value="business" />
            <Picker.Item label="Casual" value="casual" />
            <Picker.Item label="Formal" value="formal" />
            <Picker.Item label="Night Out" value="nightOut" />
            <Picker.Item label="Sporty" value="sporty" />
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

          <Text>{'\n'}</Text>

          <TouchableOpacity style={styles.button} onPress={this.generateOutfit}>
            <Text style={styles.buttonText}>Dress Me!</Text>
          </TouchableOpacity>

          {this.state.showImage ? (
            <Outfit outfit={this.state.selected} />
          ) : (
            <Text style={styles.text}>Nothing Yet...</Text>
          )}
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
