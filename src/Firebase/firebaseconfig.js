import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'


var firebaseConfig = {
    apiKey: "AIzaSyB4xnvpg0ytefS1qXJLJhE3IboGse-fyYQ",
    authDomain: "elportalmotos-6c512.firebaseapp.com",
    databaseURL: "https://elportalmotos-6c512.firebaseio.com",
    projectId: "elportalmotos-6c512",
    storageBucket: "",
    messagingSenderId: "725175039236",
    appId: "1:725175039236:web:2d09eb7453af57e8"
  };
  // Initialize Firebase
class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig)
    this.auth = app.auth();
    this.db = app.database()
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  post = (Title) => this.db.ref(`Posts/${Title}`)
}

export default Firebase