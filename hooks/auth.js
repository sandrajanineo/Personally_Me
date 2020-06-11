import * as React from 'react';
import Firebase from '../dbConfig';

export const AuthContext = React.createContext();

export default function auth (){
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            logged_in: true,
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
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: () => dispatch({ type: 'SIGN_IN' }),
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  return [authState, authContext];
}
