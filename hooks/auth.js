import * as React from 'react';  

export default function auth (){
  const [state, dispatch] = React.useReducer(
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
      isSignout: false
    }
  );
  
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );
  
  return [state, authContext];
}
