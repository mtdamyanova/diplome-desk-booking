import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const environment = {
  apiKey: "AIzaSyAJTNQq664W42PyiReANH3_Z2hj_jowfec",
  authDomain: "desk-booking-59893.firebaseapp.com",
  projectId: "desk-booking-59893",
  storageBucket: "desk-booking-59893.appspot.com",
  messagingSenderId: "73349276328",
  appId: "1:73349276328:web:77a6610c7c41bae1f9989d"
};

const app = initializeApp(environment);
const auth = getAuth(app);
