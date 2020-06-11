import * as React from 'react';
import Firebase from '../dbConfig';

export const GlobalContext = React.createContext();

export default function contextGlobal (){
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FETCH_USER':
          return {
            ...prevState,
            userID: action.user.uid
          };
        // case 'FETCH_COLLECTIONS':
        //   return {
        //     ...prevState,
        //     isSignout: true,
        //     logged_in: false,
        //   };
      }
    },
    {
      user: {},
      closet: {}
    }
  );
  
  const globalDispatch = React.useMemo(
    () => ({
      fetchUser: () => {
        let user = Firebase.auth().currentUser;
        dispatch({ type: 'FETCH_USER', user })
      },
      // fetchCollections: () => dispatch({ type: 'FETCH_COLLECTIONS' }),
    }),
    []
  );
  
  return [state, globalDispatch];
}

// implicitly creates collection if dne and adds document to collection
        // Firebase.firestore().collection(user.uid).add({
        //   url: "test"
        // })
        // .then( () => console.log('collection created') )
        // .catch( (err) => console.log(err) );
