import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Carousel from '../components/Carousel';
import { GlobalContext } from '../hooks/global';

export default function Closet ({ navigation }) {
  const { fetchCollectionTypes, types, userID } = React.useContext( GlobalContext );

  React.useEffect(() => {
    return fetchCollectionTypes( userID );
  }, [] );

  return (
    <Carousel types={ types } navigation={ navigation } />
  );
}

