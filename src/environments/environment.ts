import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export const environment = {
  apiKey: "AIzaSyDF5p5MtK9Eae54l_qSXkwL_ULJehjCoyE",
  authDomain: "diplome-7189f.firebaseapp.com",
  databaseURL: "https://diplome-7189f-default-rtdb.firebaseio.com",
  projectId: "diplome-7189f",
  storageBucket: "diplome-7189f.appspot.com",
  messagingSenderId: "672116719037",
  appId: "1:672116719037:web:f9667f4ebe880bf85926d4"
};

const app = initializeApp(environment);
const auth = getAuth(app);
