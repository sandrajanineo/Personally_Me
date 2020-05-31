import * as React from 'react';
import ItemList from '../components/ItemList';
import Firebase from '../dbConfig';
// import { useNavigation } from '@react-navigation/native';

export default class Collection extends React.Component {
  component_mounted = false;
  constructor(props) {
    super(props);
    this.ref = Firebase.firestore().collection(props.route.params.collection);
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      items: [],
    };
    this.getItems = this.getItems.bind(this);
  }

  getItems(querySnapShot) {
    let items = [];
    querySnapShot.forEach(doc => {
      items.push(doc.data());
    });
    if (this.component_mounted) {
      this.setState({
        isLoading: false,
        items,
      });
    }
  }

  componentDidMount() {
    this.component_mounted = true;
    this.unsubscribe = this.ref.onSnapshot(this.getItems);
    this.unsubscribe = null;
  }

  componentWillUnmount() {
    this.component_mounted = false;
  }

  render() {
    const { navigation } = this.props;
    return <ItemList items={this.state.items} navigation={navigation} />;
  }
}
