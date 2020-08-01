import * as React from 'react';
import Firebase from '../dbConfig';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../cloudAPIConfig';

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
        case 'FETCH_COLLECTION_TYPES':
          return {
            ...prevState,
            types: action.types
          }
        case 'APPLY_FILTERS':
          return {
            ...prevState,
            filtersApplied: action.filters,
            filterActive: true
          }
        case 'FETCH_OUTFIT':
          return {
            ...prevState,
            outfit: action.outfit,
            outfitReady: true
          }
        case 'IMAGE_ANALYZED':
          let keyUpated = action.imageDetails.bulk ? 'bulkUpload' : 'displayGoogle';
          return {
            ...prevState,
            imageDetails: action.imageDetails,
            [ keyUpated ]: true
          }
        case 'ITEM_ADDED':
          let outcome = action.outcome.error ? 'error' : 'success';
          return {
            ...prevState,
            [ outcome ]: action.outcome[outcome],
            collection: action.outcome.collection,
            displayGoogle: false,
          }
        case 'RESET_STATE':
          let key = action.key;
          let val;
          let filter;
          if ( key === 'filtersApplied') {
            val = {};
            filter = null;
          }
          else if ( key === 'displayGoogle' ){
            val = false;
            filter = null;
          }
          else {
            val = null;
            filter = prevState.filterActive
          }
          return {
            ...prevState,
            [ key ]: val,
            filterActive: filter
          }
      }
    },
    {
      logged_in: false,
      session_active: null,
      login_failed: null,
      isSignout: false,
      userID: '',
      closet: [],
      outfit: [],
      outfitReady: false,
      signUp_failed: null,
      error: null,
      success: null,
      filtersApplied: {},
      filterActive: null,
      imageDetails: {},
      displayGoogle: false,
      bulkUpload: false,
      collection: null,
      types: [],
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

      fetchCollection: ( userID, category, filtersApplied ) => {
        let ref = Firebase.firestore().collection(userID).doc(category).collection(category)
        if ( Object.keys(filtersApplied).length  ){
          Object.keys(filtersApplied).forEach( key => {
            ref = ref.where(`${key}`, "==", `${filtersApplied[key]}`)
          })
        }
        ref.onSnapshot( querySnapshot => {
          let items = [];
          querySnapshot.forEach( doc => {
            items.push( doc.data() )
          })
          dispatch({ type: 'FETCH_COLLECTION', items });
        },
          error => console.log('error: ', error)
        );
      },

      filterCollection: ( filters ) => {
        if ( !Object.keys(filters).length ) return;
        dispatch({ type: 'APPLY_FILTERS', filters })
      },

      fetchCollectionTypes: userID => {
        Firebase.firestore().collection(userID)
        .onSnapshot( querySnapshot => {
          let types = [];
          querySnapshot.forEach( doc => {
            types.push( doc.data() )
          })
          dispatch({ type: 'FETCH_COLLECTION_TYPES', types });
        },
          error => console.log('error: ', error)
        )
      },

      analyzeImage: async ( image, bulk ) => {
        let date = new Date();
        let imageDetails = {},
            imagesUploaded = [];
        if ( !bulk ) {
          let imageName = "img" + Math.random().toString(36).slice(2) + date.getHours().toString(36);
          let imageURL = await createImageBLOB( image, imageName );
          imageDetails = await submitToGoogle( imageURL );
          imageDetails.imageURL = imageURL;
          imageDetails.imageName = imageName;
        } else {
          for ( let i = 0; i < image.imagesUploaded.length; i++ ){
            let imageName = "img" + Math.random().toString(36).slice(2) + date.getHours().toString(36);
            let imageURL = await createImageBLOB( image.imagesUploaded[i], imageName );
            imagesUploaded.push({ imageName, imageURL, Type: image.type });
          }
          imageDetails.imageURL = imagesUploaded;
          imageDetails.Type = image.type;
          imageDetails.bulk = true;
        }
        dispatch({ type: 'IMAGE_ANALYZED',  imageDetails });
      },

      addItem: async ( userID, details ) => {
        let outcome;
        Firebase.firestore()
        .collection(userID).doc(details.Type).set({ Type: details.Type })
        .then( () => {
          let collectionRef = Firebase.firestore().collection(userID).doc(details.Type).collection(details.Type)
          if ( details.bulk ){
            for ( let i = 0; i < details.imageURL.length; i++ ){
              let image = details.imageURL[i];
              collectionRef.doc(image.imageName).set(image)
            }
          } else {
            collectionRef.doc(details.imageName).set(details);
          }
          outcome = { success: 1, collection: details.Type }
          dispatch({ type: 'ITEM_ADDED', outcome });
        })
        .catch( () => {
          outcome = { error: 1, collection: null };
          dispatch({ type: 'ITEM_ADDED', outcome })
        });
      },

      updateItem: ( userID, details ) => {
        let outcome;
        Firebase.firestore()
        .collection( userID ).doc( details.Type )
        .collection( details.Type ).doc( details.imageName )
        .update( details )
        .then( () => {
          outcome = { success: 1, collection: details.Type }
          dispatch({ type: 'ITEM_ADDED', outcome })
        })
        .catch( () => {
          outcome = { error: 1, collection: null }
          dispatch({ type: 'ITEM_ADDED', outcome })
        })
      },

      deleteItem: (userID, item) => {
        Firebase.firestore()
        .collection(userID).doc(item.Type)
        .collection(item.Type).doc(item.imageName)
        .delete()
        .then( () => console.log('item deleted'))
        .catch( error => console.log('error deleting item: ', error) )
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
      },

      resetState: key => dispatch({ type: 'RESET_STATE', key: key })
    }),
    []
  );

  return [state, globalDispatch];
}

const outfitGenerator = ( items, categories ) => {
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

const createImageBLOB = async ( uri, name ) => {
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


const submitToGoogle = async ( imageURL ) => {
  try {
    let body = JSON.stringify({
       requests: [
         {
           features: [
             { type: "LABEL_DETECTION", maxResults: 10 },
             { type: "LOGO_DETECTION", maxResults: 5 },
             { type: "IMAGE_PROPERTIES", maxResults: 5 },
             { type: "WEB_DETECTION", maxResults: 5 }
           ],
           image: {
             source: {
               imageUri: imageURL
             }
           }
         }
       ]
     });

    let res = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" + config["GOOGLE_CLOUD_VISION_API_KEY"],
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    );

    let resJSON = await res.json();
    return analyzeGoogle( resJSON.responses[0] );

  } catch ( error ) {
    console.log('error submitting to google: ', error);
  }
}

const analyzeGoogle = imageDetails => {
  const keywords = {
    Top: [ "Blouse", "Cardigan", "Collar", "Hood", "Hoodie", "Jacket", "Jersey", "Shirt", "Sleeveless Shirt", "Sweater", "Sweatshirt", "T-shirt", "Top" ],
    Bottoms: [ "Leggings", "Pants", "Shorts", "Skort", "Sweatpants", "Trousers" ],
    "One Piece": [ "Dress", "Jumpsuit", "Overall", "Romper", "Gown" ]
  };

  const colors = [ 'Black', 'Gray', 'White', 'Beige', 'Red' , 'Orange', 'Yellow', 'Brown', 'Green', 'Blue', 'Purple', 'Magenta', 'Pink' ];

  let type = '',
      colorMatches = [],
      pattern = false;
  const labels = imageDetails.labelAnnotations;

  for ( let i = 0; i < labels.length; i++ ){
    let label = labels[ i ].description;
    if ( label === 'Denim' && !colorMatches.length ) colorMatches.push( 'Denim' );
    if ( label === 'Pattern' && !pattern && labels[ i ].score > 0.5) pattern = true;
    if ( colors.includes( label ) && !colorMatches.length && !pattern ) colorMatches.push( label );
    if ( !type || label === 'Sleeveless shirt' ){
      for ( const cat in keywords ){
        let keywordsArr = keywords[ cat ];
        if (keywordsArr.includes( label )) {
          type = cat;
          break;
        } else {
          let regex = new RegExp( `\w*\s*${label}[s]*\s*`, 'i' );
          let match = keywordsArr.some( keyword => regex.test( keyword ));
          if ( match ) {
            type = cat;
            break;
          }
        }
      }
    }
  }

  if ( !colorMatches.length ){
    const { colors } = imageDetails.imagePropertiesAnnotation.dominantColors;
    colorMatches.push(convertColor( colors[0] ));
  }
  if ( pattern ) colorMatches.push( 'Patterned' );

  return { Type: type, Color: colorMatches }
}

const convertColor = color => {
  // credit to https://css-tricks.com/converting-color-spaces-in-javascript/
  // Make r, g, and b fractions of 1
  let r = color.color.red / 255,
  g = color.color.green / 255,
  b = color.color.blue / 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0){
    h = 0;
    // Red is max
  }
  else if (cmax == r){
    h = ((g - b) / delta) % 6;
    // Green is max
  }
  else if (cmax == g){
    h = (b - r) / delta + 2;
  // Blue is max
  }
  else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return classifyColor( h, s, l );
}

const classifyColor = ( h, s, l ) => {
  if ( s <= 10 && l >=90 ) {
    return 'White';
  }
  else if ( l < 25 ) {
    return 'Black';
  }
  else if ( (s <= 10 && l < 95) ) {
    return 'Gray';
  }
  else if ( h <= 15 && h >= 345 ){
    return 'Red';
  }
  else if ( h >= 16 && h < 35 ) {
    if ( s < 90 && l < 40 ) {
        return ("Brown");
    } else {
        return ("Orange");
    }
  } else if ( h >= 35 && h <= 74 ) {
    if ( s < 90 && l < 40 ) {
        return ("Brown");
    } else {
        return ("Yellow");
    }
  }
  else if ( h >= 75 && h <= 164 ) {
    return 'Green';
  }
  else if ( h >= 165 && h <= 260 ) {
    return 'Blue';
  }
  else if (h >= 261 && h <= 295) {
    return 'Purple';
  }
  else if (h >= 296 && h < 345) {
    return 'Pink';
  }
  else return 'Pick a color';
}
