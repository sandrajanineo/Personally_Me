import * as React from 'react';
import ItemList from '../components/ItemList';
import Firebase from '../dbConfig';
// import { useNavigation } from '@react-navigation/native';

export default class Tops extends React.Component {
  component_mounted = false;
  constructor() {
    super();
    this.ref = Firebase.firestore().collection('tops');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      tops: [],
    };
    this.getTops = this.getTops.bind(this);
  }

  getTops(querySnapShot) {
    let tops = [];
    querySnapShot.forEach(doc => {
      tops.push(doc.data());
    });
    if (this.component_mounted) {
      this.setState({
        isLoading: false,
        tops,
      });
    }
  }

  componentDidMount() {
    this.component_mounted = true;
    this.unsubscribe = this.ref.onSnapshot(this.getTops);
    this.unsubscribe = null;
  }

  componentWillUnmount() {
    this.component_mounted = false;
  }

  render() {
    const { navigation } = this.props;
    return <ItemList items={this.state.tops} navigation={navigation} />;
  }
}
