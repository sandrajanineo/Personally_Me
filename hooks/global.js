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
          let items = action.itemObj;
          return {
            ...prevState,
            closet: { ...action.itemObj }
          }
      }
    },
    {
      logged_in: false,
      isSignout: false,
      userID: '',
      closet: {}
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
        .catch( error => console.log(error) )
      },
      signUp: ( email, password ) => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( () => {
          let user = Firebase.auth().currentUser;
          dispatch({ type: 'SIGN_IN', user })
        })
        .catch( error => console.log(error) )
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      fetchCollection: ( userID, category ) => {
        let items = [];
        Firebase.firestore().collection(userID).doc(category).collection(category)
          .onSnapshot( querySnapshot => {
            querySnapshot.forEach( doc => {
              items.push( doc.data() )
              })
            let itemObj = { [category] : items };
            dispatch({ type: 'FETCH_COLLECTION', itemObj });
          },
          error => console.log('error: ', error)
          )
      },
      addItem: ( userID, category, details ) => {
        delete details.category;
        Firebase.firestore().collection(userID).doc(category).set({ category })
        .then( () => {
          let docRef = Firebase.firestore().collection(userID).doc(category)
          docRef.collection(category).add(details);
        })
        .catch( error => console.log(error) );
      },
    }),
    []
  );

  return [state, globalDispatch];
}
