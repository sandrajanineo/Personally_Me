import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Image, Text, Alert } from 'react-native';

import TabBarIcon from './TabBarIcon';

export default ItemList = props => {

  const removeItem = ( deleteItem, item ) => {
    Alert.alert(
      "Confirmation Required",
      "Do you want to delete this item from your closet?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteItem( props.userID, item )}
      ],
      { cancelable: false }
    );
  };

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
            <View style={styles.imageContainer} key={i} >
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ItemDetail', { item })}
              >
                  <Image source={{ uri: item.imageURL }} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => removeItem( props.deleteItem, item )} >
                <TabBarIcon name="md-trash" style={styles.icon} />
              </TouchableOpacity>
            </View>
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
  icon: {
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    top: -10,
  }
});
