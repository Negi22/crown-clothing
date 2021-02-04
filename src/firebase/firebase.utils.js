import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBoIBLHim7gd_QlLw9kFELSMHFCAbB7Lpc",
  authDomain: "crwn-db-46998.firebaseapp.com",
  projectId: "crwn-db-46998",
  storageBucket: "crwn-db-46998.appspot.com",
  messagingSenderId: "189040613468",
  appId: "1:189040613468:web:25e666dae8c4aad6342e99",
  measurementId: "G-F83XEEXXB2"
};


// creating user using Sign In with Google and storing it into users collection as a Document
export const createUserProfileDocument = async(userAuth, additionalData) =>{
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
        console.log('error creating user', error.message)
    }
  }

  return userRef;
}

// Intializing firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;