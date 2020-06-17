import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';

export default ItemList = props => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('AddItem')}
        >
          <Text style={styles.buttonText}>Add to your collection</Text>
        </TouchableOpacity>
        
        {props.items.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => props.navigation.navigate('ItemDetail', {item})}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageURL }} style={styles.image} />
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
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'blue',
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    width: 300,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
});
