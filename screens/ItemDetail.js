import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const ItemDetail = props => {
  const { item } = props.route.params;
  console.log('item: ', item);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      <Text style={styles.text}>Color: {item.color}</Text>
      <Text style={styles.text}>Occassion: {item.occassion}</Text>
      <Text style={styles.text}>Season: {item.season}</Text>
    </View>
  )
};

export default ItemDetail;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'blue',
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 5
  },
});
