import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Image, Text, Alert } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import Filters from '../components/Filters';
import { GlobalContext } from '../hooks/global';

export default Collection = props => {
  const state = React.useContext(GlobalContext);
  const [ filter, displayFilter ] = React.useState( false );
  let { collection } = props.route.params
  let activeFilters = Object.keys( state.filtersApplied );

  React.useEffect(() => {
    return state.fetchCollection( state.userID, collection, state.filtersApplied );
  }, [ state.filterActive, collection ] );

  const removeItem = ( item ) => {
    Alert.alert(
      "Confirmation Required",
      "Do you want to delete this item from your closet?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => state.deleteItem( state.userID, item )}
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View style={styles.topContainer} >
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('Add Item')}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => displayFilter( true )} style={styles.button}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        { filter && <Filters displayFilter={ displayFilter } route={ collection } /> }
      </View>
      { activeFilters.length > 0 &&
        <View style={ styles.filtersContainer }>
          <View style={ styles.filters }>
            {<Text style={ styles.text } >Filters Applied: </Text>}
            { activeFilters.map( ( key, i ) => {
              return (
                <View key={ i.toString() } style={ styles.activeFilters }>
                  <Text style={ styles.text }>{ state.filtersApplied[ key ]}</Text>
                </View>
              )}
            )}
            <TouchableOpacity
              onPress={ () => {
                state.resetState( 'filtersApplied' );
              }}
              style={styles.topContainer}
            >
              <Text style={ styles.removeFilter }>Remove All Filters</Text>
              <TabBarIcon name="md-close-circle" style={ styles.filterIcon } />
            </TouchableOpacity>
          </View>
        </View>
      }
      <View style={styles.container}>
        <ScrollView>
          {state.closet.map((item, i) => {
            return (
              <View style={styles.imageContainer} key={i} >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Item Detail', { item })}
                >
                    <Image source={{ uri: item.imageURL }} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={() => removeItem( item )} >
                  <TabBarIcon name="md-trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  filtersContainer: {
    backgroundColor: '#48D1CC',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
  },
  filters: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    width: 300,
    alignItems: 'center',
  },
  activeFilters: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
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
    resizeMode: 'center',
    marginTop: 3,
  },
  button: {
    backgroundColor: '#48D1CC',
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 10,
    margin: 5,
    width: '46%',
    padding: 10,
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
    right: 30,
    top: -10,
  },
  removeFilter: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  filterIcon: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
    color: 'black',
  },
});
