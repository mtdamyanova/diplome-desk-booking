import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const environment = {
  // apiKey: "AIzaSyDF5p5MtK9Eae54l_qSXkwL_ULJehjCoyE",
  // authDomain: "diplome-7189f.firebaseapp.com",
  // databaseURL: "https://diplome-7189f-default-rtdb.firebaseio.com",
  // projectId: "diplome-7189f",
  // storageBucket: "diplome-7189f.appspot.com",
  // messagingSenderId: "672116719037",
  // appId: "1:672116719037:web:f9667f4ebe880bf85926d4"
  apiKey: "AIzaSyDETPO9DVQ9VfVJa7iNKnPicIKTSBrwE7w",
  authDomain: "test-diplome.firebaseapp.com",
  projectId: "test-diplome",
  storageBucket: "test-diplome.appspot.com",
  messagingSenderId: "32779226074",
  appId: "1:32779226074:web:1b6d137399e085a4678ee3"
};

export const url = 'https://test-diplome-default-rtdb.europe-west1.firebasedatabase.app/';

const app = initializeApp(environment);
const auth = getAuth(app);
export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};
