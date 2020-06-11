import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, TouchableOpacity, View, Picker } from 'react-native';
import OutfitGeneratorForm from './OutfitGeneratorForm';
import Firebase from '../dbConfig';

import Outfit from './Outfit';

export default class OutfitGenerator extends React.Component {
  _mounted = false;
  constructor(props) {
    super();
    this.refTops = Firebase.firestore().collection('tops');
    this.refBottoms = Firebase.firestore().collection('bottoms');
    this.refFullbody = Firebase.firestore().collection('fullbody');
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
    this.updateState = this.updateState.bind(this);
  }

  getTops(querySnapShot) {
    let tops = [];
    querySnapShot.forEach(doc => {
      tops.push(doc.data());
    });
    if (this._mounted) {
      this.setState({ tops: tops });
    }
  }

  getBottoms(querySnapShot) {
    let bottoms = [];
    querySnapShot.forEach(doc => {
      bottoms.push(doc.data());
    });
    if (this._mounted) {
      this.setState({ bottoms: bottoms });
    }
  }

  getFullbody(querySnapShot) {
    let fullbody = [];
    querySnapShot.forEach(doc => {
      fullbody.push(doc.data());
    });
    if (this._mounted) {
      this.setState({ fullbody: fullbody });
    }
  }

  componentDidMount() {
    this._mounted = true;
    this.refTops.onSnapshot(this.getTops);
    this.refBottoms.onSnapshot(this.getBottoms);
    this.refFullbody.onSnapshot(this.getFullbody);
  }

  componentWillUnmount() {
    this._mounted = false;
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

      //generate random numbers based on length of the array
      if (selectedTops) {
        let randomTopNum = Math.floor(Math.random() * selectedTops.length);
        randomTop = selectedTops[randomTopNum];
      } else {
        randomTop = null;
      }

      if (selectedBottoms) {
        let randomBottomNum = Math.floor(
          Math.random() * selectedBottoms.length
        );
        randomBottom = selectedBottoms[randomBottomNum];
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
  
  updateState (key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
        { this.state.showImage ? (
          <Outfit outfit={this.state.selected} />
        ) : (
          <OutfitGeneratorForm 
              items={this.state}
              updateState={this.updateState}
              generateOutfit={this.generateOutfit}
          />
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
