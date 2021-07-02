import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBcXTfiR0sxmPZEJnySnrKlat-f39sYimg",
    authDomain: "react-messenger-89a01.firebaseapp.com",
    projectId: "react-messenger-89a01",
    storageBucket: "react-messenger-89a01.appspot.com",
    messagingSenderId: "134095222998",
    appId: "1:134095222998:web:1c335e76675a8e21787177"
})
const db = firebaseApp.firestore()

export default db



