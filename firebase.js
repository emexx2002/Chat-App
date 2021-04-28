import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDjKJVED2aTSb8aPEbJUfitvhTFddqx6q4",
    authDomain: "james-2-b91dc.firebaseapp.com",
    projectId: "james-2-b91dc",
    storageBucket: "james-2-b91dc.appspot.com",
    messagingSenderId: "725066515341",
    appId: "1:725066515341:web:771ec25890e7f30297b3c4"
};


const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();





export { db, auth, provider, };