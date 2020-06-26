import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlobalContext } from '../hooks/global';
import Outfit from '../components/Outfit';

export default function OutfitGenerator (props) {
  const state = React.useContext(GlobalContext);

  React.useEffect(() => {
    let { season, occasion } = props.route.params;

    if (props.route.params.type === 'One Piece'){
      return state.generateOutfit( state.userID, ['One Piece'], season, occasion );
    }
    else {
      return state.generateOutfit( state.userID, ['Tops', 'Bottoms'], season, occasion );
    }

  }, []);

  return (
    <>
    { state.outfitReady ?
      <Outfit outfit={state.outfit} />
    : (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48D1CC',
    paddingTop: 15,
  },
  text: {
    fontSize: 15,
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
  },
});
