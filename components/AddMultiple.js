import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { GlobalContext } from '../hooks/global';
import TabBarIcon from './TabBarIcon';

export default AddMultiple = props => {
  let { analyzeImage, bulkUpload, addItem, userID, imageDetails } = React.useContext( GlobalContext );
  let [ webViewRef, setRef ] = React.useState( null );
  let { width, height } = props.dimensions;
  const [ modalVisible, setModalVisible ] = React.useState( true );

  React.useEffect(() => {
    if ( bulkUpload ){
      addItem( userID, imageDetails );
    }

  }, [ bulkUpload ]);

  return (
    <View>
      <Modal visible={ modalVisible } transparent={ true }>
        <View style={[ styles.modal, { top: props.locationY } ]}>
          <TouchableOpacity
            style={styles.closeModal}
            onPress={() => setModalVisible( false )}
          >
            <TabBarIcon name="md-close-circle" style={styles.close}/>
          </TouchableOpacity>
          <WebView
            source={{ uri: 'https://personallyme2-a0c84.web.app' }}
            style={{ width: width, height: height }}
            ref={ ref => setRef( ref ) }
            onLoadEnd={ () => {
              webViewRef.postMessage('Sandra!!')
            }}
            cache={false}
            javaScriptEnabled={true}
            onMessage={ event => {
              const data = JSON.parse(event.nativeEvent.data);
              analyzeImage( data, true )
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  close: {
    fontSize: 20,
    color: 'gray',
  },
  modal: {
    position: 'absolute',
    height: '50%',
    width: '95%',
    alignSelf: 'center',
  },
})
