import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Carousel from '../components/Carousel';
import { GlobalContext } from '../hooks/global';

export default function Closet ({ navigation }) {
  const { fetchCollectionTypes, types, userID, resetState } = React.useContext( GlobalContext );

  React.useEffect(() => {
    return fetchCollectionTypes( userID );
  }, [] );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          resetState( 'success' );
          navigation.navigate( 'Add Item' );
        }}
      >
        <Text style={styles.buttonText}>Add Items</Text>
      </TouchableOpacity>
      <Carousel types={ types } navigation={ navigation } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 30,
    margin: '10%',
    padding: 10,
  },
  buttonText: {
    fontSize: 22,
    textAlign: 'center',
  },
})

