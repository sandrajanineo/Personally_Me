import * as React from 'react';
import Firebase from '../dbConfig';

export const AuthContext = React.createContext();

export default function auth (){
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            logged_in: true,
            user: action.user
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            logged_in: false,
          };
      }
    },
    {
      logged_in: false,
      isSignout: false,
      user: {}
    }
  );
  
  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        let user = Firebase.auth().currentUser;
        dispatch({ type: 'SIGN_IN', user })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );
  
  return [state, authContext];
}

// implicitly creates collection if dne and adds document to collection
        // Firebase.firestore().collection(user.uid).add({
        //   url: "test"
        // })
        // .then( () => console.log('collection created') )
        // .catch( (err) => console.log(err) );
