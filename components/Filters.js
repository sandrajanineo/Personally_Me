import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';

import Form from './Form';
import TabBarIcon from './TabBarIcon';
import { GlobalContext } from '../hooks/global';

export default Filters = props => {
  let [ filters, setFilters ] = React.useState( {} );
  const { filterCollection } = React.useContext( GlobalContext );
  const { displayFilter, route } = props;
  
  const updateState = ( key, val ) => {
    setFilters({
      ...filters,
      [ key ]: val
    });
  }

  return (
    <View style={ styles.container }>
      <Modal visible={ true } transparent={ true }>
        <View style={ styles.formContainer } >
          <TouchableOpacity
            style={ styles.closeModal }
            onPress={ () => displayFilter( false ) }
          >
          <TabBarIcon name="md-close-circle" style={styles.close}/>
          </TouchableOpacity>
          <Form details={ filters } updateState={ updateState } disableType={ true } type={ route } />
          <TouchableOpacity style={ styles.button }
            onPress={ () => {
              displayFilter( false );
              filterCollection( filters );
            }}
          >
            <Text style={ styles.buttonText }>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#48D1CC',
    alignItems: 'center',
    marginTop: 120,
    paddingTop: 10,
  },
  button: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginTop: 10,
    margin: 5,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
    width: 180,
  },
  closeModal: {
    position: 'absolute',
    right: 0,
    padding: 10,
    paddingRight: 10
  },
  close: {
    fontSize: 25,
    color: 'gray',
  },
});
