// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCKyp_-2nQTwT01j3E4KndDjUppHQ047Vo',
  authDomain: 'nordstone-project-c3746.firebaseapp.com',
  projectId: 'nordstone-project-c3746',
  storageBucket: 'nordstone-project-c3746.appspot.com',
  messagingSenderId: '236476406882',
  appId: '1:236476406882:web:2653603791d28d085cc53b',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
