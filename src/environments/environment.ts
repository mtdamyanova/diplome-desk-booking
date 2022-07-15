import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const environment = {
  apiKey: "AIzaSyDkwvUoG8OI5cNurMvUEQjAKuvkDxYtw54",
  authDomain: "diplome-bc509.firebaseapp.com",
  projectId: "diplome-bc509",
  storageBucket: "diplome-bc509.appspot.com",
  messagingSenderId: "921074269476",
  appId: "1:921074269476:web:8255d5059be99d6def87b1"
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

