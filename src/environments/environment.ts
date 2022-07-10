import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const environment = {
  apiKey: "AIzaSyA_5kG8KaRkX8NHRfeVDCasB5Xufz2fGmg",
  authDomain: "diplome-b9d0c.firebaseapp.com",
  projectId: "diplome-b9d0c",
  storageBucket: "diplome-b9d0c.appspot.com",
  messagingSenderId: "127018839508",
  appId: "1:127018839508:web:22a9dab864d68bb15dfa41"
};

const app = initializeApp(environment);
const auth = getAuth(app);
export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  dynamicLinkDomain: 'example.page.link',
};

export const url = `https://diplome-b9d0c-default-rtdb.europe-west1.firebasedatabase.app/`;
