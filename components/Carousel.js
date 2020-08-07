import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

import TabBarIcon from './TabBarIcon';

const { width } = Dimensions.get('window');

export default Carousel = props => {
  let [ x, setX ] = React.useState( 0 );
  let [ scrollRef, setScrollRef ] = React.useState( null );
  let [ contentWidth, setContentWidth ] = React.useState( 0 );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={ x ? styles.left : styles.noDisplay }
        onPress={ () => {
          setX( x - width )
          scrollRef.scrollTo({ x: x - width })
        }}
      >
        <TabBarIcon name="md-arrow-dropleft" size={ 70 } style={ styles.arrow } />
      </TouchableOpacity>
      <ScrollView
        horizontal={ true }
        pagingEnabled={ true }
        onScrollEndDrag={ e => setX( e.nativeEvent.targetContentOffset.x ) }
        ref={ ref => setScrollRef( ref ) }
        onContentSizeChange={ w => setContentWidth( w )}
      >
        <View style={ styles.imageContainer }>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Collection', { collection: 'Top' })}
          >
            <Image
              source={{
                uri:
                  'https://images.express.com/is/image/expressfashion/0387_80002212_3041_f001?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
              }}
              style={styles.image}
            />
            <Text>{'\n'}</Text>
            <Text style={styles.title}>Tops</Text>
            <Text>{'\n'}</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.imageContainer }>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Collection', { collection: 'Bottoms' } )}
          >
            <Image
              source={{
                uri:
                  'https://images.express.com/is/image/expressfashion/0093_08219562_0011_f001?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
              }}
              style={styles.image}
            />
            <Text>{'\n'}</Text>
            <Text style={styles.title}>Bottoms</Text>
            <Text>{'\n'}</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.imageContainer }>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Collection', { collection: 'One Piece' } )}
          >
            <Image
              source={{
                uri:
                  'https://images.express.com/is/image/expressfashion/0094_07822564_1412_f029?cache=on&wid=480&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon',
              }}
              style={styles.image}
            />
            <Text>{'\n'}</Text>
            <Text style={styles.title}>One Piece</Text>
            <Text>{'\n'}</Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.imageContainer }>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Collection', { collection: 'Shoes' } )}
          >
            <Image
              source={{ uri: 'https://images.bloomingdalesassets.com/is/image/BLM/products/3/optimized/10177363_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&$filtersm$' }}
              style={styles.image}
            />
            <Text>{'\n'}</Text>
            <Text style={styles.title}>Shoes</Text>
            <Text>{'\n'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={ x === ( contentWidth - width ) ? styles.noDisplay: styles.right}
        onPress={ () => {
          setX( x + width )
          scrollRef.scrollTo({ x: x + width })
        }}
      >
        <TabBarIcon name="md-arrow-dropright" size={ 70 } style={ styles.arrow } />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
  },
  imageContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  left: {
    position: 'absolute',
    left: 10,
    top: width/3,
    zIndex: 999
  },
  right: {
    position: 'absolute',
    right: 10,
    top: width/3,
  },
  arrow: {
    color: 'white',
    padding: 5
  },
  noDisplay: {
    display: 'none'
  },
});
