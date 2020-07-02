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
        Alert.alert('Item Details Edited Successfully!');
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
          <View style={ styles.flexContainer }>
            <Text style={ styles.text }>
              <Text style={ styles.bulletPoint }>{'\u2022'}  </Text>
              { updatedFields.occassion ?
                <>
                <Text style={ styles.title }>Occassion: </Text>
                <Text style={ styles.detail }>{ updatedFields.occassion }</Text>
                </>
                : <Text>Occassion not selected</Text>
              }
            </Text>
            <Text style={ styles.text }>
              <Text style={ styles.bulletPoint }>{'\u2022'}  </Text>
              { updatedFields.season ?
                <>
                <Text style={ styles.title }>Season: </Text>
                <Text style={ styles.detail }>{ updatedFields.season }</Text>
                </>
                : <Text>Season not selected</Text>
              }
            </Text>
            <Text style={ styles.text }>
              <Text style={ styles.bulletPoint }>{'\u2022'}  </Text>
              { updatedFields.color ?
                <>
                <Text style={ styles.title }>Color: </Text>
                <Text style={ styles.detail }>{updatedFields.color}</Text>
                </>
                : <Text>Color not selected</Text>
              }
            </Text>
          </View>
            
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
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20
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
    color: 'navy'
  },
  form: {
    margin: 30,
  },
  flexContainer: {
    alignSelf: 'center',
  },
  bulletPoint: {
    color: 'white',
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 5
  },
  title: {
    color: 'white'
  },
  detail: {
    color: 'navy'
  },
});
