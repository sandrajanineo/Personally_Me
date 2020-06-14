import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OutfitGeneratorForm ( {navigation} ) {
  let [type, setType] = React.useState(null);
  let [occasion, setOccasion] = React.useState(null);
  let [season, setSeason] = React.useState(null);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Picker
            selectedValue={ type }
            style={styles.formOptions}
            onValueChange={(itemValue) => {
              setType( itemValue );
            }}
          >
          <Picker.Item label="Select the type of outfit:" value="" />
          <Picker.Item label="One Piece" value="fullbody" />
          <Picker.Item label="Two Piece" value="topNbottom" />
        </Picker>

        <Picker
          selectedValue={ occasion }
          style={styles.formOptions}
          onValueChange={(itemValue) => {
            setOccasion( itemValue );
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
          selectedValue={ season }
          style={styles.formOptions}
          onValueChange={(itemValue) => {
            setSeason( itemValue );
          }}
        >
          <Picker.Item label="Select the season:" value="" />
          <Picker.Item label="Winter" value="winter" />
          <Picker.Item label="Spring" value="spring" />
          <Picker.Item label="Summer" value="summer" />
          <Picker.Item label="Fall" value="fall" />
        </Picker>

        <Text>{'\n'}</Text>

        <TouchableOpacity style={styles.button} 
          onPress={ () =>
            navigation.navigate('OutfitGenerator', {
              type,
              occasion,
              season
            })
          }
          >
          <Text style={styles.buttonText}>Dress Me!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
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
