import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.welcomeText}>Welcome to PersonallyMe!</Text>
          <View style={styles.welcomeContainer}>
            <Image
              source={{
                uri:
                  'http://wardrobeadvice.com/wp-content/uploads/2009/11/Fashion-stylist.jpg',
              }}
              style={styles.welcomeImage}
            />
            <Text style={styles.text}>
              Tell me what you need and I will build an outfit for you!
            </Text>
            <Text>{'\n'}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('OutfitGeneratorForm')}
            >
            <Text style={styles.buttonText}>Dress Me!</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeImage: {
    width: 350,
    height: 225,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 25
  },
  welcomeText: {
    fontSize: 30,
    color: 'white',
    lineHeight: 35,
    textAlign: 'center',
    marginTop: 15,
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
});
