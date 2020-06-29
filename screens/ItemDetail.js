import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

import { GlobalContext } from '../hooks/global';
import Form from '../components/Form';
import Loading from '../components/Loading';

const ItemDetail = props => {
  const { updateItem, userID, success, error, resetState } = React.useContext( GlobalContext );
  const { item } = props.route.params;
  let [ updatedFields, setFields ] = React.useState( item );
  let [ editMode, setEdit ] = React.useState( false );
  let [ loading, setLoading ] = React.useState( false );

  React.useEffect(() => {
    if ( loading ) {
      setLoading( false );

      if ( success ){
        Alert.alert('Item Added Successfully!');
      }
      if ( error ){
        Alert.alert('An unexpected error occured. Please try again.');
      }

      resetState( success ? 'success' : 'error' );
      setEdit( false );
    }

  }, [ success, error ]);

  const updateState = ( key, val ) => {
    setFields({
      ...updatedFields,
      [ key ]: val
    })
  }

  return (
    <View style={ styles.container }>
      <ScrollView>
        <Image source={{ uri: item.imageURL }} style={ styles.image } />

        { editMode ? (
          <View style={ styles.form }>
            <Form updateState={ updateState } details={ updatedFields } disableType={ true } />
              <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                  setLoading( true );
                  updateItem( userID, item.image, updatedFields );
                }}
              >
                <Text style={ styles.buttonText }>Save</Text>
              </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={ styles.text }>Occassion: { updatedFields.occassion }</Text>
            <Text style={ styles.text }>Season: { updatedFields.season }</Text>
            <Text style={ styles.text }>Color: { updatedFields.color }</Text>
            
            <TouchableOpacity
              style={ styles.button }
              onPress={ () => setEdit( true ) }
            >
              <Text style={ styles.buttonText }>Edit Item Details</Text>
            </TouchableOpacity>
          </>
        )}
        { loading && <Loading /> }
      </ScrollView>
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
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    width: 300,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  form: {
    margin: 30,
  },
});
