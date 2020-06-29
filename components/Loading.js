import * as React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default Loading = () => {
  return (
    <View style={styles.activityLoader}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  activityLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 535,
  }
});
