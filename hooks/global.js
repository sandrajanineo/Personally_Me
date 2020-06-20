import * as React from 'react';
import Firebase from '../dbConfig';
import AsyncStorage from '@react-native-community/async-storage';

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
            userID: action.user.uid,
            login_failed: false
          };
        case 'SESSION_ACTIVE':
          return {
            ...prevState,
            session_active: action.userID ? true : false,
            userID: action.userID || '',
          }
        case 'LOGIN_FAILED':
          return {
            ...prevState,
            login_failed: true
          }
        case 'SIGNUP_FAILED':
          return {
            ...prevState,
            signUp_failed: true
          }
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
      session_active: null,
      login_failed: false,
      isSignout: false,
      userID: '',
      closet: [],
      outfit: [],
      outfitReady: false,
      signUp_failed: false,
    }
  );

  const globalDispatch = React.useMemo(
    () => ({
      signIn: (email, password) => {
        Firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async () => {
          let user = Firebase.auth().currentUser;
          await storeUser(user.uid);
          dispatch({ type: 'SIGN_IN', user })
        })
        .catch( () => dispatch({ type: 'LOGIN_FAILED' }) )
      },

      signUp: ( email, password ) => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async () => {
          let user = Firebase.auth().currentUser;
          await storeUser(user.uid);
          dispatch({ type: 'SIGN_IN', user })
        })
        .catch( () => dispatch({ type: 'SIGNUP_FAILED' }) )
      },

      fetchSession: async () => {
        try {
          const userID = await AsyncStorage.getItem('userID');
          dispatch({ type: 'SESSION_ACTIVE', userID: userID });
        } catch (err) {
          console.log('error fetching session');
        }
      },

      signOut: () => dispatch({ type: 'SIGN_OUT' }),

      fetchCollection: ( userID, category ) => {
        Firebase.firestore()
          .collection(userID).doc(category).collection(category)
          .onSnapshot( querySnapshot => {
            let items = [];
            querySnapshot.forEach( doc => {
              items.push( doc.data() )
            })
            dispatch({ type: 'FETCH_COLLECTION', items });
          },
            error => console.log('error: ', error)
          );
      },

      addItem: async ( userID, category, details ) => {
        let date = new Date();
        let imageName = "img" + Math.random().toString(36).slice(2) + date.getHours().toString(36);
        let imageURL = await createImageBLOB(details.image, imageName);
        details.imageURL = imageURL;
        details.image = imageName;
        Firebase.firestore()
        .collection(userID).doc(category).set({ category })
        .then( () => {
          let docRef = Firebase.firestore().collection(userID).doc(category)
          docRef.collection(category).doc(imageName).set(details);
        })
        .catch( error => console.log(error) );
      },

      updateItem: ( userID, docName, details ) => {
        Firebase.firestore()
        .collection( userID ).doc( details.category )
        .collection( details.category ).doc( docName )
        .update( details )
        .then( () => console.log('update successful'))
        .catch( error => console.log( error ) )
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

const createImageBLOB = async (uri, name) => {
    const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const storageRef = Firebase.storage().ref().child( name );
  const snapshot = await storageRef.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const storeUser = async (userID) => {
  try {
    await AsyncStorage.setItem('userID', userID);
    return;
  }
  catch (err) {
    console.log('error storing userID');
  }
}
