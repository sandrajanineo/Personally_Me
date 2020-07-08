import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Form from './Form';
import { GlobalContext } from '../hooks/global';

export default function Edit ( props ) {
  const { updateItem, userID } = React.useContext( GlobalContext );
  const { updateState, updatedFields, setLoading } = props;
  return (
    <View style={ styles.form }>
      <Form updateState={ updateState } details={ updatedFields } disableType={ true } />
        <TouchableOpacity
          style={ styles.button }
          onPress={ () => {
            setLoading( true );
            updateItem( userID, updatedFields.imageName, updatedFields );
          }}
        >
          <Text style={ styles.buttonText }>Save</Text>
        </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
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
});
