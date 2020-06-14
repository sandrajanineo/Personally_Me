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
            closet: action.items,
          }
        case 'FETCH_OUTFIT':
          return {
            ...prevState,
            outfit: action.outfit,
            outfitReady: true
        }
      }
    },
    {
      logged_in: false,
      isSignout: false,
      userID: '',
      closet: [],
      outfit: [],
      outfitReady: false,
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
        Firebase.firestore()
          .collection(userID).doc(category).collection(category)
          .onSnapshot( querySnapshot => {
            querySnapshot.forEach( doc => {
              items.push( doc.data() )
            })
            dispatch({ type: 'FETCH_COLLECTION', items });
          },
            error => console.log('error: ', error)
          );
      },
      addItem: ( userID, category, details ) => {
        Firebase.firestore()
        .collection(userID).doc(category).set({ category })
        .then( () => {
          let docRef = Firebase.firestore().collection(userID).doc(category)
          docRef.collection(category).add(details);
        })
        .catch( error => console.log(error) );
      },
      generateOutfit: ( userID, categories, seasonSelected, occassionSelected ) => {
        let itemObj = {};
        categories.forEach( ( category, i ) => {
          Firebase.firestore()
          .collection(userID).doc(category).collection(category)
          .get()
          .then( (querySnapshot) => {
            querySnapshot.forEach( doc => {
              let { category, occassion, season } = doc.data();
              if ( itemObj[category] ) {
                if (occassion === occassionSelected && season === seasonSelected ){
                  itemObj[category].push( doc.data() );
                }
              } else {
                if (occassion === occassionSelected && season === seasonSelected ){
                  itemObj[category] = [ doc.data() ];
                }
              }
            })
            let outfit = outfitGenerator( itemObj, categories, seasonSelected, occassionSelected );
            if (i === categories.length -1){
              dispatch({ type: 'FETCH_OUTFIT', outfit });
            }
          })
        });
      }
    }),
    []
  );

  return [state, globalDispatch];
}

const outfitGenerator = (items, categories, season, occasion) => {
  let outfit = [];
  if ( categories.length === 2 ){
    let randomTop = null;
    let randomBottom = null;
    if ( items.tops ){
      let randomTopNum = Math.floor( Math.random() * items.tops.length );
      randomTop = items.tops[randomTopNum];
      outfit.push(randomTop);
    }
    if ( items.bottoms ){
      let randomBottomsNum= Math.floor( Math.random() * items.bottoms.length );
      randomBottom = items.bottoms[randomBottomsNum];
      outfit.push(randomBottom);
    }
  }
  else {
    if ( items.fullbody ) {
      let randomFullbodyNum = Math.floor( Math.random() * items.fullbody.length );
      let randomFullbody = items.fullbody[randomFullbodyNum];
      outfit.push(randomFullbody);
    }
  }

  return outfit;
}

