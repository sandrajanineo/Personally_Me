import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

import { GlobalContext } from '../hooks/global';
import Form from '../components/Form';
import Loading from '../components/Loading';
import Edit from '../components/Edit';

const ItemDetail = props => {
  const { success, error, resetState } = React.useContext( GlobalContext );
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
        <Image source={{ uri: FileSystem.documentDirectory + item.imageName + '.jpeg' }} style={ styles.image } />
        <Edit updateState={ updateState } updatedFields={ updatedFields } setLoading={ setLoading } disableType={ true } />
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
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
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
    alignSelf: 'center'
  },
  bulletPoint: {
    color: 'white',
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 5,
    paddingRight: '20%',
    paddingLeft: '20%',
  },
  title: {
    color: 'white'
  },
  detail: {
    color: 'navy'
  },
  noDisplay: {
    display: 'none'
  },
});
