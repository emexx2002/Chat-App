import '../styles/globals.css'
import Layout from '../components/Layout'
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth } from "../firebase"
import Login from './login'
import Loading from '../components/Loading'
import firebase from 'firebase'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("user").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoUrl: user.photoURL
        },
        { merge: true }
      )
    }

  }, [user]);

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
