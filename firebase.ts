import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDn90SdqHG9PmGsXQf7TE541RdQIVft020",
    authDomain: "netflix-clone-92aab.firebaseapp.com",
    projectId: "netflix-clone-92aab",
    storageBucket: "netflix-clone-92aab.appspot.com",
    messagingSenderId: "716371294081",
    appId: "1:716371294081:web:0d5ca5142fb4b7fd7b1a80"
  };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }