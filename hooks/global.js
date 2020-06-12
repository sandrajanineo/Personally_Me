import * as React from 'react';
import Firebase from '../dbConfig';

export const GlobalContext = React.createContext();

export default function globalContext (){
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            logged_in: true,
            userID: action.user.uid
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            logged_in: false,
          };
        case 'FETCH_COLLECTION':
          return {
            ...prevState,
            closet: action.items
          }
      }
    },
    {
      logged_in: false,
      isSignout: false,
      userID: '',
      closet: []
    }
  );

  const globalDispatch = React.useMemo(
    () => ({
      signIn: (email, password) => {
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
          let user = Firebase.auth().currentUser;
          dispatch({ type: 'SIGN_IN', user })
        })
        .catch(error => console.log(error) )
      },
      signUp: (email, password) => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( () => {
          let user = Firebase.auth().currentUser;
          dispatch({ type: 'SIGN_IN', user })
        })
        .catch(error => console.log(error))
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      fetchCollection: (collection) => {
        let items = [];
        Firebase.firestore().collection(collection)
          .onSnapshot( (querySnapshot) => {
            querySnapshot.forEach(() => items.push( doc.data() ))
          },
          function (error){
            console.log('error: ', error);
          })
          .then( () => dispatch({ type: 'FETCH_COLLECTION', items }));
      }
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
