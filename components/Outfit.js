import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Outfit (props) {
  let outfit = props.outfit;
  {
    outfit.length === 2 ? (
      <View style={styles.welcomeContainer}>
        <Text style={styles.developmentModeText}>WALAAAAAH!</Text>
      </View>
    ) : (
      <Text />
    );
  }
  return (
    <View style={styles.container}>
      {outfit.map((item, i) => {
        return item ? (
          <View style={styles.welcomeContainer} key={i}>
            <Image source={{ uri: item.image }} style={styles.welcomeImage} />
          </View>
        ) : (
          <Text style={styles.text} key={i}>
            WAAAHHHH :( only one item in your collection matched that
            criteria...add more items or browse your collection via the "Your
            Closet" tab!
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    alignSelf: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    alignSelf: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 25,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    fontSize: 25,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
    borderColor: 'white',
  },
  text: {
    fontSize: 15,
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
  },
});
