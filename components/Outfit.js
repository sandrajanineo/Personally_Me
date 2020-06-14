import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, Text, View, TextComponent } from 'react-native';

export default Outfit = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        { props.outfit.length ? 
          ( props.outfit.map((item, i) => {
            return <Image source={{ uri: item.image }} style={styles.image} key={i} />
          })
        ) : (
          <View style={styles.container}>
            <Text style={styles.text} >
            WAAAHHHH :( no items in your collection match that
            criteria...add more items or browse your collection via the "Your
            Closet" tab!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'blue',
  },
  text: {
    fontSize: 15,
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
  },
});
