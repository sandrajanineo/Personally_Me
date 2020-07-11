import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default Loading = props => {
  let locationY = props.locationY - 10 || 0;

  return (
    <View style={[ styles.container, { top: locationY } ]}>
      <ActivityIndicator size="large" color="#0000ff" style={styles.activityLoader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityLoader: {
    backgroundColor: '#E8E8E8',
    padding: 5,
  }
});
