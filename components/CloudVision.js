import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GlobalContext } from '../hooks/global';

export default CloudVision = props => {
  let { imageDetails, userID, addItem } = React.useContext( GlobalContext );

  return (
    <View style={ styles.container }>
      <View>
        <Text style={ styles.text }>Our fashion experts suggest that you are adding
          { imageDetails.Type === 'Bottoms' ?
            <Text style={ styles.noDisplay }></Text>
            : <Text > a</Text>
          }
        </Text>
      </View>
      <View style={ styles.flex }>
        <Text style={ styles.highlight }>
          {imageDetails.Color.length > 1 ? imageDetails.Color.join(', ') : imageDetails.Color}
        </Text>
        <Text style={ styles.highlight }> {imageDetails.Type}</Text>
      </View>
      <Text style={ styles.smallText }>** Choose to Edit Details if you desire to add additional meta data</Text>
      <View style={ styles.flex }>
        <TouchableOpacity
          style={ styles.button }
          onPress={() => {
            props.setLoading( true );
            addItem( userID, imageDetails, props.image );
          }}
        >
          <Text style={ styles.buttonText }>Add to Closet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ styles.button }
          onPress={() => props.setEdit( true )}
        >
          <Text style={ styles.buttonText }>Edit Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
  },
  smallText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 15,
  },
  highlight: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    color: '#0000CD',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 10,
    marginTop: 10,
    margin: 5,
    width: 160,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noDisplay: {
    display: 'none'
  },
})
