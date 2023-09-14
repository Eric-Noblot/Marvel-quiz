import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, doc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA6-hQAbiaQb3Azu1uMVPZVAUjZJlwlSXU",
    authDomain: "marvel-quiz-9d08a.firebaseapp.com",
    projectId: "marvel-quiz-9d08a",
    storageBucket: "marvel-quiz-9d08a.appspot.com",
    messagingSenderId: "1014228092285",
    appId: "1:1014228092285:web:87dd3a7fbe7962d62df814"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const firestore = getFirestore() 
export const user = (userId) => doc(firestore, `users/${userId}`) //doc necessite en premier argument la base de données (ici firestore)

//on récupre du package firebase la methode getAuth et InitializeApp
//On crée un variable app qui va initialiser notre base de données avec le schéma firebaseConfig
//Puis on export une variable auth qui appelle la methode getAuth avec comme argument app, car on va en avoir besoin ailleurs dans notre appli
//on a choisi sur firebase une authentification avec email et password

// export default firebaseConfig