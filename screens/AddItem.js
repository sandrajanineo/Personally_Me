import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import PickImage from '../components/PickImage';
import Form from '../components/Form';
import { GlobalContext } from '../hooks/global';
import Loading from '../components/Loading';

export default AddItem = () => {
  let { userID, addItem, success, error, resetState } = React.useContext( GlobalContext );
  let [ details, setDetails ] = React.useState({ image: null, Occassion: '', Color: '', Season: '', Type: '', Location: '' });
  let [ loading, setLoading ] = React.useState( false );

  React.useEffect(() => {
    if ( loading ) {
      setLoading( false );
      setDetails({ image: null, Occassion: '', Color: '', Season: '', Type: '', Location: '' });

      if ( success ){
        Alert.alert('Item Added Successfully!');
      }
      if ( error ){
        Alert.alert('An unexpected error occured. Please try again.');
      }

      resetState( success ? 'success' : 'error' );
    }

  }, [ success, error ]);

  const updateState = ( key, val ) => {
    setDetails({
      ...details,
      [key]: val
    });
  }

  return (
    <ScrollView style={ styles.container }>
      <View style={ styles.formContainer }>
        <Text style={ styles.headerText }>Add To Your Collection!</Text>

        <PickImage image={ details.image } addImage={ updateState } />

        {details.image && (
          <Image source={{ uri: details.image }} style={ styles.image } />
        )}

        <Form details={ details } updateState={ updateState } />

        <TouchableOpacity
          style={ details.image && details.Type ? styles.button : styles.buttonDisabled }
          onPress={() => {
            setLoading( true );
            addItem( userID, details );
          }}
          disabled={ details.image && details.Type ? false : true }
        >
          <Text style={ styles.buttonText }>Add to Closet</Text>
        </TouchableOpacity>

        {loading && <Loading /> }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
  },
  headerText: {
    marginBottom: 30,
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
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
  formOptions: {
    height: 200,
    width: '95%',
    paddingTop: 10,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 50,
    alignSelf: 'center',
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    width: 200,
    marginTop: 10,
  },
  buttonDisabled: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    width: 200,
    marginTop: 10,
    opacity: 0.5
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 180,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 60,
  },
});
