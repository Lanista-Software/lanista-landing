import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(nuxtApp => {
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
  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  nuxtApp.vueApp.provide('firestore', firestore)
  nuxtApp.provide('firestore', firestore)
})