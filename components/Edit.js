import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Form from './Form';
import { GlobalContext } from '../hooks/global';

export default function Edit ( props ) {
  const { updateItem, userID, imageDetails, addItem } = React.useContext( GlobalContext );
  const { setLoading, disableType, add, updatedFields } = props;
  let fields = add ? imageDetails : updatedFields;
  let [ details, setDetails ] = React.useState( {...fields} );

  const updateState = ( key, val ) => {
    setDetails({
      ...details,
      [key]: val
    });
  }

  return (
    <View style={ styles.form }>
      <Form updateState={ updateState } details={ details } disableType={ disableType } />
        <TouchableOpacity
          style={ styles.button }
          onPress={ () => {
            setLoading( true );
            add ? addItem( userID, details ) : updateItem( userID, details );
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
