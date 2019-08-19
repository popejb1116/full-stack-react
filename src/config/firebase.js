import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
   apiKey: "AIzaSyCxpYPMRO2ZE6SiYVx-x-A7VRGWjOx2s20",
   authDomain: "full-stack-firebase-4b324.firebaseapp.com",
   databaseURL: "https://full-stack-firebase-4b324.firebaseio.com",
   projectId: "full-stack-firebase-4b324",
   storageBucket: "full-stack-firebase-4b324.appspot.com",
   messagingSenderId: "649750363374",
   appId: "1:649750363374:web:291653b6f0082b22"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth()
 const firestore = firebase.firestore()

 export {auth, firestore}