import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { GlobalContext } from '../hooks/global';
import PickImage from '../components/PickImage';
import CloudVision from '../components/CloudVision';
import Loading from '../components/Loading';
import Edit from '../components/Edit';
import AddMultiple from '../components/AddMultiple';

export default AddItem = props => {
  let { success, error, resetState, displayGoogle, collection, imageDetails } = React.useContext( GlobalContext );
  let [ loading, setLoading ] = React.useState( false );
  let [ edit, setEdit ] = React.useState( false );
  let [ locationY, setLocationY ] = React.useState( null );
  let [ addMulti, setAddMulti ] = React.useState( false );
  let [ addLocationY, setAddLocationY ] = React.useState( null );
  const { width, height } = Dimensions.get('window');

  React.useEffect(() => {
    if ( loading ) {
      setLoading( false );

      if ( success ){
        Alert.alert('Item Added Successfully!');
        props.navigation.navigate('Collection', { collection })
      }
      if ( error ){
        Alert.alert('An unexpected error occured. Please try again.');
      }

      resetState( success ? 'success' : 'error' );
    }

  }, [ success, error, displayGoogle ]);

  return (
    <ScrollView style={ styles.container }>
      <View style={ styles.formContainer }>
        <Text style={ styles.headerText }>Add To Your Collection!</Text>

        { !displayGoogle && <PickImage setLoading={ setLoading } setLocationY={ setLocationY } /> }

        <TouchableOpacity onPress={ e => {
          setAddLocationY( e.nativeEvent.locationY + 50.5 )
          setAddMulti( true )
        }}>
          <Text>Add Multiple Items</Text>
        </TouchableOpacity>
        { addMulti && <AddMultiple dimensions={ { width, height } } locationY={ addLocationY } setAddMulti={ setAddMulti } /> }

        { imageDetails.imageURL && displayGoogle && (
          <Image source={{ uri: imageDetails.imageURL }} style={ styles.image } />
        )}

        { displayGoogle && <CloudVision image={ imageDetails.imageURL } setLoading={ setLoading } setEdit={ setEdit } /> }

        { loading && <Loading locationY={ locationY } /> }
        { edit && <Edit setLoading={ setLoading } disableType={ false } add={ true } /> }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
    padding: 10
  },
  headerText: {
    marginBottom: 10,
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
    marginHorizontal: 50,
    borderWidth: 2,
    borderColor: 'white',
    width: '100%',
    alignSelf: 'center',
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
