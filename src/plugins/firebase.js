import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.FIREBASE_DATABASEURL,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID
    }
  )
}

export default ({ app, redirect }, inject) => {
  app.onAuthStateChanged = false
  firebase.auth().onAuthStateChanged(async (user) => {
    app.onAuthStateChanged = true
  })
  inject('fire', firebase)
}
