import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GlobalContext } from '../hooks/global';

export default CloudVision = props => {
  let { imageDetails, userID, addItem } = React.useContext( GlobalContext );

  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>Our fashion experts suggest that you are adding</Text>
      { imageDetails.type === 'Bottoms' ?
        <Text style={ styles.highlight }>{ imageDetails.color } { imageDetails.type }</Text>
        : <Text style={ styles.highlight }>a { imageDetails.color } { imageDetails.type }</Text>
      }
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
})
