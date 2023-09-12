import app from 'firebase/compat/app';
import "firebase/compat/auth"

const firebaseConfig = {

    apiKey: "AIzaSyA6-hQAbiaQb3Azu1uMVPZVAUjZJlwlSXU",
    authDomain: "marvel-quiz-9d08a.firebaseapp.com",
    projectId: "marvel-quiz-9d08a",
    storageBucket: "marvel-quiz-9d08a.appspot.com",
    messagingSenderId: "1014228092285",
    appId: "1:1014228092285:web:87dd3a7fbe7962d62df814"
  
  };
  
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
    }

    //inscription
    signupUser = (email, password) => {
       return this.auth.createUserWithEmailAndPassword(email, password)
    }

    //connexion
    loginUser = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    //Deconnexion
    signoutUser = () => {
        return this.auth.signOut()
    }
}

export default Firebase




