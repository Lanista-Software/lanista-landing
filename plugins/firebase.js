/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBo8LgG0W7xxiQAzmoUwZE6GmNMBEOGY5A",
    authDomain: "lanista-47890.firebaseapp.com",
    databaseURL: "https://lanista-47890.firebaseio.com",
    projectId: "lanista-47890",
    storageBucket: "lanista-47890.appspot.com",
    messagingSenderId: "902638341312",
    appId: "1:902638341312:web:598a34d075e76889c5f125",
    measurementId: "G-EN9EYP19LG"
  };
  
const apps = getApps()
// Initialize Firebase
let app
if (!apps.length) {
  app = initializeApp(firebaseConfig)
} else {
  app = apps[0]
}
const db = getFirestore(app, {})
const auth = getAuth(app, {})
const analytics = process.client ? getAnalytics(app, {}) : null
export { db, analytics, auth }