import * as React from 'react';
import ItemList from '../components/ItemList';
import { GlobalContext } from '../hooks/global';

export default function Collection ( props ) {
  const state = React.useContext(GlobalContext);

  React.useEffect(() => {
    return state.fetchCollection(state.userID, props.route.params.collection);
  }, []);

  return (
    <>
    <ItemList
      items={ state.closet }
      navigation={ props.navigation }
      deleteItem={ state.deleteItem }
      userID={state.userID} />
    </>
  )
}
