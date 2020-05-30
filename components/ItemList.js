import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export default ItemList = props => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {props.items.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => props.navigation.navigate('ItemDetail', {item})}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
  },
});
