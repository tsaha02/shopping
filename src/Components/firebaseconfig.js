import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEAv3xiym0X4YaTMod1qCTA9C3p798KKY",
  authDomain: "shopping-authentication-form.firebaseapp.com",
  projectId: "shopping-authentication-form",
  storageBucket: "shopping-authentication-form.appspot.com",
  messagingSenderId: "509360009644",
  appId: "1:509360009644:web:9a4dc9ceeb7f41841c0a09",
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();

export default firebase;
